import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: 'Основы БАС',
    description: 'Курс о базовых принципах и технологиях беспилотных авиационных систем.',
    image: 'https://via.placeholder.com/150/0000FF/808080?text=Course+1',
  },
  {
    id: 2,
    title: 'Продвинутые технологии БАС',
    description: 'Углубленный курс по современным технологиям в области БАС.',
    image: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Course+2',
  },
  {
    id: 3,
    title: 'Программирование БАС',
    description:
      'Курс по программированию и управлению беспилотными авиационными системами.',
    image: 'https://via.placeholder.com/150/00FF00/000000?text=Course+3',
  },
  // Добавьте больше курсов здесь
];

const Courses: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateCourse = () => {
    navigate('/create-course');
  };

  const handleEditModules = (courseId: number) => {
    navigate(`/edit-course/${courseId}`);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Button
        variant="contained"
        onClick={handleCreateCourse}
        sx={{ marginBottom: 3, backgroundColor: '#1DA57A' }}
      >
        Создать курс
      </Button>
      <Grid container spacing={3}>
        {courses.map(course => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card sx={{ backgroundColor: '#1f1f1f', color: '#ffffff' }}>
              <CardMedia
                component="img"
                height="140"
                image={course.image}
                alt={course.title}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ color: '#ffffff' }}
                >
                  {course.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: '#cccccc' }}
                >
                  {course.description}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ marginTop: 2, backgroundColor: '#1DA57A' }}
                  onClick={() => handleEditModules(course.id)}
                >
                  Редактировать модули
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Courses;
