import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addBoard} from '../reducers/boardsReducer.js'
import RoundAddButton from './roundAddButton/RoundAddButton.jsx'
import AddInput from './addInput/AddInput.jsx';
import './addboard.less'
import {v4} from 'uuid'

const AddBoard = () => {
  const dispatch = useDispatch();
  const boards = useSelector(state => state.data)
  const [title,setTitle] = useState('');

  function addNewBoard(){
    dispatch(addBoard({"id": v4(), "title":title,"lists":[]}))
  }

  return (
    <div className='board add-board'>
      <div className='board-title'>
        <AddInput type='text' placeholder="БЕЗ ИМЕНИ" value={title} onChange={e => setTitle(e.target.value)} required/>
      </div>
      <div className='button-container'>
        <RoundAddButton onClick={() => addNewBoard()}></RoundAddButton>
      </div>
    </div>
  );
}

export default AddBoard;
