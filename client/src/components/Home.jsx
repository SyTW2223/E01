import React from 'react'
import { logout } from '../features/userSlice';
import Navbar from './Navbar';

const Home = () => {
  /**
   * Function to handle the logout buttom
   */
  const handleLogout = (e)  => {
    e.preventDefault();
    dispatch(logout());
  };
  
  return (
    <div className='flex justify-center flex-col items-center'>
      <Navbar/>
      <h1 className='uppercase text-2xl font-bold p-2'>¡ Inicia una nueva sesión de estudio !</h1>
      <button 
        onClick={(e) => handleLogout(e)}
        className='bg-orange-400 text-white py-2 px-6 rounded hover:bg-orange-500 font-semibold
        duration-500'
      > Logout </button>
    </div>
    
  )
}

export default Home;