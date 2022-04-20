import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addBoard} from '../reducers/reducer.js'
import RoundAddButton from './roundAddButton/RoundAddButton.jsx'
import AddInput from './addInput/AddInput.jsx';
import './addboard.less'

const AddBoard = () => {
  const dispatch = useDispatch();
  const boards = useSelector(state => state.data.boards)
  const [title,setTitle] = useState('');

  function addNewBoard(){
    dispatch(addBoard([...boards, {"id": Math.random() * 100, "title":title,"lists":[]}]))
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
