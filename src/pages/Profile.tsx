import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from '@mui/material';
import Cropper, { Area } from 'react-easy-crop';
import { getCroppedImg } from '../utils/cropImage';
import $api from '../api/axiosInstance';

interface UserProfile {
  id: number;
  username: string;
  role: string;
  avatar: string | null;
  firstname: string | null;
  lastname: string | null;
  surname: string | null;
  createdAt: string;
  updatedAt: string;
  isEnabled: boolean;
  isAccountNonExpired: boolean;
  isAccountNonLocked: boolean;
  isCredentialsNonExpired: boolean;
}

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);

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

  const handleUpdateProfile = async (updatedProfile: any) => {
    setLoading(true);

    try {
      const response = await $api.put('/api/v1/user', updatedProfile);

      const updatedUserProfile: UserProfile = {
        ...userProfile,
        firstname: updatedProfile.firstname,
        lastname: updatedProfile.lastname,
        surname: updatedProfile.surname,
        avatar: updatedProfile.avatar,
      };

      localStorage.setItem('user', JSON.stringify(updatedUserProfile));
      setUserProfile(updatedUserProfile);
      setProfileUpdateSuccess(true);
      console.log('Profile updated');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setProfileUpdateSuccess(false), 3000);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const updatedProfile = {
      firstname: formData.get('firstname')?.toString() || '',
      lastname: formData.get('lastname')?.toString() || '',
      surname: formData.get('surname')?.toString() || '',
      avatar: croppedImage || userProfile.avatar,
    };

    await handleUpdateProfile(updatedProfile);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatar(file);
      setIsCropping(true);
    }
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        URL.createObjectURL(avatar!),
        croppedAreaPixels!
      );
      setCroppedImage(croppedImage);
      setIsCropping(false);

      const updatedProfile = {
        firstname: userProfile.firstname,
        lastname: userProfile.lastname,
        surname: userProfile.surname,
        avatar: croppedImage,
      };

      await handleUpdateProfile(updatedProfile);
    } catch (e) {
      console.error(e);
    }
  };

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
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
            src={
              userProfile.avatar ? `${userProfile.avatar}` : '/static/images/avatar/1.jpg'
            }
            sx={{ width: 100, height: 100, marginTop: 4, marginBottom: 2 }}
          />
          <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
            Выберите файл
            <input type="file" accept="image/*" onChange={handleAvatarChange} hidden />
          </Button>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Box
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            onClick={handleFormSubmit}
          >
            <TextField
              name="firstname"
              label="Имя"
              variant="outlined"
              fullWidth
              required
              defaultValue={userProfile.firstname || ''}
            />
            <TextField
              name="lastname"
              label="Фамилия"
              variant="outlined"
              fullWidth
              required
              defaultValue={userProfile.lastname || ''}
            />
            <TextField
              name="surname"
              label="Отчество"
              variant="outlined"
              fullWidth
              required
              defaultValue={userProfile.surname || ''}
            />
            <TextField
              name="email"
              label="Электронная почта"
              variant="outlined"
              fullWidth
              required
              defaultValue={userProfile.username}
              InputProps={{
                readOnly: true,
              }}
            />

            <Button variant="contained" type="submit" disabled={loading}>
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Обновить профиль'
              )}
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Dialog
        open={isCropping}
        onClose={() => setIsCropping(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Редактировать аватар</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: 400,
              backgroundColor: '#333',
            }}
          >
            <Cropper
              image={avatar ? URL.createObjectURL(avatar) : undefined}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              style={{
                cropAreaStyle: {
                  borderRadius: '50%',
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCropping(false)} color="primary">
            Отмена
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#1DA57A' }}
            onClick={showCroppedImage}
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Profile;
