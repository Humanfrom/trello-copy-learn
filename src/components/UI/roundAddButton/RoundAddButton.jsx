import React from 'react';
import './RoundAddButton.less'

const RoundAddButton = ({children, ...props}) => {
  return (
    <div className='round-add over around '>
      <div className='round-add over'>
        <button {...props} className='round-add'>
          <span className="material-icons add-icon">note_add</span>
            {children}
        </button>
      </div>
    </div>
  );
}

export default RoundAddButton;
