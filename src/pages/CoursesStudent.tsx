import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import $api from '../api/axiosInstance'; // Import your configured axios instance

const CoursesStudent: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]);
  const [completedCourses, setCompletedCourses] = useState<number[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userProfileData = localStorage.getItem('user');
        if (userProfileData) {
          const userProfile = JSON.parse(userProfileData);
          const id_user = userProfile.id;
          const response = await $api.get(`/api/v1/course`);
          if (Array.isArray(response.data)) {
            setCourses(response.data);
            console.log('Courses loaded:', response.data);
          } else {
            console.error('Unexpected response data:', response.data);
          }
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
    const storedCompletedCourses = JSON.parse(
      localStorage.getItem('completedCourses') || '[]'
    );
    setCompletedCourses(storedCompletedCourses);
  }, []);

  const handleJoinCourse = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={3}>
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map(course => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card sx={{ borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    course.preview
                      ? `${course.preview}`
                      : 'https://via.placeholder.com/150'
                  }
                  alt={course.title}
                  sx={{ borderTopLeftRadius: 14, borderTopRightRadius: 14 }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {course.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginTop: 2, marginBottom: 2 }} // Adding margin
                  >
                    {course.description}
                  </Typography>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    width="100%"
                  >
                    {completedCourses.includes(course.id) ? (
                      <Typography variant="h6" color="success.main">
                        Курс пройден
                      </Typography>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => handleJoinCourse(course.id)}
                        sx={{ marginBottom: 1 }}
                      >
                        Присоединиться
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="error">
            Нет доступных курсов
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default CoursesStudent;
