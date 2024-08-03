import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1DA57A', // Основной цвет
    },
    background: {
      default: '#EDEDED', // Светло-серый фон
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000', // Основной текст черный
      secondary: '#666666', // Вторичный текст серый
    },
    divider: '#CCCCCC',
    action: {
      hover: '#E0E0E0', // Цвет при наведении на выбранные элементы
    },
  },
  typography: {
    fontFamily: 'Manrope, sans-serif',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1DA57A', // Зеленый цвет для хедера
          boxShadow: 'none',
          color: '#FFFFFF', // Белый цвет текста на AppBar
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
          boxShadow: 'none',
          color: '#000000', // Цвет текста в Drawer
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#E0E0E0',
          },
          '&.Mui-selected:hover': {
            backgroundColor: '#1DA57A',
          },
          color: '#000000', // Цвет текста в ListItem
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#000000', // Цвет текста в заголовках таблицы
        },
        body: {
          color: '#000000', // Цвет текста в теле таблицы
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          color: '#000000', // Цвет текста в Paper
        },
      },
    },
  },
});

export default lightTheme;
