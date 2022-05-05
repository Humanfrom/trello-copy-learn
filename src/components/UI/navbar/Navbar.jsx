import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import mainLogo from "../../../img/logo.png";
import WideButton from "../wideButton/WideButton.jsx"
import './navbar.less'


const Navbar = () => {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div className='navbar'>
      <div className='navbar-buttons'>
        <WideButton onClick={() => navigate('/')}>
          <span className="material-icons">assignment_return</span>
        </WideButton>
        <WideButton onClick={() => document.location.replace('https://github.com/Humanfrom')}>
          <span className="material-icons">help</span>
        </WideButton>
      </div>
      <div className='navbar-title'>
        <button onClick={() => navigate('/')}>
          <img src={mainLogo} />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
