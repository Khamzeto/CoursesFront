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
} from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import TestEditor from '../TestEditor/TestEditor';
import $api from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const CourseModulesEditor: React.FC = () => {
  const [mainModules, setMainModules] = useState<
    Array<{ title: string; submodules: Array<{ type: string; content: any }> }>
  >([]);
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [complexity, setComplexity] = useState('');
  const [ownerId, setOwnerId] = useState<number | null>(null);

  useEffect(() => {
    // Получение ownerId из локального хранилища
    const userProfileData = localStorage.getItem('user');
    if (userProfileData) {
      const userProfile = JSON.parse(userProfileData);
      setOwnerId(userProfile.id);
    }
  }, []);

  const addMainModule = () => {
    setMainModules([...mainModules, { title: '', submodules: [] }]);
  };

  const handleMainModuleChange = (index: number, key: 'title', value: string) => {
    const newMainModules = [...mainModules];
    newMainModules[index][key] = value;
    setMainModules(newMainModules);
  };

  const addSubmodule = (mainIndex: number) => {
    const newMainModules = [...mainModules];
    newMainModules[mainIndex].submodules.push({ type: '', content: '' });
    setMainModules(newMainModules);
  };

  const handleSubmoduleChange = (
    mainIndex: number,
    subIndex: number,
    key: 'type' | 'content',
    value: any
  ) => {
    const newMainModules = [...mainModules];
    const submodule = newMainModules[mainIndex].submodules[subIndex];

    if (key === 'type' && value === 'test' && !submodule.content) {
      submodule.content = [
        {
          question: '',
          options: [{ text: '', isCorrect: false }],
        },
      ];
    }

    newMainModules[mainIndex].submodules[subIndex] = {
      ...submodule,
      [key]: value,
    };
    setMainModules(newMainModules);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const transformModulesToChapters = (modules: typeof mainModules) => {
    return modules.map(module => ({
      title: module.title,
      lessons: module.submodules.map(submodule => {
        if (submodule.type === 'lecture') {
          return {
            title: submodule.content?.split('\n')[0] || 'Untitled',
            lectures: [{ content: submodule.content }],
            tests: [],
          };
        } else if (submodule.type === 'test') {
          return {
            title: 'Untitled Test',
            lectures: [],
            tests:
              submodule.content?.map((q: any) => ({
                question: q.question,
                answerId: q.options.findIndex((o: any) => o.isCorrect),
                variants: q.options.map((o: any) => ({
                  variant: o.text,
                  isAnswer: o.isCorrect,
                })),
              })) || [],
          };
        } else {
          return {
            title: 'Untitled',
            lectures: [],
            tests: [],
          };
        }
      }),
    }));
  };

  const onFinish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const chapters = transformModulesToChapters(mainModules);
    const courseData = {
      title,
      description,
      complexity,
      ownerId,
      preview: image,
      chapters,
    };

    try {
      const response = await $api.post('/api/v1/course', courseData);
      console.log('Course created successfully:', response.data);
      navigate('/course-editor');
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Создание курса
      </Typography>
      <Box component="form" onSubmit={onFinish}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <input accept="image/*" type="file" onChange={handleImageChange} />
          </Grid>
          <Grid item xs={12}>
            {image && (
              <Box
                component="img"
                src={image}
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
            <Select
              value={complexity}
              onChange={e => setComplexity(e.target.value)}
              displayEmpty
              fullWidth
            >
              <MenuItem value="" disabled>
                Выберите сложность
              </MenuItem>
              <MenuItem value="EASY">Легкий</MenuItem>
              <MenuItem value="MEDIUM">Средний</MenuItem>
              <MenuItem value="HARD">Сложный</MenuItem>
            </Select>
          </Grid>
        </Grid>
        {mainModules.map((mainModule, mainIndex) => (
          <Box key={mainIndex} sx={{ marginBottom: 2 }}>
            <TextField
              label={`Главный модуль ${mainIndex + 1}`}
              variant="outlined"
              fullWidth
              value={mainModule.title}
              onChange={e => handleMainModuleChange(mainIndex, 'title', e.target.value)}
              sx={{ marginBottom: 2, marginTop: 2 }}
            />
            {mainModule.submodules.map((submodule, subIndex) => (
              <Box key={subIndex} sx={{ marginBottom: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Select
                      value={submodule.type}
                      onChange={e =>
                        handleSubmoduleChange(mainIndex, subIndex, 'type', e.target.value)
                      }
                      displayEmpty
                      fullWidth
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
                  {submodule.type === 'lecture' && (
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                      <Box
                        sx={{
                          '.w-md-editor': {
                            backgroundColor: '#fff',
                            color: '#000',
                          },
                          '.w-md-editor-text': {
                            backgroundColor: '#fff',
                            color: '#000',
                          },
                        }}
                      >
                        <MDEditor
                          value={submodule.content}
                          onChange={value =>
                            handleSubmoduleChange(
                              mainIndex,
                              subIndex,
                              'content',
                              value || ''
                            )
                          }
                          height={400}
                        />
                      </Box>
                    </Grid>
                  )}
                  {submodule.type === 'test' && (
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                      <TestEditor
                        value={submodule.content}
                        onChange={value =>
                          handleSubmoduleChange(mainIndex, subIndex, 'content', value)
                        }
                      />
                    </Grid>
                  )}
                  {submodule.type !== 'lecture' && submodule.type !== 'test' && (
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                      <TextField
                        value={submodule.content}
                        onChange={e =>
                          handleSubmoduleChange(
                            mainIndex,
                            subIndex,
                            'content',
                            e.target.value
                          )
                        }
                        placeholder="Содержание модуля"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                  )}
                </Grid>
              </Box>
            ))}
            <Button
              variant="contained"
              onClick={() => addSubmodule(mainIndex)}
              fullWidth
              sx={{ marginBottom: 2, backgroundColor: '#1DA57A' }}
            >
              Добавить подмодуль
            </Button>
          </Box>
        ))}
        <Button
          variant="contained"
          onClick={addMainModule}
          fullWidth
          sx={{ marginBottom: 2, marginTop: 2, backgroundColor: '#1DA57A' }}
        >
          Добавить главный модуль
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
