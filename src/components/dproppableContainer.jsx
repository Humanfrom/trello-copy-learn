import React from 'react';
import {Droppable} from 'react-beautiful-dnd'

//контейнерный объект назначения ДНД со структурой, которая необходима для корректной работы 'react-beautiful-dnd'
//передаём через пропсы: содержимое контейнера, ID объекта назначения, направление драгндропа, тип переносимых объектов и доп. стили для контейнера
const DroppableContainer = ({children,droppableId,direction,type,listClass}) => {
  return (
    <Droppable
        droppableId={droppableId}
        direction={direction}
        type={type}
        >
      {provided => (
        <div
          className={listClass}
          ref={provided.innerRef}
          {... provided.droppableProps}
        >
            {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default DroppableContainer;
