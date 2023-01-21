import React from 'react';
import { Typography, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { theme } from '../themes/mainTheme';
import { Container } from '@mui/system';
import SessionForm from './form/SessionForm';
import Navbar from './Navbar';

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
        <Navbar/>
        <Container component = 'main' maxWidth='false'>
        <Typography component='h1' variant="h3" align='center' data-testid="home-typography"
          sx={{
            paddingTop: 8, 
            fontFamily: 'monospace',
            fontWeight: 700,
            color: 'primary.main'}}
          >
            ¡ Inicia una nueva sesión de estudio !
        </Typography>
        
          <Box data-testid="home-form" sx= {{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <SessionForm/>
          </Box>
        </Container>
    </ThemeProvider>
  )
}

export default Home;