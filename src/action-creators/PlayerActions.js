/*jslint bitwise: true */

import * as MIDIActions from '../action-creators/MIDIActions';
import PlayerAction from '../actions/PlayerActions';
import MIDIAction from '../actions/MIDIActions';

import Soundfont from 'soundfont-player';

import { MIDIPercussion } from '../constants/MIDIPercussion';
import { MIDIStreamReader } from '../utils/MIDIStreamReader';
import { MIDIChunk } from '../utils/MIDIChunk';
import { MIDIErrors } from '../utils/MIDIErrors';
import { MIDIEventsReader } from '../utils/MIDIEventsReader';
import { MIDIInstrumentImages } from '../constants/MIDIInstrumentImages';

import {
  MIDIInstruments, SOUNDS_PATH, SOUNDS_FILETYPE, SOUNDS_FILE_EXTENSION } from '../constants/MIDIInstruments';

export function play() {
  return (dispatch, getState) => {
    dispatch(_readTracks());
  };
}

// TODO
export function pause() {
  return (dispatch, getState) => {
    dispatch({type: PlayerAction.PAUSE});
  };
}

// TODO
export function stop() {
  return (dispatch, getState) => {
    dispatch({type: PlayerAction.STOP});
  };
}

function _readTracks() {
  return (dispatch, getState) => {
    let state,
      i,
      trackChunk,
      trackStream,
      tracks,
      song,
      instrumentPromises,
      instruments,
      trackActions,
      midiMessage,
      stream,
      header,
      ticksPerBeat;

    state = getState();
    song  = state.file.song;

    stream       = MIDIStreamReader.readStream(song);
    header       = _readHeader.call(this, stream, song);
    ticksPerBeat = header.ticksPerBeat;
    instruments  = new Array(header.trackCount);
    tracks       = _initTracks.call(this, header.trackCount);

    trackActions       = [];
    instrumentPromises = [];

    dispatch({
      type: PlayerAction.PLAY,
      payload: { tracks, ticksPerBeat }
    });

    for (i = 0; i < tracks.length; i++) {
      trackChunk = MIDIChunk.readChunk(stream);
      MIDIErrors.isValidTrackChunk(trackChunk);

      trackStream = MIDIStreamReader.readStream(trackChunk.data);

      while (!trackStream.eof()) {
        midiMessage = MIDIEventsReader.readEvent(trackStream);
        if (midiMessage.subtype === MIDIAction.PROGRAM_CHANGE) {
          instrumentPromises.push(
            dispatch(_loadInstrument(i, midiMessage))
          );
        } else if (_isFirstTempo.call(this, midiMessage)) {
          dispatch(MIDIActions[MIDIAction.SET_TEMPO](i, midiMessage));
        } else {
          if (MIDIActions[midiMessage.subtype]) {
            trackActions.push({ index: i, midiMessage });
          }
        }
      }
    }

    return Promise
      .all(instrumentPromises)
      .then(_callMidiActions.bind(this, trackActions, dispatch));
    };
}

function _loadInstrument(trackIndex, midiMessage) {
  return (dispatch, getState) => {
    const PERCUSSION_CHANNEL = 10;

    let state, instruments, instrumentName, instrumentPath;

    state = getState();
    instruments = state.player.instruments;

    if (midiMessage.channel === PERCUSSION_CHANNEL) {
      instrumentName = MIDIPercussion[midiMessage.programNumber];
    } else {
      instrumentName = MIDIInstruments[midiMessage.programNumber];
    }

    instrumentPath = `${SOUNDS_PATH}/${instrumentName}-${SOUNDS_FILETYPE}.${SOUNDS_FILE_EXTENSION}`;

    return Soundfont.instrument(state.midi.audioContext, instrumentPath).then((instrument) => {
      instrument.id = instrumentName;
      instrument.image = MIDIInstrumentImages[instrumentName];
      instruments[trackIndex] = instrument;

      dispatch({
        type:    PlayerAction.LOAD_INSTRUMENT,
        payload: { instruments }
      });

    }).catch((reason) => {
      console.error({ reason });
    });
  };
}

function _initTracks(trackCount) {
  let i = 0, tracks = [];

  for (i; i < trackCount; i++) {
    tracks.push({
      currentDeltaTime: 0,
      currentMessageIndex: 0,
      deltaTime: 0,
      maxDeltaTime: 0
    });
  }

  return tracks;
}

function _readHeader(stream, data) {
  let headerChunk,
    headerStream,
    formatType,
    trackCount,
    timeDivision,
    ticksPerBeat;

  headerChunk = MIDIChunk.readChunk(stream);
  MIDIErrors.isValidHeaderChunk(headerChunk);

  headerStream = MIDIStreamReader.readStream(headerChunk.data);
  formatType   = headerStream.readInt16();
  trackCount   = headerStream.readInt16();
  timeDivision = headerStream.readInt16();

  MIDIErrors.isValidTimeDivision(timeDivision);
  ticksPerBeat = timeDivision;

  return { formatType, trackCount, ticksPerBeat };
}

function _isFirstTempo(midiMessage) {
  return midiMessage.subtype === MIDIAction.SET_TEMPO &&
    midiMessage.deltaTime === 0;
}

function _callMidiActions(trackActions, dispatch) {
  return trackActions.forEach((trackAction) => {
    dispatch(_callMIDIAction.call(this, trackAction));
  });
}

function _callMIDIAction(trackAction) {
  return MIDIActions[trackAction.midiMessage.subtype](
    trackAction.index,
    trackAction.midiMessage
  );
}
