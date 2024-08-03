import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material';
import axios from 'axios';
import $api, { API_URL } from '../../api/axiosInstance'; // Убедитесь, что путь к файлу верен

const CourseEditor: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('preview', image || '');

    try {
      const response = await $api.post('/api/v1/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Course saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Создание курса
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <input accept="image/*" type="file" onChange={handleImageChange} />
          </Grid>

          <Grid item xs={12}>
            {image && (
              <Box
                component="img"
                src={URL.createObjectURL(image)}
                alt="Course"
                sx={{
                  width: '100%',
                  maxHeight: 200,
                  objectFit: 'cover',
                  marginBottom: 2,
                }}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Название курса"
              variant="outlined"
              fullWidth
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Описание курса"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ backgroundColor: '#1DA57A' }}
            >
              Сохранить курс
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default CourseEditor;
