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

//страница конкретной, выбранной пользователем доски
const CurrentBoard = ({count}) => {

  const dispatch = useDispatch();
  //достаём ID выбранной доски из маршрута
  const {id} = useParams();

  //получаем объект доски через её ID
  const currentBoard = getCurrentBoard(id);

  //функция получения объекта доски
  function getCurrentBoard(currentId){
    const boards = useSelector(state => state)
    return (boards.filter(elem => elem.id == currentId))[0]
  }

  //добавляем нужный объект доски в список досок
  function addNewList(title){
    dispatch(
      addList(
      {"id": v4(), "title": title, "tasks": []},
      currentBoard.id
      )
    )
  }

  //функция обработки события ДНД
  const onDragEnd = (result) => {
    const {destination, source, type} = result;

    //если отпустили вне области, то ничего не происходит
    if(!destination) return;
    //если отпустили на то же место, где и был, то ничего не происходит
    if(destination.droppableId === source.droppableId &&
      destination.index === source.index) return;

    //если есть изменения, то смотрим какого именно типа (перемещаем списки) и отправляем в редюсер
    if(type === 'lists'){
      dispatch(moveList(result, currentBoard.id))
    }
    //если есть изменения, то смотрим какого именно типа (перемещаем таски) и отправляем в редюсер
    if(type === 'tasks'){
      dispatch(moveTask(result, currentBoard.id))
    }

  }

  //небольшая хитрость: 'react-beautiful-dnd' не работает с сетками, но скролл это неудобно
  //разбиваем на колонки и заполняем их так, как будто у нас строки
  //при распределении строк по столбцам учитываем отступ в один элемент (элемент для создания нового списка), сами элементы оборачиваем в ДНД объекты
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
