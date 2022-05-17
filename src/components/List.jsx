import React, {useState} from 'react';
import Task from "./Task";
import {v4} from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import TaskTextarea from "./UI/taskTextarea/TaskTextarea.jsx"
import {addTask, removeList, updateList} from './reducers/boardsReducer.js';
import DroppableContainer from './dproppableContainer.jsx';
import DraggableContainer from './draggableContainer.jsx';
import './list.less';

const List = ({list}) => {

  const dispatch = useDispatch();
  const [taskTitle,setTaskTitle] = useState(''); //поле для создания нового таска
  const [listTitle,setListTitle] = useState(list.title); //изменяемое название списка

  //добавляем новый таск - готовая структура таска
  function addNewTask(){
    dispatch(addTask({"id": v4(),"checked": false, "text": taskTitle},list.id));
    setTaskTitle('');
  }

  //удаляем список по ID из пропсов
  function removeThisList(){
    dispatch(removeList(list.id))
  }

  //обновляем название списка по стейту (используем ID из пропсов)
  function updateThisList(){
    dispatch(updateList(listTitle, list.id))
  }

  //список состоит из: области для перетаскивания + кнопка закрытия, изменяемого названия,
  //сиска тасков, блока для добавления нового таска (текстареа + кнопка добавления)
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
            droppableId={list.id}
            type="tasks"
            listClass='flex-column'
            >
                {list.tasks.map((task, index) => (

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
