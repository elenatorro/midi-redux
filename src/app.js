import configureStore from './store/configureStore';
import * as PlayerActions from './action-creators/PlayerActions';
import * as FileActions from './action-creators/FileActions';
import * as MIDIActions from './action-creators/MIDIActions';

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
