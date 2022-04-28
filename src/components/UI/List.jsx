import React, {useState} from 'react';
import Task from "./Task";
import {v4} from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import TaskTextarea from "./taskTextarea/TaskTextarea.jsx"
import {addTask, removeList, updateList} from '../reducers/boardsReducer.js';
import DroppableContainer from './dproppableContainer.jsx';
import DraggableContainer from './draggableContainer.jsx';
import './list.less';

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
    <div className="list">

      <div className='list-header'>
        <div className='drag-line pattern-dots'></div>
        <button style={{width:55}} onClick={() => removeThisList()}>
          <span className="material-icons">close</span>
        </button>
      </div>

      <div className='list-title'>

        <TaskTextarea
        className='input list-title-input'
        onChange={e => setListTitle(e.target.value)}
        onBlur={updateThisList}
        >
          {listTitle}
        </TaskTextarea>
      </div>


          <DroppableContainer
            droppableId={id}
            type="tasks"
            listClass='flex-column'
            >
                {tasks.map((task, index) => (
                    <DraggableContainer key={'drag-' + task.id} draggableId={task.id} index={index}>
                          <Task key={task.id} id={task.id} title={task.text} checked={task.checked}/>
                    </DraggableContainer>
                  ))}
          </DroppableContainer>


      <div className="list-buttons">

        <button style={{display: 'flex'}} onClick={() => addNewTask()}>
          <span className="material-icons">add_circle</span>
        </button>

        <TaskTextarea
        placeholder="БЕЗ ИМЕНИ"
        onChange={e => setTaskTitle(e.target.value)}>
          {taskTitle}
        </TaskTextarea>
      </div>

    </div>
  );
}

export default List;
