import React from 'react';
import CourseEditor from '../components/CourseEditor/CourseEditor';
import UserManagement from '../components/UserManagement';

const Admin: React.FC = () => (
  <div>
    <h1>Admin Panel</h1>
    <CourseEditor />
    <UserManagement />
  </div>
);

export default Admin;
