import React, {useEffect, useState} from 'react';
import './board.less'
import {useDispatch, useSelector} from "react-redux";
import {removeBoard, updateBoard} from '../../reducers/boardsReducer.js'
import WideButton from "../wideButton/WideButton.jsx"
import { useNavigate } from 'react-router-dom';
import AddInput from "../addInput/AddInput.jsx";

const Board = ({board}) => {
  const dispatch = useDispatch();
  const boards = useSelector(state => state.data.boards);
  const [title, setTitle] = useState(board.title)
  const navigate = useNavigate();

  function removeThisBoard(id){
    dispatch(removeBoard(id))
  }

  function selectBoard(id){
    navigate("/board/"+ id, { replace: true });
  }

  function updateThisBoard(){
    dispatch(updateBoard(title,board.id))
  }

  return (
    <div className="board">
      <div className='board-title'>
        <AddInput
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={updateThisBoard}/>
      </div>

      <div className="board-container">
        <span className='lists'>списки:</span>
          <ul>
            {board.lists.filter((elem,i) => i < 3).map(elem => <li key={elem.id}>{elem.title}</li>)}
          </ul>
      </div>

      <div className="board-buttons">

        <WideButton
          style={{width:200}}
          onClick={() => selectBoard(board.id)}>
          Изменить
        </WideButton>

        <WideButton
          style={{width:55}}
          onClick={() => removeThisBoard(board.id)}>
          <span className="material-icons">close</span>
        </WideButton>

      </div>
    </div>
  );
}

export default Board;
