import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Box } from '@mui/material';

const courses = [
  {
    title: 'Основы БАС',
    description: 'Курс о базовых принципах и технологиях беспилотных авиационных систем.',
    image: 'https://via.placeholder.com/150/0000FF/808080?text=Course+1',
  },
  {
    title: 'Продвинутые технологии БАС',
    description: 'Углубленный курс по современным технологиям в области БАС.',
    image: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Course+2',
  },
  {
    title: 'Программирование БАС',
    description:
      'Курс по программированию и управлению беспилотными авиационными системами.',
    image: 'https://via.placeholder.com/150/00FF00/000000?text=Course+3',
  },
  // Добавьте больше курсов здесь
];

const CourseList: React.FC = () => (
  <Box sx={{ flexGrow: 1, padding: 3 }}>
    <Grid container spacing={3}>
      {courses.map((course, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
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
                sx={{ color: 'text.primary' }} // Убедитесь, что цвет текста основной
              >
                {course.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {course.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default CourseList;
