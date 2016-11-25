import { Player } from '../constants/general';
import { MIDIActions } from '../actions/MIDIActions';

function play() {
  return (dispatch, getState) => {
    var state, tracks, instruments, ticksPerBeat, songTracks, i, midiMessage;

    state = getState();
    tracks = _initTracks.call(this, state.file.song);
    instruments = new Array(tracks.length);
    songTracks = state.file.song.tracks;
    ticksPerBeat = state.file.song.header.ticksPerBeat;

    dispatch({ type: Player.PLAY, payload: { tracks, instruments, ticksPerBeat } });

    tracks.forEach((track, trackIndex) => {
      for (i = track.currentMessageIndex; i < songTracks[trackIndex].length; i++) {
        midiMessage = songTracks[trackIndex][i];
        if (MIDIActions[midiMessage.subtype]) {
          dispatch(MIDIActions[midiMessage.subtype](trackIndex, midiMessage));
        }
      }
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
