import { FileAction } from '../constants/general';

const initialState = {
  song: null
};

export default function MIDIFileReducer(state=initialState, action) {
  switch (action.type) {
    case FileAction.LOAD_FILE:
      return Object.assign({}, state, {
        song: action.payload.song
      });
    default:
      return state;
    }
}
