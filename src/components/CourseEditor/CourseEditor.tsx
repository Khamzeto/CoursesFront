import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Grid, Input } from '@mui/material';
import styles from './CourseEditor.module.css';

const CourseEditor: React.FC = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const courseData = {
      title,
      description,
      image,
    };
    console.log('Course data:', courseData);
    // Сохранить данные курса или выполнить другие действия
  };

  return (
    <Paper sx={{ padding: 3, backgroundColor: '#141414' }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
        Создание курса
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <input
              accept="image/*"
              type="file"
              onChange={handleImageChange}
              style={{ color: '#ffffff' }}
            />
          </Grid>

          <Grid item xs={12}>
            {image && (
              <Box
                component="img"
                src={image as string}
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
              sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
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
              sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
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
