import React from 'react';
import './WideButton.less'

const WideButton = ({children, ...props}) => {
  return (
    <button {...props} className='wide-button'>
        {children}
    </button>
  );
}


export default WideButton;
