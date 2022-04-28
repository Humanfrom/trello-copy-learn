import React, { useState, useEffect } from 'react';
import {addBoard} from '../reducers/boardsReducer.js'
import RoundAddButton from './roundAddButton/RoundAddButton.jsx'
import AddInput from './addInput/AddInput.jsx';
import './additem.less'

const AddItem = ({addNewItem}) => {
  const [title,setTitle] = useState('');

  return (
    <div className='board add-board'>
      <div className='board-title'>
        <AddInput type='text' placeholder="БЕЗ ИМЕНИ" value={title} onChange={e => setTitle(e.target.value)} required/>
      </div>
      <div className='button-container'>
        <RoundAddButton
        onClick={() => {
          addNewItem(title);
          setTitle('');
        }}></RoundAddButton>
      </div>
    </div>
  );
}

export default AddItem;
