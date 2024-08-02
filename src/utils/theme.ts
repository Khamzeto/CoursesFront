import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1DA57A',
    },
    background: {
      default: '#1f1f1f',
      paper: '#141414',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
    divider: '#434343',
  },
  typography: {
    fontFamily: 'Manrope, sans-serif',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1f1f1f',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#141414',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#1f1f1f',
          },
          '&.Mui-selected:hover': {
            backgroundColor: '#1DA57A',
          },
        },
      },
    },
  },
});

export default darkTheme;
