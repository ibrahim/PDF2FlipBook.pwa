import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import { Grommet } from 'grommet';

import App from './App';
import configureStore from './store'
import * as serviceWorker from './serviceWorker';

import theme from './config/theme';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const { store, persistor } = configureStore() 

const toastifyConfig = {
  autoClose: 5000,
  hideProgressBar: true,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  pauseOnHover: true
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Grommet theme={ theme } full>
          <App />
        </Grommet>
      </Router>
  <ToastContainer {...toastifyConfig} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
