import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api-url.com',
});

export const fetchCourses = () => api.get('/courses');
export const createCourse = (course: any) => api.post('/courses', course);
export const updateCourse = (id: number, course: any) =>
  api.put(`/courses/${id}`, course);
export const deleteCourse = (id: number) => api.delete(`/courses/${id}`);

export default api;
