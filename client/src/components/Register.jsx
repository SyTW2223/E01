import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const Register = () => {
  const [registerUsername, setregisterUsername] = useState('');
  const [registerPwd, setregisterPwd] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerUsername === '' || registerPwd === '')
      alert("Porfavor rellene los campos de usuario y contraseñas.");
    else {
      fetch('http://localhost:4000/user', {
        method: 'POST',
        body: new URLSearchParams({
          'name': registerUsername,
          'password': registerPwd,
        }),
      })
      .then((result) => {
        if (result.status === 404) {
          alert("El usuario ya existe, porfavor elija otro nombre de usuario.");
        } else {
            navigate("/");
        }
      })
      .catch((err) => console.log(err) );
    }

  };
  
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>
          Sign In!
        </h1>
        <input
          type='text'
          placeholder='user name'
          value={registerUsername}
          onChange={(e) => setregisterUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          value={registerPwd}
          onChange={(e) => setregisterPwd(e.target.value)}
        />
        <div>
          <button
            type='submit'
          >Submit</button>
        </div>
        <div>
          <Link to="/login">Volver al inicio de sesión.</Link>
        </div>
      </form>
    </div>
  )
}

export default Register;