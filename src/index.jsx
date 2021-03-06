import "./index.less"
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx'
import {Provider} from "react-redux"
import {newStore} from './components/store/index.js'

//создаём новое хранилище с возможностью чтения и записи в localStorage
const store = newStore();

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById("root")
)
