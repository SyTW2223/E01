import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';

export default function App() {

  return (
    <div>
      <h1> Esta será la NavBar </h1>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
};
