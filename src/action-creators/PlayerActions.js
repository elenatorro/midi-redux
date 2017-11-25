/*jslint bitwise: true */

import * as MIDIActions from '../action-creators/MIDIActions';
import PlayerAction from '../actions/PlayerActions';
import MIDIAction from '../actions/MIDIActions';
import { Howl } from 'howler';
import Soundfont from 'soundfont-player';

import { MIDIStreamReader } from '../utils/MIDIStreamReader';
import { MIDIChunk } from '../utils/MIDIChunk';
import { MIDIErrors } from '../utils/MIDIErrors';
import { MIDIEventsReader } from '../utils/MIDIEventsReader';
import { MIDIInstrumentImages } from '../constants/MIDIInstrumentImages';

import {
  MIDIInstruments,
  SOUNDS_PATH,
  SOUNDS_FILETYPE,
  SOUNDS_FILE_EXTENSION
} from '../constants/MIDIInstruments';

import {
  MIDIPercussion,
  PERCUSSION_PATH,
  PERCUSSION_FILETYPE,
  DEFAULT_PROGRAM_NUMBER
} from '../constants/MIDIPercussion';

export function play() {
  return (dispatch, getState) => {
    dispatch(_readTracks());
  };
}

export function restart() {
  return (dispatch, getState) => {
    const state = getState();
    const trackActions = state.player.trackActions;
    const ticksPerBeat = state.player.ticksPerBeat;
    const tracks = state.player.tracks;
    const currentTrackActionIndex = state.player.currentTrackActionIndex;

    dispatch({
      type: PlayerAction.PLAY,
      payload: { tracks, ticksPerBeat }
    });

    return _callMidiActions
      .call(this, trackActions, currentTrackActionIndex, dispatch);
  };
}

export function pause() {
  return (dispatch, getState) => {
    const state = getState();

    _clearIntervals.call(this, state.player.intervals);

    dispatch({
      type: PlayerAction.PAUSE
    });

    dispatch({
      type: PlayerAction.SET_INTERVALS,
      payload: { intervals: []}
    });
  };
}

export function stop() {
  return (dispatch, getState) => {
    const state = getState();

    _clearIntervals.call(this, state.player.intervals);

    dispatch({
      type: PlayerAction.STOP
    });

    dispatch({
      type: PlayerAction.LOADED,
      payload: { isLoaded: false }
    });

    dispatch({
      type: PlayerAction.SET_INTERVALS,
      payload: { intervals: []}
    });

    dispatch({
      type: PlayerAction.CURRENT_ACTION_INDEX,
      payload: { currentTrackActionIndex: 0 }
    });
  };
}

function _readTracks() {
  return (dispatch, getState) => {
    const state = getState();
    const song = state.file.song;
    const stream = MIDIStreamReader.readStream(song);
    const header = _readHeader.call(this, stream, song);
    const ticksPerBeat = header.ticksPerBeat;
    const tracks = _initTracks.call(this, header.trackCount);

    let trackActions = [];
    let instrumentPromises = [];

    dispatch({
      type: PlayerAction.PLAY,
      payload: { tracks, ticksPerBeat }
    });

    for (let index = 0; index < tracks.length; index++) {
      const trackChunk = MIDIChunk.readChunk(stream);
      MIDIErrors.isValidTrackChunk(trackChunk);

      const trackStream = MIDIStreamReader.readStream(trackChunk.data);

      while (!trackStream.eof()) {
        const midiMessage = MIDIEventsReader.readEvent(trackStream);

        if (midiMessage.subtype === MIDIAction.PROGRAM_CHANGE) {
          instrumentPromises.push(dispatch(_loadInstrument(index, midiMessage)));
        } else if (_isFirstTempo.call(this, midiMessage)) {
          dispatch(MIDIActions[MIDIAction.SET_TEMPO](index, midiMessage));
        } else {
          if (MIDIActions[midiMessage.subtype]) {
            trackActions.push({ index, midiMessage });
          }
        }
      }
    }

    const currentTrackActionIndex = 0;

    return Promise
      .all(instrumentPromises)
      .then(() => {
        dispatch({
          type: PlayerAction.LOADED,
          payload: { isLoaded: true }
        });

        dispatch({
          type: PlayerAction.CURRENT_ACTION_INDEX,
          payload: { currentTrackActionIndex }
        });

        return _callMidiActions
          .call(this, trackActions, currentTrackActionIndex, dispatch);
      });
    };
}

function _loadInstrument(trackIndex, midiMessage) {
  return (dispatch, getState) => {
    const state = getState();
    const instruments = state.player.instruments;
    const instrumentName = MIDIInstruments[midiMessage.programNumber];
    const instrumentPath = `${SOUNDS_PATH}/${instrumentName}-${SOUNDS_FILETYPE}.${SOUNDS_FILE_EXTENSION}`;

    return Soundfont.instrument(state.midi.audioContext, instrumentPath)
      .then((instrument) => {
        instrument.id = instrumentName;
        instrument.image = MIDIInstrumentImages[instrumentName];
        instruments[trackIndex] = instrument;

        dispatch({
          type: PlayerAction.LOAD_INSTRUMENT,
          payload: { instruments }
        });
      })
      .catch((reason) => {
        console.error({ reason });
      });
  };
}

function _loadPercussion(trackIndex, midiMessage) {
    return (dispatch, getState) => {
      const instrumentName = MIDIPercussion[midiMessage.programNumber]
        ? `${midiMessage.programNumber}_${MIDIPercussion[midiMessage.programNumber]}`
        : `${DEFAULT_PROGRAM_NUMBER}_${MIDIPercussion[DEFAULT_PROGRAM_NUMBER]}`;
      const instrumentPath = `${PERCUSSION_PATH}/${instrumentName}.${PERCUSSION_FILETYPE}`;

      const sound = new Howl({
        src: instrumentPath
      });

      const state = getState();

      let instruments = state.player.instruments;
      const soundLoaderPromise = new Promise((resolve, reject) => {
        sound.once('load', function() {
          instruments[trackIndex] = sound;

          dispatch({
            type: PlayerAction.LOAD_INSTRUMENT,
            payload: { instruments }
          });

          resolve(sound);
        });
      });

      return soundLoaderPromise;
    };
}

function _initTracks(trackCount) {
  let tracks = [];

  for (let index = 0; index < trackCount; index++) {
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
  const headerChunk = MIDIChunk.readChunk(stream);
  MIDIErrors.isValidHeaderChunk(headerChunk);

  const headerStream = MIDIStreamReader.readStream(headerChunk.data);
  const formatType   = headerStream.readInt16();
  const trackCount   = headerStream.readInt16();
  const timeDivision = headerStream.readInt16();
  MIDIErrors.isValidTimeDivision(timeDivision);

  const ticksPerBeat = timeDivision;

  return { formatType, trackCount, ticksPerBeat };
}

function _isFirstTempo(midiMessage) {
  return midiMessage.subtype === MIDIAction.SET_TEMPO &&
    midiMessage.deltaTime === 0;
}

function _callMidiActions(trackActions, currentTrackActionIndex, dispatch) {
  let i = currentTrackActionIndex;

  for (i; i < trackActions.length; i++) {
    dispatch(_callMIDIAction.call(this, trackActions[i], i));
  }
}

function _callMIDIAction(trackAction) {
  return MIDIActions[trackAction.midiMessage.subtype](
    trackAction.index,
    trackAction.midiMessage
  );
}

function _clearIntervals(intervals) {
  return intervals.forEach((interval) => {
    clearInterval(interval);
  });
}
