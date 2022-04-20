import React from 'react';
import { useNavigate } from 'react-router-dom';
import mainLogo from "../../../img/logo.png";
import WideButton from "../wideButton/WideButton.jsx"
import './navbar.less'


const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className='navbar'>
      <div className='navbar-buttons'>
        <WideButton onClick={() => navigate('/')}>
        <span class="material-icons">home</span>
        </WideButton>
        <WideButton onClick={() => navigate(-1)}>
          <span class="material-icons">arrow_back</span>
        </WideButton>
      </div>
      <div className='navbar-title'>
        <img src={mainLogo} />
      </div>
    </div>
  );
}

export default Navbar;
