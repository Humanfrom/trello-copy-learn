import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {DragDropContext, Draggable} from 'react-beautiful-dnd'
import {v4} from 'uuid'

import Board from "../../UI/board/Board.jsx"
import AddItem from "../../UI/AddItem.jsx"
import {addBoard, moveBoard} from '../../reducers/boardsReducer.js'
import DroppableContainer from '../../UI/dproppableContainer.jsx'
import DraggableContainer from '../../UI/draggableContainer.jsx'
import './main.less'

const Main = ({count}) => {
  const dispatch = useDispatch();
  const boards = useSelector(state => state)

  function addNewBoard(title){
    dispatch(addBoard({"id": v4(), "title":title,"lists":[]}))
  }

  const onDragEnd = (result) => {
    const {destination, source, type} = result;

    if(!destination) return;
    if(destination.droppableId === source.droppableId &&
      destination.index === source.index) return;

    if(type === 'boards'){
      dispatch(moveBoard(result))
    }

  }

  return (
  <DragDropContext onDragEnd={onDragEnd}>
    <div className='boards-conatainer'>
      {[...Array(count)].map((line,i) =>
          <DroppableContainer
          key={`droppable-${i}`}
          droppableId={`all-boards-${i}`}
          direction='vertical'
          type="boards"
          listClass="flex-column select-board"
          >
              {!i ? <AddItem addNewItem={addNewBoard}/> : null}
              {boards.map((item, index) => (
                (index + 1 - i) % count === 0
                ? <DraggableContainer key={'drag-' + item.id} draggableId={item.id} index={index}>
                        <Board key={item.id} board={item}/>
                  </DraggableContainer>
                : null
                ))}

        </DroppableContainer>)
      }
    </div>
  </DragDropContext>
)
}

export default Main;
