import React from 'react';
import { useState } from 'react';
import { login } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { makeStyles } from '@mui/material';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [userPwd, setUserPwd] = useState('');
  const dispatch = useDispatch();
  
  const useStyles = makeStyles((theme) => ({
    button: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  }));
  
  async function handleSubmit(e) {
    e.preventDefault();
    if (userName === "" || userPwd === "") {
      alert("Por favor, rellene los campos de usuario y contraseña.");
    } else {
      try {
        const options = { method: "POST", body: new URLSearchParams({
          'name': userName,
          'password': userPwd,
        })};
        const result = await fetch(`http://localhost:4000/user/login`, options);
        if (result.status === 200) {
          dispatch(login({
            userName: userName,
            userPwd: userPwd,
            loggedIn: true,
          }));
        } else if (result.status === 500) {
          throw new Error("No existe el usuario, registrese primero.");
        } else {
          throw new Error("Error desconocido.");
        }
      } catch (error) {
        if (error.message === "No existe el usuario, registrese primero.") {
          alert(error.message);
        } else {
          alert("Contraseña inválida.");
        }
      }
    }
  } 
  
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>
          Sign Up!
        </h1>
        <input
          type='text'
          placeholder='user name'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          value={userPwd}
          onChange={(e) => setUserPwd(e.target.value)}
        />
        <div className='pt-4'>
          <button
            type='submit'
          >Submit</button>
        </div>
        <div>
          <Link to="/register">¡Regístrate si no tienes cuenta!</Link>
        </div>
      </form>
    </div>
  )
}

export default Login;