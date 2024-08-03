import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
  Navigate,
  useNavigate,
} from 'react-router-dom';
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
  Button,
  ThemeProvider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person as UserIcon,
  Edit as EditIcon,
  Book as ReadIcon,
  Menu as MenuIcon,
  AccountCircle as ProfileIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
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
import lightTheme from './utils/theme';

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
  const navigate = useNavigate();
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        <ListItem button component={Link} to="/" onClick={toggleDrawer}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Панель управления" />
        </ListItem>
        <ListItem button component={Link} to="/profile" onClick={toggleDrawer}>
          <ListItemIcon>
            <ProfileIcon />
          </ListItemIcon>
          <ListItemText primary="Профиль" />
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
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Выйти" />
        </ListItem>
      </List>
    </Box>
  );

  const hideAppBarAndDrawer =
    location.pathname === '/login' || location.pathname === '/register';

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {!hideAppBarAndDrawer && (
        <>
          <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
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
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
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
                  background: '#ffffff',
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
                  background: '#ffffff',
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
        sx={{ flexGrow: 1, p: 3, background: '#EDEDED', minHeight: '100vh' }} // Серый фон в стиле ВКонтакте
      >
        <Toolbar />
        <Container>
          <Routes>
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
