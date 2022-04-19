import React from 'react';
import Task from "./Task";

const List = ({tasks, title}) => {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
      {tasks.map(elem => <Task key={Math.random() * 5} title={elem.text}/>)}
      </ul>
    </div>
  );
}

export default List;
