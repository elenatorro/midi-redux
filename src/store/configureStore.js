import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';

// const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  // const store = enhancer(rootReducer, initialState);
  // return store;
  //
  // const store = createStore(rootReducer, initialState, enhancer);
  // return store;
  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(thunkMiddleware)));
  return store;
}
