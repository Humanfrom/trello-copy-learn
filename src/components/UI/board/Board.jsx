import React, {useEffect} from 'react';
import './board.less'
import {useDispatch, useSelector} from "react-redux";
import {removeBoard} from '../../reducers/reducer.js'
import WideButton from "../wideButton/WideButton.jsx"
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Board = ({board}) => {
  const dispatch = useDispatch();
  const boards = useSelector(state => state.data.boards);
  const navigate = useNavigate();

  function removeThisBoard(id){
    dispatch(removeBoard(id))
  }

  function selectBoard(id){
    navigate("/board/"+ id, { replace: true });
  }

  return (
    <div className="board">
      <div className='board-title'>
        <h2>{board.title.toUpperCase()}</h2>
      </div>
      <div className="board-container">
        <span className='lists'>списки:</span>
          <ul>
            {board.lists.filter((elem,i) => i < 3).map(elem => <li key={elem.id}>{elem.title}</li>)}
          </ul>
      </div>
      <div className="board-buttons">
        <WideButton style={{width:200}} onClick={() => selectBoard(board.id)}>Изменить</WideButton>
        <WideButton style={{width:55}} onClick={() => removeThisBoard(board.id)}>
          <span class="material-icons">
            close
          </span></WideButton>
      </div>
    </div>
  );
}

export default Board;
