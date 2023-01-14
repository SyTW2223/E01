import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import Navbar from './Navbar';
// import React, { useState } from 'react';

const Home = () => {
  const dispatch = useDispatch();

  /**
   * Function to handle the logout buttom
   */
  const handleLogout = (e)  => {
    e.preventDefault();
    dispatch(logout());
  };
  
  return (
    <div>
      <Navbar/>
      <h1>¡ Inicia una nueva sesión de estudio !</h1>
      <button 
        onClick={(e) => handleLogout(e)}
      > Logout </button>
    </div>
    
  )
}

export default Home;