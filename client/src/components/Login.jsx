import React from 'react';
import { useState } from 'react';
import { login } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState('');
  const [userPwd, setUserPwd] = useState('');
  const dispatch = useDispatch();

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
        const result = await (await fetch(`http://localhost:4000/user/login`, options));
        const token = await result.json();        
        if (result.status === 200) {
          dispatch(login({
            userName: userName,
            userPwd: userPwd,
            token: token.token,
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
    <div className='flex justify-center w-full h-screen items-center bg-white'>
      <form onSubmit={(e) => handleSubmit(e)} 
            className='flex flex-col items-center justify-center bg-purple-300 w-[600px] h-screen md:h-[450px] rounded-lg'>
        <h1 className='mb-10 font-extrabold text-3xl text-white'>
          Sign Up!
        </h1>
        <input
          type='text'
          placeholder='user name'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className='w-2/3 mb-4 text-gray-600 rounded bg-gray-100 h-[30px] pl-2' 
        />
        <input
          type='password'
          placeholder='password'
          value={userPwd}
          onChange={(e) => setUserPwd(e.target.value)}
          className='w-2/3 mb-4 text-gray-600 rounded bg-gray-100 h-[30px] pl-2'
        />
        <div className='pt-4'>
          <button
            type='submit'
            className='bg-orange-400 text-white py-2 px-6 rounded hover:bg-orange-500 font-semibold
            duration-500'
          >Submit</button>
        </div>
        <div className='text-slate-200 font-bold pt-8'>
          <Link to="/register">¡Regístrate si no tienes cuenta!</Link>
        </div>
      </form>
    </div>
  )
}

export default Login;