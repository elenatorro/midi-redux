import configureStore from './store/configureStore';
import { PlayerActions } from './actions/PlayerActions';
import { FileActions } from './actions/FileActions';

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
