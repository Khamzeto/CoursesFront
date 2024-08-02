import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  Typography,
  Paper,
  Input,
} from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import styles from './CourseModulesEditor.module.css';

const CourseModulesEditor: React.FC = () => {
  const [modules, setModules] = useState<Array<{ type: string; content: string }>>([]);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Здесь можно загрузить данные курса, включая модули, изображение, заголовок и описание
    // Пример:
    // setTitle('Название курса');
    // setDescription('Описание курса');
    // setImage('ссылка_на_изображение');
    // setModules([{ type: 'lecture', content: 'Содержимое лекции' }]);
  }, []);

  const addModule = () => {
    setModules([...modules, { type: '', content: '' }]);
  };

  const handleModuleChange = (index: number, key: 'type' | 'content', value: string) => {
    const newModules = [...modules];
    newModules[index] = {
      ...newModules[index],
      [key]: value,
    };
    setModules(newModules);
  };

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

  const onFinish = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const courseData = {
      title,
      description,
      image,
      modules,
    };
    console.log('Course data:', courseData);
    // Сохранить данные курса или выполнить другие действия
  };

  return (
    <Paper sx={{ padding: 3, backgroundColor: '#141414' }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
        Редактирование курса
      </Typography>
      <Box component="form" onSubmit={onFinish}>
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
        </Grid>
        {modules.map((module, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Select
                  value={module.type}
                  onChange={e => handleModuleChange(index, 'type', e.target.value)}
                  displayEmpty
                  fullWidth
                  sx={{ color: '#ffffff' }}
                >
                  <MenuItem value="" disabled>
                    Выберите тип модуля
                  </MenuItem>
                  <MenuItem value="lecture">Лекция</MenuItem>
                  <MenuItem value="practice">Практика</MenuItem>
                  <MenuItem value="test">Тест</MenuItem>
                  <MenuItem value="simulation">Симуляция</MenuItem>
                </Select>
              </Grid>
              {module.type === 'lecture' && (
                <Grid item xs={12} sx={{ marginTop: 2 }}>
                  <MDEditor
                    value={module.content}
                    onChange={value => handleModuleChange(index, 'content', value || '')}
                    className={styles.markdownEditor}
                    height={400}
                    previewOptions={{
                      className: styles.markdownPreview,
                    }}
                  />
                </Grid>
              )}
              {module.type !== 'lecture' && (
                <Grid item xs={12} sx={{ marginTop: 2 }}>
                  <TextField
                    value={module.content}
                    onChange={e => handleModuleChange(index, 'content', e.target.value)}
                    placeholder="Содержание модуля"
                    variant="outlined"
                    fullWidth
                    sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        ))}
        <Button
          variant="contained"
          onClick={addModule}
          fullWidth
          sx={{ marginBottom: 2, backgroundColor: '#1DA57A' }}
        >
          Добавить модуль
        </Button>
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ backgroundColor: '#1DA57A' }}
        >
          Сохранить курс
        </Button>
      </Box>
    </Paper>
  );
};

export default CourseModulesEditor;
