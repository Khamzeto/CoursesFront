import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material/Select';
import $api from '../api/axiosInstance';

const Register: React.FC = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
    role: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: checked,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onFinish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await $api.post('/api/v1/auth/register', {
        username: formValues.email,
        password: formValues.password,
        firstname: formValues.firstName,
        lastname: formValues.lastName,
        surname: formValues.middleName,
        role: formValues.role.toUpperCase(),
      });
      console.log('Success:', response.data);
      window.location.href = '/login';
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h6" gutterBottom>
            Регистрация
          </Typography>
          <Box component="form" onSubmit={onFinish}>
            <TextField
              name="email"
              sx={{ marginBottom: 2, marginTop: 2 }}
              label="Электронная почта"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={formValues.email}
              onChange={handleInputChange}
            />
            <TextField
              name="lastName"
              label="Фамилия"
              variant="outlined"
              fullWidth
              required
              value={formValues.lastName}
              onChange={handleInputChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              name="firstName"
              label="Имя"
              variant="outlined"
              fullWidth
              required
              value={formValues.firstName}
              onChange={handleInputChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              name="middleName"
              label="Отчество"
              variant="outlined"
              fullWidth
              value={formValues.middleName}
              onChange={handleInputChange}
              sx={{ marginBottom: 2 }}
            />

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel id="role-label">Роль</InputLabel>
              <Select
                labelId="role-label"
                name="role"
                value={formValues.role}
                onChange={handleSelectChange}
                label="Роль"
              >
                <MenuItem value="student">Студент</MenuItem>
                <MenuItem value="teacher">Преподаватель</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="password"
              label="Пароль"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={formValues.password}
              onChange={handleInputChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              name="confirmPassword"
              label="Подтвердите пароль"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={formValues.confirmPassword}
              onChange={handleInputChange}
              sx={{ marginBottom: 2 }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  sx={{ marginBottom: 2, marginTop: 2 }}
                  checked={formValues.agree}
                  onChange={handleCheckboxChange}
                  name="agree"
                />
              }
              label="Я согласен с условиями"
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ backgroundColor: '#1DA57A', marginTop: 2 }}
            >
              Зарегистрироваться
            </Button>
            <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
              <Link
                component={RouterLink}
                to="/login"
                style={{ color: 'white' }}
                variant="body2"
              >
                Есть аккаунт? Войти
              </Link>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Register;
