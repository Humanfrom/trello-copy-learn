import React, {useEffect} from 'react';
import './main.less'
import {useDispatch, useSelector} from "react-redux";
//import {getRepos} from './../action/repos.js'
import Board from "../../UI/board/Board.jsx"
import AddBoard from "../../UI/AddBoard.jsx"

const Main = () => {
  const dispatch = useDispatch();
  const boards = useSelector(state => state.data)

  return (
  <div>
    <div className='select-board'>
      {boards.map(elem => <Board key={elem.id} board={elem}/>)}
      <AddBoard/>
    </div>
  </div>
)
}

export default Main;
