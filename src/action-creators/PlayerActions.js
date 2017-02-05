import PlayerAction from '../actions/PlayerActions';
import MIDIAction from '../actions/MIDIActions';
import * as MIDIActions from '../action-creators/MIDIActions';
import { MIDIInstruments, SOUNDS_PATH, SOUNDS_FILETYPE, SOUNDS_FILE_EXTENSION } from '../constants/MIDIInstruments';

import Soundfont from 'soundfont-player';

export function play() {
  return (dispatch, getState) => {
    let state, tracks, ticksPerBeat, songTracks;

    state = getState();
    tracks = _initTracks.call(this, state.file.song);
    songTracks = state.file.song.tracks;
    ticksPerBeat = state.file.song.header.ticksPerBeat;

    dispatch({ type: PlayerAction.PLAY, payload: { tracks, ticksPerBeat } });

    dispatch(loadInstruments())
      .then(() => {
        _dispatchAllMIDIActions.call(this, tracks, songTracks, dispatch);
      });
  };
}

export function loadInstruments() {
  return (dispatch, getState) => {
    let state, tracks, instruments, songTracks, i, midiMessage, loadInstrumentPromises;

    state = getState();
    songTracks = state.file.song.tracks;
    tracks = state.player.tracks;
    loadInstrumentPromises = [];
    instruments = new Array(tracks.length);

    dispatch({ type: PlayerAction.LOAD_INSTRUMENTS, payload: { instruments } });

    tracks.forEach((track, trackIndex) => {
      for (i = track.currentMessageIndex; i < songTracks[trackIndex].length; i++) {
        midiMessage = songTracks[trackIndex][i];
        if (midiMessage.subtype === MIDIAction.PROGRAM_CHANGE) {
          loadInstrumentPromises.push(dispatch(loadInstrument(trackIndex, midiMessage)));
        } else if (!state.midi.tempo && midiMessage.subtype === MIDIAction.SET_TEMPO && midiMessage.deltaTime === 0) {
          dispatch(MIDIActions[MIDIAction.SET_TEMPO](trackIndex, midiMessage));
        }
      }
    });

    return Promise.all(loadInstrumentPromises);
  };
}

export function loadInstrument(trackIndex, midiMessage) {
  return (dispatch, getState) => {
    let state, instruments, instrumentName, instrumentPath;

    state = getState();
    instruments = state.player.instruments;
    instrumentName = MIDIInstruments[midiMessage.programNumber];
    instrumentPath = `${SOUNDS_PATH}/${instrumentName}-${SOUNDS_FILETYPE}.${SOUNDS_FILE_EXTENSION}`;

    return Soundfont.instrument(state.midi.audioContext, instrumentPath)
      .then((instrument) => {
        instruments[trackIndex] = instrument;
        dispatch({ type: PlayerAction.LOAD_INSTRUMENT, payload: { instruments } });
      })
      .catch((reason) => {
        console.error({reason});
      });
  };
}

// TODO
export function pause() {
  return (dispatch, getState) => {
    dispatch({ type: PlayerAction.PAUSE });
  };
}

// TODO
export function stop() {
  return (dispatch, getState) => {
    dispatch({ type: PlayerAction.STOP });
  };
}

/* Private */

function _initTracks(song) {
  return song.tracks.map((track, trackIndex) => {
    return {
      currentDeltaTime:    0,
      currentMessageIndex: 0
    };
  });
}

function _dispatchAllMIDIActions(tracks, songTracks, dispatch) {
  let i, midiMessage;

  tracks.forEach((track, trackIndex) => {
    for (i = track.currentMessageIndex; i < songTracks[trackIndex].length; i++) {
      midiMessage = songTracks[trackIndex][i];
      if (MIDIActions[midiMessage.subtype]) {
        dispatch(MIDIActions[midiMessage.subtype](trackIndex, midiMessage));
      }
    }
  });
}
