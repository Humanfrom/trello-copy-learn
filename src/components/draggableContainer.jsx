import React from 'react';
import {Draggable} from 'react-beautiful-dnd'

//контейнер объекта ДНД со структурой, которая необходима для корректной работы 'react-beautiful-dnd'
//передаём через пропсы: содержимое контейнера, ID перестаскиваемого объекта, его индекс в массиве
const DraggableContainer = ({children, draggableId, index}) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
        {children}
        </div>
      )}
    </Draggable>
  );
}

export default DraggableContainer;
