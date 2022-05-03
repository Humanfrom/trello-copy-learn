import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import mainLogo from "../../../img/logo.png";
import WideButton from "../wideButton/WideButton.jsx"
import './navbar.less'


const Navbar = () => {
  const navigate = useNavigate();
  const params = useParams();

  console.log(params);

  return (
    <div className='navbar'>
      <div className='navbar-buttons'>
        <WideButton onClick={() => navigate('/')}>
        <span className="material-icons">assignment_return</span>
        </WideButton>
        <WideButton onClick={() => navigate(-1)}>
          <span className="material-icons">help</span>
        </WideButton>
      </div>
      <div className='navbar-title'>
        <img src={mainLogo} />
      </div>
    </div>
  );
}

export default Navbar;
