import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import List from "../../UI/List.jsx";
import AddList from "../../UI/addList/AddList.jsx";
import {DragDropContext} from 'react-beautiful-dnd'
import {moveList, moveTask} from './../../reducers/boardsReducer.js'
import DroppableContainer from '../../UI/dproppableContainer.jsx'
import DraggableContainer from '../../UI/draggableContainer.jsx'

const CurrentBoard = (props) => {
  const dispatch = useDispatch();
  const {id} = useParams();

  const currentBoard = getCurrentBoard(id);

  function getCurrentBoard(currentId){
    const boards = useSelector(state => state)
    return (boards.filter(elem => elem.id == currentId))[0]
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
    <div className='select-board'>
        <h1>{currentBoard.title}</h1>
        <DroppableContainer
          droppableId="all-lists"
          direction='horizontal'
          type="lists"
          listClass='flex-row'
          >
              {currentBoard.lists.map((item, index) => (
                <DraggableContainer key={'drag-' + item.id} draggableId={item.id} index={index}>
                    <List key={item.id} title={item.title} tasks={item.tasks} id={item.id}/>
                    </DraggableContainer>
                  ))}
          </DroppableContainer>
      <AddList currentBoardId={currentBoard.id} />
    </div>
    </DragDropContext>
  );
}

export default CurrentBoard;
