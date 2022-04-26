import React from 'react';
import {Draggable} from 'react-beautiful-dnd'

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
