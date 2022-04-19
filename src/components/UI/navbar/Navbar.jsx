import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import mainLogo from "../../../img/logo.png";
import './navbar.less'


const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className='navbar'>
      <div className='navbar-buttons'>
         <Link to='/'><button>Главная</button></Link>
        <button onClick={() => navigate(-1)}>Назад</button>
      </div>
      <div className='navbar-title'>
        <img src={mainLogo} />
      </div>
    </div>
  );
}

export default Navbar;
