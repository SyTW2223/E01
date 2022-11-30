import Login from './components/Login';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

export default function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={
                <PrivateRoute>
                    <Home />
                </PrivateRoute>
              }/>
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
};
