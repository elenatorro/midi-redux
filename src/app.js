import configureStore from './store/configureStore';
import { PlayerActions } from './action-creators/PlayerActions';
import { FileActions } from './action-creators/FileActions';
import { MIDIActions } from './action-creators/MIDIActions';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Layout from './components/Layout';

const store = configureStore();
const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Layout />
 </Provider>, app);
