import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {DragDropContext} from 'react-beautiful-dnd'
import {v4} from 'uuid'

import List from "../../UI/List.jsx";
import AddItem from "../../UI/AddItem.jsx";
import {moveList, moveTask, addList} from './../../reducers/boardsReducer.js'
import DroppableContainer from '../../UI/dproppableContainer.jsx'
import DraggableContainer from '../../UI/draggableContainer.jsx'
import './currentboard.less'


const CurrentBoard = (props) => {
  const dispatch = useDispatch();
  const {id} = useParams();

  const currentBoard = getCurrentBoard(id);

  function getCurrentBoard(currentId){
    const boards = useSelector(state => state)
    return (boards.filter(elem => elem.id == currentId))[0]
  }

  function addNewList(title){
    dispatch(
      addList(
      {"id": v4(), "title": title, "tasks": []},
      currentBoard.id
      )
    )
  }

  const onDragEnd = (result) => {
    const {destination, source, type} = result;

    if(!destination) return;
    if(destination.droppableId === source.droppableId &&
      destination.index === source.index) return;

    if(type === 'lists'){
      dispatch(moveList(result, currentBoard.id))
    }

    if(type === 'tasks'){
      dispatch(moveTask(result, currentBoard.id))
    }

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='board-content'>
        <div className='board-header'>
          <h1>{currentBoard.title.toUpperCase()}</h1>
        </div>
        <div>
            <DroppableContainer
              droppableId="all-lists"
              direction='horizontal'
              type="lists"
              listClass='flex-row select-list'
              >
                  {currentBoard.lists.map((item, index) => (
                    <DraggableContainer key={'drag-' + item.id} draggableId={item.id} index={index}>
                        <List key={item.id} title={item.title} tasks={item.tasks} id={item.id}/>
                        </DraggableContainer>
                      ))}
                  <AddItem addNewItem={addNewList} />
              </DroppableContainer>
        </div>
      </div>
    </DragDropContext>
  );
}

export default CurrentBoard;
