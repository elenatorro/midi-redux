import { combineReducers } from 'redux';

import MIDIReducer from '../reducers/MIDIReducer';
import PlayerReducer from '../reducers/PlayerReducer';
import FileReducer from '../reducers/FileReducer';

const rootReducer = combineReducers({
  midi:   MIDIReducer,
  player: PlayerReducer,
  file:   FileReducer
});

export default rootReducer;
