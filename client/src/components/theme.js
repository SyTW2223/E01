import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#658864', // Verde fuerte
      secondary: '#B7B78A', // Verde caqui
    },
    secondary: {
      main: '#DDDDDD',      // Gris
      secondary: '#ABC270'  // lima claro
    },
    error: {
      main: '#e57373',
    },
    success: {
      main: '#008000',
    },
    background: {
      default: '#ffffff'
    },
  },
}
);