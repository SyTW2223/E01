import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { ThemeProvider } from '@emotion/react';
import { theme } from '../themes/loginTheme'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Register = () => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPwd, setRegisterPwd] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerUsername === '' || registerPwd === '')
      alert("Porfavor rellene los campos de usuario y contraseñas.");
    else {
      fetch('http://localhost:4000/user', {
        method: 'POST',
        body: new URLSearchParams({
          'name': registerUsername,
          'password': registerPwd,
        }),
      })
      .then((result) => {
        if (result.status === 404) {
          alert("El usuario ya existe, porfavor elija otro nombre de usuario.");
        } else {
            navigate("/");
        }
      })
      .catch((err) => console.log(err) );
    }

  };
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 32,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: theme.palette.background.default
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{}} data-testid="sign-up-typography">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ m: 1 }}>
            {/* User Name Input */}
            <TextField
              data-testid="sign-up-username"
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="User Name"
              autoFocus
              onChange={(e) => setRegisterUsername(e.target.value)}
            />
            {/* User Password Input */}
            <TextField
              data-testid="sign-up-pwd"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setRegisterPwd(e.target.value)}
            />
            <Button
              data-testid="sign-up-button"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, 
                mb: 2, 
                bgcolor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.secondary',
                }
              }}                 
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link to='/' variant="body2" data-testid="sign-in-link">
                  {"Vuelve al inicio de sesión"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Register;