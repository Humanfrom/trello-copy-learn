import React, { useEffect, useRef } from 'react';
import './taskTextarea.less'

const TaskTextarea = ({children, onChange, className, ...props}) => {
  const textarea = useRef(null)

  useEffect(()=> {
    auto_grow(textarea.current)
  },[])

  function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
  }

  return (
      <textarea
      {...props}
      ref={textarea}
      className={className ? className : 'task-textarea'}
      onChange={e => {
        onChange(e);
        auto_grow(e.target);
      }}
      value={children}
      >
      </textarea>
  );
}

export default TaskTextarea;
