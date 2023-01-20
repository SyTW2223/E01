import { Typography, Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import { ThemeProvider } from '@mui/material';
import {theme} from './theme'
import { Container } from '@mui/system';
import SessionFrom from './form/SessionForm';
import '../App.css';
import { Link } from "react-router-dom";
import Navbar from './Navbar'

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
    <ThemeProvider theme={theme}>
        <Navbar/>
        <Container component = 'main' maxWidth='false'
        >
        <Typography component='h1' variant="h3" align='center' 
          sx={{
            paddingTop: 8, 
            fontFamily: 'Arial',
            color: 'primary.main'}}
          >
            ¡ Inicia una nueva sesión de estudio !
        </Typography>
          <Box sx= {{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <SessionFrom/>
          </Box>
          <Button
            onClick={handleLogout}
            variant="contained"
            sx={{ mt: 3, 
                  mb: 2, 
                  bgcolor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'secondary.secondary',
                  }
            }}              
          >
            Logout
          </Button>

          <Button
            variant="contained"
            sx={{ mt: 3, 
                  mb: 2, 
                  bgcolor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'secondary.secondary',
                  }
            }}              
          >
            <Link to='/previous'>
              {"Sesiones anteriores"}
            </Link>
          </Button>
        </Container>
    </ThemeProvider>
  )
}

export default Home;