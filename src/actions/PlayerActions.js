import { Player } from '../constants/general';
import { MIDIActions } from '../actions/MIDIActions';
import { MIDIMessages } from '../constants/MIDIMessages';
import { MIDIInstruments, SOUNDS_PATH, SOUNDS_FILETYPE, SOUNDS_FILE_EXTENSION } from '../constants/MIDIInstruments';

import Soundfont from 'soundfont-player';

function play() {
  return (dispatch, getState) => {
    let state, tracks, ticksPerBeat, songTracks;

    state = getState();
    tracks = _initTracks.call(this, state.file.song);
    songTracks = state.file.song.tracks;
    ticksPerBeat = state.file.song.header.ticksPerBeat;

    dispatch({ type: Player.PLAY, payload: { tracks, ticksPerBeat } });

    dispatch(loadInstruments())
      .then(() => {
        _dispatchAllMIDIActions.call(this, tracks, songTracks, dispatch);
      });
  };
}

function loadInstruments() {
  return (dispatch, getState) => {
    var state, tracks, instruments, songTracks, i, midiMessage, loadInstrumentPromises;

    state = getState();
    songTracks = state.file.song.tracks;
    tracks = state.player.tracks;
    loadInstrumentPromises = [];

    instruments = new Array(tracks.length);

    dispatch({ type: Player.LOAD_INSTRUMENTS, payload: { instruments } });

    tracks.forEach((track, trackIndex) => {
      for (i = track.currentMessageIndex; i < songTracks[trackIndex].length; i++) {
        midiMessage = songTracks[trackIndex][i];
        if (midiMessage.subtype === MIDIMessages.PROGRAM_CHANGE) {
          loadInstrumentPromises.push(dispatch(loadInstrument(trackIndex, midiMessage)));
        } else if (!state.midi.tempo && midiMessage.subtype === MIDIMessages.SET_TEMPO && midiMessage.deltaTime === 0) {
          dispatch(MIDIActions[MIDIMessages.SET_TEMPO](trackIndex, midiMessage)); // FIXME
        }
      }
    });

    return Promise.all(loadInstrumentPromises);
  };
}

function loadInstrument(trackIndex, midiMessage) {
  return (dispatch, getState) => {
    var state, instruments, instrumentName, instrumentPath;

    state = getState();
    instruments = state.player.instruments;
    instrumentName = MIDIInstruments[midiMessage.programNumber];
    instrumentPath = `${SOUNDS_PATH}/${instrumentName}-${SOUNDS_FILETYPE}.${SOUNDS_FILE_EXTENSION}`;

    return Soundfont.instrument(state.midi.audioContext, instrumentPath)
      .then((instrument) => {
        instruments[trackIndex] = instrument;
        dispatch({ type: Player.LOAD_INSTRUMENT, payload: { instruments } });
      })
      .catch((reason) => {
        console.error({reason});
      });
  };
}

// TODO
function pause() {
  return (dispatch, getState) => {
    dispatch({ type: Player.PAUSE });
  };
}

// TODO
function stop() {
  return (dispatch, getState) => {
    dispatch({ type: Player.STOP });
  };
}

export const PlayerActions = { play, pause, stop };

/* Private */

function _initTracks(song) {
  return song.tracks.map((track, trackIndex) => {
    return {
      currentDeltaTime: 0,
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
