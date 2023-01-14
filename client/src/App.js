import Login from './components/Login';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';

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
          <Route path='/register' element={<Register />} />
        </Routes>
    </div>
  )
};
