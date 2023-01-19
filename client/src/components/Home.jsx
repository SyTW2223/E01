import { Typography, Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import { ThemeProvider } from '@mui/material';
import {theme} from './theme'
import { Container } from '@mui/system';
import SessionFrom from './SessionForm';

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
      <Container component = 'main' maxWidth='lg'>
      <Typography component='h1' variant="h3" align='center'>
          ¡ Inicia una nueva sesión de estudio !
      </Typography>
        <Box sx= {{
          border:'5px solid',
          borderColor: 'secondary.main',
          marginTop: 32,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'white',
          padding: 8 
        }}>
          <SessionFrom/>
        </Box>
        <Button
          onClick={handleLogout}
          variant="contained"
          sx={{ mt: 3, 
                mb: 2, 
                bgcolor: 'secondary.main',
                '&:hover': {
                  backgroundColor: 'secondary.secondary',
                }
          }}              
        >
          Logout
        </Button>
      </Container>
    </ThemeProvider>
  )
}

export default Home;