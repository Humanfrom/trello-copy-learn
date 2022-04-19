import React from 'react';
import { useNavigate } from 'react-router-dom';


const Error = () => {
const navigate = useNavigate();

  return (
    <div>
      <h1>Страница не существует</h1>
      <button onClick={() => navigate(-1)}>OK</button>
    </div>
  );
}

export default Error;
