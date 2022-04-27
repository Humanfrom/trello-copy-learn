import React, {useEffect} from 'react';
import './main.less'
import {useDispatch, useSelector} from "react-redux";
import {DragDropContext, Draggable} from 'react-beautiful-dnd'
import Board from "../../UI/board/Board.jsx"
import AddBoard from "../../UI/AddBoard.jsx"
import {moveBoard} from '../../reducers/boardsReducer.js'
import DroppableContainer from '../../UI/dproppableContainer.jsx'
import DraggableContainer from '../../UI/draggableContainer.jsx'

const Main = () => {
  const dispatch = useDispatch();
  const boards = useSelector(state => state)
  console.log(boards)

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
    <div className='select-board'>
        <DroppableContainer
          droppableId="all-boards"
          direction='horizontal'
          type="boards"
          listClass="flex-row"
          >
              {boards.map((item, index) => (
                  <DraggableContainer key={'drag-' + item.id} draggableId={item.id} index={index}>
                        <Board key={item.id} board={item}/>
                  </DraggableContainer>
                ))}
        </DroppableContainer>
      <AddBoard/>
    </div>
  </DragDropContext>
)
}

export default Main;
