import React from 'react';
import {Droppable} from 'react-beautiful-dnd'

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
