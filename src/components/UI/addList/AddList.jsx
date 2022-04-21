import {addList} from '../../reducers/reducer.js'
import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import RoundAddButton from '../roundAddButton/RoundAddButton.jsx'
import AddInput from '../addInput/AddInput.jsx';
//import './addboard.less'
import {v4} from 'uuid'

const AddList  = ({currentBoardId}) => {

  const dispatch = useDispatch();
  const boards = useSelector(state => state.data.boards)
  const [title,setTitle] = useState('');

  function addNewList(){
    dispatch(addList({'id': currentBoardId, 'value': {"id": v4(), "title": title, "tasks": []}}))
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
