import { Player } from '../constants/general';

const initialState = {
  isPlaying: false,
  ticksPerBeat: null,
  tracks: null,
  instruments: null
};

export default function MIDIPlayerReducer(state = initialState, action) {
  switch (action.type) {
    case Player.PLAY:
      return {
        ...state,
        tracks: action.payload.tracks,
        isPlaying: true,
        ticksPerBeat: action.payload.ticksPerBeat
      };
    case Player.LOAD_INSTRUMENT:
      return {
        ...state,
        instruments: action.payload.instruments
      }
    case Player.LOAD_INSTRUMENTS:
      return {
        ...state,
        instruments: action.payload.instruments
      }
    default:
      return state;
  }
}
