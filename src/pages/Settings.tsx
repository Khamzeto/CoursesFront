import React from 'react';
import { Box, Typography, Paper, TextField, Button, Grid } from '@mui/material';

const Settings: React.FC = () => {
  return (
    <Paper sx={{ padding: 3, backgroundColor: '#141414', color: '#ffffff' }}>
      <Typography variant="h6" gutterBottom>
        Настройки
      </Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          name="currentPassword"
          label="Текущий пароль"
          type="password"
          variant="outlined"
          fullWidth
          required
          sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
        />
        <TextField
          name="newPassword"
          label="Новый пароль"
          type="password"
          variant="outlined"
          fullWidth
          required
          sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
        />
        <TextField
          name="confirmPassword"
          label="Подтвердите новый пароль"
          type="password"
          variant="outlined"
          fullWidth
          required
          sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
        />
        <Button variant="contained" type="submit" sx={{ backgroundColor: '#1DA57A' }}>
          Обновить пароль
        </Button>
      </Box>
    </Paper>
  );
};

export default Settings;
