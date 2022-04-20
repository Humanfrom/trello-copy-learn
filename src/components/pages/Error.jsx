import React from 'react';
import { useNavigate } from 'react-router-dom';
import WideButton from "../UI/wideButton/WideButton.jsx"
import './error.less';

const Error = () => {
const navigate = useNavigate();

  return (
    <div className="error-info">
      <h1>Ошибка: Такой страницы не существует</h1>
      <WideButton onClick={() => navigate('/')}>На главную</WideButton>
    </div>
  );
}

export default Error;
