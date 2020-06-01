import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import { store, persistor} from './store'
import { Grommet } from 'grommet';

import "./modules/login/firebase-auth-init"

import App from './App';
import * as serviceWorker from './serviceWorker';

import theme from './config/theme';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';


//   <ToastContainer {...toastifyConfig} />
// const toastifyConfig = {
//   position: 'top-center',
//   autoClose: 5000,
//   hideProgressBar: true,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
// }

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Grommet theme={ theme } full>
          <App />
        </Grommet>
      </Router>
<ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
