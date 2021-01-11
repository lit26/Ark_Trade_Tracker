import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux'
import allReducers from './redux/reducers'
import {Provider} from 'react-redux'
import {firebaseConfig} from './firebaseConfig';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import 'firebase/analytics'

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);