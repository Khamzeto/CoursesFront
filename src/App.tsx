import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Container,
  Box,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person as UserIcon,
  Edit as EditIcon,
  Book as ReadIcon,
  Menu as MenuIcon,
  AccountCircle as ProfileIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

import Login from './pages/Login';
import Register from './pages/Register';
import CourseEditor from './components/CourseEditor/CourseEditor';
import UserProgress from './components/UserProgress';
import UserManagement from './components/UserManagement';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Courses from './pages/Courses';
import CourseModulesEditor from './components/CourseModulesEditor/CourseModulesEditor';

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        <ListItem button component={Link} to="/profile" onClick={toggleDrawer}>
          <ListItemIcon>
            <ProfileIcon />
          </ListItemIcon>
          <ListItemText primary="Профиль" />
        </ListItem>
        <ListItem button component={Link} to="/" onClick={toggleDrawer}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Панель управления" />
        </ListItem>
        <ListItem button component={Link} to="/users" onClick={toggleDrawer}>
          <ListItemIcon>
            <UserIcon />
          </ListItemIcon>
          <ListItemText primary="Управление пользователями" />
        </ListItem>
        <ListItem button component={Link} to="/course-editor" onClick={toggleDrawer}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Редактор курсов" />
        </ListItem>
        <ListItem button component={Link} to="/user-progress" onClick={toggleDrawer}>
          <ListItemIcon>
            <ReadIcon />
          </ListItemIcon>
          <ListItemText primary="Прогресс пользователей" />
        </ListItem>

        <ListItem button component={Link} to="/settings" onClick={toggleDrawer}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Настройки" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: theme => theme.zIndex.drawer + 1, background: '#1f1f1f' }}
        >
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={toggleDrawer}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" noWrap component="div">
              Платформа курсов по беспилотным системам
            </Typography>
          </Toolbar>
        </AppBar>
        {isMobile ? (
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer}
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: 250,
                background: '#141414',
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              width: 250,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: 250,
                boxSizing: 'border-box',
                background: '#141414',
              },
            }}
          >
            <Toolbar />
            {drawer}
          </Drawer>
        )}
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, background: '#1f1f1f', minHeight: '100vh' }}
        >
          <Toolbar />
          <Container>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/course-editor" element={<Courses />} />
              <Route path="/create-course" element={<CourseEditor />} />
              <Route path="/user-progress" element={<UserProgress />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/edit-course/:courseId" element={<CourseModulesEditor />} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
