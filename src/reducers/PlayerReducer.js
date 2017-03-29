import PlayerAction from '../actions/PlayerActions';

const initialState = {
  tracks:       [],
  isPlaying:    false,
  instruments:  [],
  ticksPerBeat: null
};

export default function MIDIPlayerReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PlayerAction.PLAY:
      return {
        ...state,
        isPlaying:    true,
        tracks:       payload.tracks,
        ticksPerBeat: payload.ticksPerBeat
      };
    case PlayerAction.LOAD_INSTRUMENT:
      return {
        ...state,
        instruments: payload.instruments
      }
    default:
      return state;
  }
}
