import React from 'react';
import './app.less';
import {useDispatch, useSelector} from "react-redux";
import {setCount} from "./../reducers/reposReducer.js"
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from "./main/Main.jsx";

const App = () => {
  const dispatch = useDispatch()

  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path='/' element={<Main/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
