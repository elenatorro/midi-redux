import { Player } from '../constants/general';

const initialState = {
  isPlaying: false,
  ticksPerBeat: null,
  tracks: null,
  instruments: null
};

export default function MIDIPlayerReducer(state=initialState, action) {
  switch (action.type) {
    case Player.PLAY:
      return Object.assign({}, state, {
        instruments: action.payload.instruments,
        tracks: action.payload.tracks,
        isPlaying: true,
        ticksPerBeat: action.payload.ticksPerBeat
      });
    default:
      return state;
    }
}
