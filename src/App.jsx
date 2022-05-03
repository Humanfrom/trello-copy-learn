import React, {useEffect, useState} from 'react';
import './app.less';
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from "./components/pages/main/Main.jsx";
import CurrentBoard from "./components/pages/currentboard/CurrentBoard.jsx";
import Navbar from './components/UI/navbar/Navbar.jsx'
import Error from './components/pages/Error.jsx'
import {updateRowCount} from './utils'

const App = () => {
  const dispatch = useDispatch()
  const [rowCount, setRowCount] = useState(4)

  useEffect(() => {
    updateRowCount(setRowCount)
    window.addEventListener(`resize`, () => {updateRowCount(setRowCount)}, false);
  },[])

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path='/' element={<Main count={rowCount}/>} />
          <Route path='/board/:id' element={<CurrentBoard count={rowCount}/>} />
          <Route path='*' element={<Error/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
