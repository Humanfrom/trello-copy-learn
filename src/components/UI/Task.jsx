import React from 'react';
import WideButton from "./wideButton/WideButton.jsx"

const Task = ({title}) => {

  function removeThisTask(){}

  return (
    <div>
      <li>{title}</li>
      <button onClick={() => removeThisTask()}><span className="material-icons">close</span></button>
    </div>
  );
}

export default Task;
