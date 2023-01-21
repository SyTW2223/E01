import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#181D31', // Verde fuerte
      secondary: '#678983', // Verde caqui
    },
    secondary: {
      main: '#E6DDC4',      // Gris
      secondary: '#F0E9D2'  // lima claro
    },
    error: {
      main: '#e57373',
    },
    success: {
      main: '#008000',
    },
    background: {
      default: '#F5F0BB'
    },
  },
}
);