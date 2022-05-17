import React, { useEffect, useRef } from 'react';
import './taskTextarea.less'

//кстомное поле для ввода, которое само растягивается вертикально при переполнении строки
//пропсами принимает: содержимое, функцию изменения, дополнительные стили (при нестандартном использовании), прочие пропсы
const TaskTextarea = ({children, onChange, className, ...props}) => {
  const textarea = useRef(null)

  //задание высоты исходя из входного содержимого
  useEffect(()=> {
    auto_grow(textarea.current)
  },[])

  //функция изменяющая размер при переполнении строки
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
