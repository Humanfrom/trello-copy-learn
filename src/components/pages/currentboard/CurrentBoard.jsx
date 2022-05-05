import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {DragDropContext} from 'react-beautiful-dnd'
import {v4} from 'uuid'

import List from "../../List.jsx";
import AddItem from "../../UI/addItem/AddItem.jsx";
import {moveList, moveTask, addList} from './../../reducers/boardsReducer.js'
import DroppableContainer from '../../dproppableContainer.jsx'
import DraggableContainer from '../../draggableContainer.jsx'
import './currentboard.less'


const CurrentBoard = ({count}) => {
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

        <div className='boards-conatainer'>
          {[...Array(count)].map((l,i) =>
            <DroppableContainer
              key={`droppableList-${i}`}
              droppableId={`all-lists-${i}`}
              direction='vertical'
              type="lists"
              listClass='flex-column select-list'
              >
                  {!i ? <AddItem addNewItem={addNewList}/> : null}
                  {currentBoard.lists.map((item, index) => (
                    (index + 1 - i) % count === 0
                    ? <DraggableContainer key={'drag-' + item.id} draggableId={item.id} index={index}>
                        <List key={item.id} list={item} />
                      </DraggableContainer>
                    : null
                    ))}
              </DroppableContainer>)
              }
        </div>

      </div>
    </DragDropContext>
  );
}

export default CurrentBoard;
