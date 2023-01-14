import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import Navbar from './Navbar';
import React, { useState } from 'react';

const Home = () => {
  const dispatch = useDispatch();

  const handleClick = (e)  => {
    e.preventDefault();

    dispatch(logout());
  };
  
  return (
    <div>
      <Navbar/>
      <h1>Home</h1>
      <button 
        onClick={(e) => handleClick(e)}
      > Logout </button>
    </div>
    
  )
}

export default Home;