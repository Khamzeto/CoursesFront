import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
  Navigate,
} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Container,
  Box,
  Typography,
  ThemeProvider,
} from '@mui/material';
import {
  DashboardOutlined,
  UserOutlined,
  EditOutlined,
  BookOutlined,
  MenuOutlined,
  ProfileOutlined,
  SettingOutlined,
  MessageOutlined,
} from '@ant-design/icons';

import Login from './pages/Login';
import Register from './pages/Register';
import CourseEditor from './components/CourseEditor/CourseEditor';
import UserProgress from './components/UserProgress';
import UserManagement from './components/UserManagement';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Courses from './pages/Courses';
import CourseModulesEditor from './components/CourseModulesEditor/CourseModulesEditor';
import ChatPage from './pages/ChatPage';

import lightTheme from './utils/theme';
import Course from './pages/Course';
import './App.css'; // Импорт глобальных стилей

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const PublicRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/" /> : children;
};

const AppContent: React.FC = () => {
  const location = useLocation();
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
          <ProfileOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
          <ListItemText primary="Профиль" />
        </ListItem>
        <ListItem button component={Link} to="/" onClick={toggleDrawer}>
          <DashboardOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
          <ListItemText primary="Панель управления" />
        </ListItem>
        <ListItem button component={Link} to="/users" onClick={toggleDrawer}>
          <UserOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
          <ListItemText primary="Управление пользователями" />
        </ListItem>
        <ListItem button component={Link} to="/course-editor" onClick={toggleDrawer}>
          <EditOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
          <ListItemText primary="Редактор курсов" />
        </ListItem>
        <ListItem button component={Link} to="/user-progress" onClick={toggleDrawer}>
          <BookOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
          <ListItemText primary="Прогресс пользователей" />
        </ListItem>
        <ListItem button component={Link} to="/settings" onClick={toggleDrawer}>
          <SettingOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
          <ListItemText primary="Настройки" />
        </ListItem>
        <ListItem button component={Link} to="/chat" onClick={toggleDrawer}>
          <MessageOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
          <ListItemText primary="Чат" />
        </ListItem>
      </List>
    </Box>
  );

  const hideAppBarAndDrawer =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/course';

  return (
    <Box sx={{ display: 'flex', padding: '0 !important' }}>
      <CssBaseline />
      {!hideAppBarAndDrawer && (
        <>
          <AppBar
            position="fixed"
            sx={{
              zIndex: theme => theme.zIndex.drawer + 1,
              background: 'linear-gradient(90deg, #6AEB60, #34A853)',
            }}
          >
            <Toolbar
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#1E1E1E',
                padding: { xs: '0 8px', sm: '0 16px' },
              }}
            >
              {isMobile && (
                <IconButton
                  color="inherit"
                  edge="start"
                  onClick={toggleDrawer}
                  sx={{ mr: 2 }}
                >
                  <MenuOutlined />
                </IconButton>
              )}
              <Box
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    fontSize: '18px !important',
                    letterSpacing: '2px !important',
                    display: 'flex !important',
                    justifyContent: 'center !important',
                    textAlign: 'center',
                  }}
                >
                  LEM
                </Typography>
              </Box>
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
                  background: '#1E1E1E',
                  color: 'white',
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
                  background: '#1E1E1E',
                  color: 'white',
                },
              }}
            >
              <Toolbar />
              {drawer}
            </Drawer>
          )}
        </>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          background: '#EDEDED',
          minHeight: '100vh',
          padding: '0 !important',
        }}
      >
        <Toolbar />
        <Container
          sx={{
            padding: '0 !important',
          }}
        >
          <Routes>
            <Route path="/course" element={<Course />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/course-editor"
              element={
                <ProtectedRoute>
                  <Courses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-course"
              element={
                <ProtectedRoute>
                  <CourseEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-progress"
              element={
                <ProtectedRoute>
                  <UserProgress />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-course/:courseId"
              element={
                <ProtectedRoute>
                  <CourseModulesEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
};

const App: React.FC = () => (
  <ThemeProvider theme={lightTheme}>
    <Router>
      <AppContent />
    </Router>
  </ThemeProvider>
);

export default App;
