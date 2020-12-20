import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import allreducers from "./reducers";
import {createStore} from "redux";
import {Provider} from "react-redux";

const mystore=createStore(allreducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


ReactDOM.render(
  <Provider store={mystore}>
    <App />
  </Provider>,
  document.getElementById('root')
);



