import { combineReducers } from 'redux';

import MIDIEventsReducer from '../reducers/MIDIEventsReducer';
import MIDIPlayerReducer from '../reducers/MIDIPlayerReducer';
import MIDIFileReducer from '../reducers/MIDIFileReducer';

const rootReducer = combineReducers({
  midi:   MIDIEventsReducer,
  player: MIDIPlayerReducer,
  file:   MIDIFileReducer
});

export default rootReducer;
