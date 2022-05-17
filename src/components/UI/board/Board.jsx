import React, {useEffect, useState} from 'react';
import './board.less'
import {useDispatch} from "react-redux";
import {removeBoard, updateBoard} from '../../reducers/boardsReducer.js'
import WideButton from "../wideButton/WideButton.jsx"
import { useNavigate } from 'react-router-dom';
import AddInput from "../addInput/AddInput.jsx";
import {Droppable, Draggable} from 'react-beautiful-dnd';

//получаем через пропсы объект конкретной доски
const Board = ({board}) => {

  const dispatch = useDispatch();
  const [title, setTitle] = useState(board.title)
  const navigate = useNavigate();

  //удаляем доску по ID
  function removeThisBoard(id){
    dispatch(removeBoard(id))
  }

  //переходим на страницу изменения выбранной доски
  function selectBoard(id){
    navigate("/board/"+ id, { replace: true });
  }

  //обновляем название доски
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
