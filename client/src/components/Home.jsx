import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import Navbar from './Navbar';

const Home = () => {
  const dispatch = useDispatch();

  const handleClick = (e)  => {
    e.preventDefault();

    dispatch(logout());
  };
  
  return (
    <div className='flex justify-center flex-col items-center'>
      <Navbar/>
      <h1>Home</h1>
      <button 
        onClick={(e) => handleClick(e)}
        className='bg-orange-400 text-white py-2 px-6 rounded hover:bg-orange-500 font-semibold
        duration-500'
      > Logout </button>
    </div>
    
  )
}

export default Home;