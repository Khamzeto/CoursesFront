import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#333333', // Основной темный цвет
    },
    background: {
      default: '#121212 !important', // Темный фон
      paper: '#1E1E1E', // Темный цвет для Paper
    },
    text: {
      primary: '#FFFFFF', // Основной текст белый
      secondary: '#B0BEC5', // Вторичный текст светло-серый
    },
    divider: '#424242',
    action: {
      hover: '#333333', // Цвет при наведении на выбранные элементы
    },
  },
  typography: {
    fontFamily: 'Manrope, sans-serif',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E', // Темный цвет для хедера
          boxShadow: 'none',
          color: '#FFFFFF', // Белый цвет текста на AppBar
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1E1E1E',
          boxShadow: 'none',
          color: '#FFFFFF', // Цвет текста в Drawer
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#333333',
          },
          '&.Mui-selected:hover': {
            backgroundColor: '#444444',
          },
          color: '#FFFFFF', // Цвет текста в ListItem
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#FFFFFF', // Цвет текста в заголовках таблицы
        },
        body: {
          color: '#FFFFFF', // Цвет текста в теле таблицы
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          backgroundColor: '#1E1E1E !important',
          color: '#FFFFFF', // Цвет текста в Paper
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#2BA9EF !important', // Основной темный цвет для кнопок
          color: '#FFFFFF', // Белый цвет текста на кнопках
          textTransform: 'none', // Убрать uppercase
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#444444', // Цвет при наведении на кнопки
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', // Белый цвет иконок
          '&:hover': {
            color: '#B0BEC5', // Светло-серый цвет при наведении на иконки
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', // Белый цвет текста
        },
      },
    },
  },
});

export default darkTheme;
