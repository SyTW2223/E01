import { Typography, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import {theme} from './theme'
import { Container } from '@mui/system';
import SessionFrom from './form/SessionForm';
import '../App.css';
import Navbar from './Navbar'

const Home = () => {
  

  return (
    <ThemeProvider theme={theme}>
        <Navbar/>
        <Container component = 'main' maxWidth='false'
        >
        <Typography component='h1' variant="h3" align='center' 
          sx={{
            paddingTop: 8, 
            fontFamily: 'monospace',
            fontWeight: 700,
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
        </Container>
    </ThemeProvider>
  )
}

export default Home;