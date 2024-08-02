import React from 'react';
import { Avatar, Box, Typography, Paper, Grid, TextField, Button } from '@mui/material';

const Profile: React.FC = () => {
  return (
    <Paper sx={{ padding: 3, backgroundColor: '#141414', color: '#ffffff' }}>
      <Typography variant="h6" gutterBottom>
        Профиль
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Avatar
            alt="Avatar"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 100, height: 100 }}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              name="fullName"
              label="ФИО"
              variant="outlined"
              fullWidth
              required
              sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
              defaultValue="Иван Иванов"
            />
            <TextField
              name="email"
              label="Электронная почта"
              variant="outlined"
              fullWidth
              required
              sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
              defaultValue="ivanov@example.com"
            />
            <TextField
              name="phone"
              label="Телефон"
              variant="outlined"
              fullWidth
              required
              sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
              defaultValue="+7 123 456 7890"
            />
            <Button variant="contained" type="submit" sx={{ backgroundColor: '#1DA57A' }}>
              Обновить профиль
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Profile;
