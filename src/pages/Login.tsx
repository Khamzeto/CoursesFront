import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import $api from '../api/axiosInstance';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginData = {
      username: data.get('email')?.toString() || '',
      password: data.get('password')?.toString() || '',
    };

    try {
      const response = await $api.post('/api/v1/auth/login', loginData);
      if (response.data) {
        // Сохранение access токена
        localStorage.setItem('token', response.data.access);
        console.log('Login successful:', response.data);
        console.log('Token saved in localStorage:', localStorage.getItem('token'));

        console.log('User information:', response.data.user);

        // Сохранение данных пользователя
        localStorage.setItem('user', JSON.stringify(response.data.user));

        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your email and password.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Электронная почта"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, background: '#1DA57A' }}
          >
            Войти
          </Button>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Box display="flex" justifyContent="space-between" width="100%">
            <Link component={RouterLink} to="/register" variant="body2">
              Нет аккаунта? Зарегистрироваться
            </Link>
            <Link component={RouterLink} to="/forgot-password" variant="body2">
              Забыли пароль?
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
