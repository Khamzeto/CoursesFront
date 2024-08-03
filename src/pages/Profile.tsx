import React, { useEffect, useState } from 'react';
import { Avatar, Box, Typography, Paper, Grid, TextField, Button } from '@mui/material';

interface User {
  id: number;
  username: string;
  password: string;
  role: string;
  avatarUrl: string | null;
}

interface UserProfile {
  id: number;
  firstname: string;
  lastname: string;
  surname: string;
  profession: string | null;
  telegram: string | null;
  userId: number;
  user: User;
}

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const userProfileData = localStorage.getItem('user');
    console.log(userProfileData);
    if (userProfileData) {
      setUserProfile(JSON.parse(userProfileData));
    }
  }, []);

  if (!userProfile) {
    return <Typography>Loading...</Typography>;
  }

  const handleUpdateProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Добавьте логику для обновления профиля пользователя
    console.log('Profile updated');
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Профиль
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Avatar
            alt="Avatar"
            src={userProfile.user.avatarUrl || '/static/images/avatar/1.jpg'}
            sx={{ width: 100, height: 100 }}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Box
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            onSubmit={handleUpdateProfile}
          >
            <TextField
              name="firstname"
              label="Имя"
              variant="outlined"
              fullWidth
              required
              defaultValue={userProfile.firstname}
            />
            <TextField
              name="lastname"
              label="Фамилия"
              variant="outlined"
              fullWidth
              required
              defaultValue={userProfile.lastname}
            />
            <TextField
              name="surname"
              label="Отчество"
              variant="outlined"
              fullWidth
              required
              defaultValue={userProfile.surname}
            />
            <TextField
              name="email"
              label="Электронная почта"
              variant="outlined"
              fullWidth
              required
              defaultValue={userProfile.user.username}
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
