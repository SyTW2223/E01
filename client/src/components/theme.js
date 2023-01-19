import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ad7af0',
    },
    secondary: {
      main: '#db9b2c',
      secondary: '#ebb454'
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