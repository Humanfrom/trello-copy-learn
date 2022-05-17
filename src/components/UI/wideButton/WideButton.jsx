import React from 'react';
import './WideButton.less'

//широкие красивые кнопки для досок
const WideButton = ({children, ...props}) => {
  return (
    <button {...props} className='wide-button'>
        {children}
    </button>
  );
}


export default WideButton;
