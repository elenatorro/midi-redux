import PlayerAction from '../actions/PlayerActions';

const initialState = {
  trackActions: [],
  tracks: [],
  intervals: [],
  isPlaying: false,
  instruments: [],
  percussion: []
};

export default function MIDIPlayerReducer(state=initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PlayerAction.PLAY:
      return {
        ...state,
        isPlaying: true,
        tracks: payload.tracks,
        ticksPerBeat: payload.ticksPerBeat
      };
    case PlayerAction.PAUSE:
      return {
        ...state,
        isPlaying: false
      };
    case PlayerAction.STOP:
      return {
        ...state,
        isPlaying: false
      };
    case PlayerAction.LOAD_INSTRUMENT:
      return {
        ...state,
        instruments: payload.instruments
      }
    case PlayerAction.LOAD_PERCUSSION:
      return {
        ...state,
        percussion: payload.percussion
      }
    case PlayerAction.LOADED:
      return {
        ...state,
        isLoaded: payload.isLoaded
      }
    case PlayerAction.SET_INTERVALS:
      return {
        ...state,
        intervals: payload.intervals
      }
    case PlayerAction.CURRENT_ACTION_INDEX:
      return {
        ...state,
        currentTrackActionIndex: payload.currentTrackActionIndex
      }
    default:
      return state;
  }
}
