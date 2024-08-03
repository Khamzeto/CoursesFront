import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './App';
import darkTheme from './utils/theme';
import './index.css';
ReactDOM.render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />

    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
