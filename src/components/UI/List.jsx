import React, {useState} from 'react';
import Task from "./Task";
import {v4} from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import WideButton from "./wideButton/WideButton.jsx"
import AddInput from "./addInput/AddInput.jsx"
import {addTask, removeList} from '../reducers/reducer.js'

const List = ({tasks, title, id}) => {
  const dispatch = useDispatch();
  const [taskTitle,setTaskTitle] = useState('');

  function addNewTask(){
    dispatch({})
  }

  function removeThisList(){
    dispatch(removeList(id))
  }


  return (
    <div className="board">
      <div className='board-title'>
        <h2>{title}</h2>
      </div>
      <ul>
      {tasks.map(elem => <Task key={Math.random() * 5} title={elem.text}/>)}
      </ul>
      <div className="board-buttons">
        <AddInput type='text' placeholder="БЕЗ ИМЕНИ" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} required/>
        <WideButton style={{width:200}} onClick={() => addNewTask()}>Добавить</WideButton>
        <WideButton style={{width:55}} onClick={() => removeThisList()}>
          <span className="material-icons">close</span>
        </WideButton>
      </div>
    </div>
  );
}

export default List;
