import React, {useState} from 'react';
import Task from "./Task";
import {v4} from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import WideButton from "./wideButton/WideButton.jsx"
import AddInput from "./addInput/AddInput.jsx"
import {addTask, removeList, updateList} from '../reducers/boardsReducer.js'

const List = ({tasks, title, id}) => {
  const dispatch = useDispatch();
  const [taskTitle,setTaskTitle] = useState('');
  const [listTitle,setListTitle] = useState(title);

  function addNewTask(){
    dispatch(addTask({"id": v4(),"checked": false, "text": taskTitle},id));
    setTaskTitle('');
  }

  function removeThisList(){
    dispatch(removeList(id))
  }

  function updateThisList(){
    dispatch(updateList(listTitle, id))
  }


  return (
    <div className="board">

      <div className='board-title'>
        <AddInput value={listTitle} onChange={e => setListTitle(e.target.value)} onBlur={updateThisList}/>
      </div>

        <ul style={{'padding': 0, 'listStyleType': 'none'}}>
          {tasks.map(task => <Task key={task.id} id={task.id} title={task.text} checked={task.checked}/>)}
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
