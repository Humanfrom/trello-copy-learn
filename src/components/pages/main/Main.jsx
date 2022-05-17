import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {DragDropContext, Draggable} from 'react-beautiful-dnd'
import {v4} from 'uuid'

import Board from "../../UI/board/Board.jsx"
import AddItem from "../../UI/addItem/AddItem.jsx"
import {addBoard, moveBoard} from '../../reducers/boardsReducer.js'
import DroppableContainer from '../../dproppableContainer.jsx'
import DraggableContainer from '../../draggableContainer.jsx'
import './main.less'

//главная страница приложения
const Main = ({count}) => {
  const dispatch = useDispatch();
  const boards = useSelector(state => state)

  //добавляем новую доску путём создания пустого объекта доски
  function addNewBoard(title){
    dispatch(addBoard({"id": v4(), "title":title,"lists":[]}))
  }

  //функция обработчик события ДНД
  const onDragEnd = (result) => {
    const {destination, source, type} = result;

    //отпустили элемент вне области ДНД
    if(!destination) return;
    //отпустили элемент там же, где и взяли, соответственно ничего не происходит
    if(destination.droppableId === source.droppableId &&
      destination.index === source.index) return;

    //проверяем тип обрабатываемых элементов
    if(type === 'boards'){
      dispatch(moveBoard(result))
    }

  }

  //небольшая хитрость: 'react-beautiful-dnd' не работает с сетками, но скролл это неудобно
  //разбиваем на колонки и заполняем их так, как будто у нас строки
  //при распределении строк по столбцам учитываем отступ в один элемент (элемент для создания новой доски), сами элементы оборачиваем в ДНД объекты
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
