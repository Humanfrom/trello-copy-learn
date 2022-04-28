import React, {useState} from 'react';
import WideButton from "./wideButton/WideButton.jsx"
import {useDispatch} from "react-redux";
import {removeTask, updateTask} from '../reducers/boardsReducer.js'
import TaskTextarea from "./taskTextarea/TaskTextarea.jsx"
import './task.less';

const Task = ({title, id, checked}) => {
  const [taskText, setTaskText] = useState(title)
  const dispatch = useDispatch();

  function removeThisTask(){
    dispatch(removeTask(id))
  }

  function updateThisTask(state,text){
    dispatch(updateTask({"id": id,"checked": state, "text": text}))
  }

  return (
    <div className="task" style={checked ? {background: 'lightgrey'} : {background: 'white'}}>

      <button onClick={() => updateThisTask(!checked, taskText)}>
        <span className="material-icons">
          {checked ? 'check_circle' : 'radio_button_unchecked'}
        </span>
      </button>

      <div className="flex-row">
        <TaskTextarea
        onChange={e => setTaskText(e.target.value)}
        onBlur={e => updateThisTask(checked, e.target.value)}
        >
          {taskText}
        </TaskTextarea>
      </div>

      <button onClick={removeThisTask}>
        <span className="material-icons">close</span>
      </button>

    </div>
  );
}

export default Task;
