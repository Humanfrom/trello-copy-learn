import "./index.less"
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx'
import {store} from "./components/reducers"
import {Provider} from "react-redux"

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById("root")
)
