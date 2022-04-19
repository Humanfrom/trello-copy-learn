import React from 'react';
import './app.less';
import {useDispatch, useSelector} from "react-redux";
import {setCount} from "./components/reducers/reducer.js"
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from "./components/pages/main/Main.jsx";
import CurrentBoard from "./components/pages/currentboard/CurrentBoard.jsx";
import Navbar from './components/UI/navbar/Navbar.jsx'

const App = () => {
  const dispatch = useDispatch()

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/board/:id' element={<CurrentBoard/>} />
          <Route path='*' element={<Error/>} replace/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
