import PlayerAction from '../actions/PlayerActions';

const initialState = {
  isPlaying: false,
  ticksPerBeat: null,
  tracks: null,
  instruments: null
};

export default function MIDIPlayerReducer(state = initialState, action) {
  switch (action.type) {
    case PlayerAction.PLAY:
      return {
        ...state,
        tracks: action.payload.tracks,
        isPlaying: true,
        ticksPerBeat: action.payload.ticksPerBeat
      };
    case PlayerAction.LOAD_INSTRUMENT:
      return {
        ...state,
        instruments: action.payload.instruments
      }
    case PlayerAction.LOAD_INSTRUMENTS:
      return {
        ...state,
        instruments: action.payload.instruments
      }
    default:
      return state;
  }
}
