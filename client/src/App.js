import Login from './components/Login';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import { ThemeProvider } from '@emotion/react';
import { theme } from './components/theme';

export default function App() {

  return (
    <Routes>
      <Route path='/' element={
              <PrivateRoute>
                <ThemeProvider theme={theme}>
                    <Home />
                </ThemeProvider>
              </PrivateRoute>
            }/>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  )
};
