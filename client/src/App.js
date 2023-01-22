import Login from './components/Login';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import { ThemeProvider } from '@emotion/react';
import { theme } from './themes/mainTheme';
import PreviousSession from './components/PreviousSession';

export default function App() {

  return (
    <Routes>
      <Route path='/' element={
              <PrivateRoute>
                {/* <ThemeProvider theme={theme}> */}
                    <Home />
                {/* </ThemeProvider> */}
              </PrivateRoute>
            }/>
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/previous' element={<PreviousSession />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  )
};
