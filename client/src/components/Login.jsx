import React from 'react';
import { useState } from 'react';
import { login } from '../features/userSlice';
import { useDispatch } from 'react-redux';
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

const Login = () => {
  const [userName, setUserName] = useState('');
  const [userPwd, setUserPwd] = useState('');
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    if (userName === "" || userPwd === "") {
      alert("Por favor, rellene los campos de usuario y contraseña.");
    } else {
      try {
        const options = {
          method: "POST", body: new URLSearchParams({
            'name': userName,
            'password': userPwd,
          })
        };
        const result = await (await fetch(`http://localhost:4000/user/login`, options));
        const status = result.status;
        if (status === 200) {
          const token = await result.json();
          dispatch(login({
            userName: userName,
            userPwd: userPwd,
            token: token.token,
            loggedIn: true,
          }));
        } else if (result.status === 404) {
          throw new Error("No existe el usuario, registrese primero.");
        } else {
          throw new Error("Error desconocido.");
        }
      } catch (error) {
        alert(error.message);
      }
    }
  }

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
          <Typography component="h1" variant="h5" sx={{}} data-testid="sign-in-typography">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ m: 1 }}>
            {/* User name input */}
            <TextField
              data-testid="sign-in-username"
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="User Name"
              autoFocus
              onChange={(e) => setUserName(e.target.value)}
            />
            {/*  Password input */}
            <TextField
              data-testid="sign-in-pwd"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setUserPwd(e.target.value)}
            />
            <Button
              data-testid="sign-in-button"
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.secondary',
                }
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to='/register' variant="body2" data-testid="sign-up-link">
                  {"¿No tienes cuenta? Regístrate."}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Login;