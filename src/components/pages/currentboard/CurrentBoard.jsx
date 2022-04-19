import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import List from "../../UI/List.jsx";

const CurrentBoard = (props) => {
  const {id} = useParams();

  const currentBoard = getCurrentBoard(id);

  function getCurrentBoard(currentId){
    const boards = useSelector(state => state.data.boards)
    return (boards.filter(elem => elem.id == currentId))[0]
  }

  return (
    <div>
      <h1>{currentBoard.title}</h1>
      {currentBoard.lists.map(elem => <List key={elem.id} title={elem.title} tasks={elem.tasks}/>)}
      <button>Добавить список</button>
      <input type='text' palceholder="Название списка..."/>
    </div>
  );
}

export default CurrentBoard;
