import {addList} from '../../reducers/boardsReducer.js'
import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import RoundAddButton from '../roundAddButton/RoundAddButton.jsx'
import AddInput from '../addInput/AddInput.jsx';
//import './addboard.less'
import {v4} from 'uuid'

const AddList  = ({currentBoardId}) => {

  const dispatch = useDispatch();
  const boards = useSelector(state => state.data)
  const [title,setTitle] = useState('');

  function addNewList(){
    dispatch(addList({"id": v4(), "title": title, "tasks": []},currentBoardId))
  }

  return (
    <div className='board add-board'>
      <div className='board-title'>
        <AddInput type='text' placeholder="БЕЗ ИМЕНИ" value={title} onChange={e => setTitle(e.target.value)} required/>
      </div>
      <div className='button-container'>
        <RoundAddButton onClick={() => addNewList()}></RoundAddButton>
      </div>
    </div>
  );
}

export default AddList;
