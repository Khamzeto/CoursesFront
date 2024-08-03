import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Container,
  Grid,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  LinearProgress,
} from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import MenuIcon from '@mui/icons-material/Menu';
import ReactMarkdown from 'react-markdown';

const drawerWidth = 240;

const modules = [
  {
    title: '1. Введение в веб-разработку',
    submodules: ['1.1 Основные понятия сети', '1.2 Структура HTML-документа'],
    content: [
      '# Основные понятия сети\n\nЭто контент для Основные понятия сети.',
      '# Структура HTML-документа\n\nЭто контент для Структура HTML-документа.',
    ],
  },
  {
    title: '2. Основы HTML',
    submodules: [
      '2.1 Ссылки',
      '2.2 Разметка текста',
      '2.3 Графика и изображения',
      '2.4 Разметка таблиц',
      '2.5 Формы',
    ],
    content: [
      '# Ссылки\n\nЭто контент для Ссылки.',
      '# Разметка текста\n\nЭто контент для Разметка текста.',
      '# Графика и изображения\n\nЭто контент для Графика и изображения.',
      '# Разметка таблиц\n\nЭто контент для Разметка таблиц.',
      '# Формы\n\nЭто контент для Формы.',
    ],
  },
  // Добавьте другие модули и подмодули здесь
];

const Course = () => {
  const [selectedContent, setSelectedContent] = useState('');

  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [selectedSubmodule, setSelectedSubmodule] = useState<number | null>(null);
  const [completedSubmodules, setCompletedSubmodules] = useState<Set<string>>(new Set());
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSubmoduleClick = (
    moduleIndex: number,
    submoduleIndex: number,
    content: string
  ) => {
    setSelectedModule(moduleIndex);
    setSelectedSubmodule(submoduleIndex);
    setSelectedContent(content);
  };

  const handleNextStep = () => {
    if (selectedModule !== null && selectedSubmodule !== null) {
      const module = modules[selectedModule];
      const submoduleKey = `${selectedModule}-${selectedSubmodule}`;
      setCompletedSubmodules(prev => new Set(prev).add(submoduleKey));

      if (selectedSubmodule < module.submodules.length - 1) {
        handleSubmoduleClick(
          selectedModule,
          selectedSubmodule + 1,
          module.content[selectedSubmodule + 1]
        );
      } else if (selectedModule < modules.length - 1) {
        handleSubmoduleClick(
          selectedModule + 1,
          0,
          modules[selectedModule + 1].content[0]
        );
      }
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getProgress = () => {
    const totalSubmodules = modules.reduce(
      (acc, module) => acc + module.submodules.length,
      0
    );
    const completedCount = completedSubmodules.size;
    return (completedCount / totalSubmodules) * 100;
  };

  const drawer = (
    <Box sx={{ overflow: 'auto' }}>
      <Typography variant="h6" sx={{ padding: 2, fontWeight: 'bold', marginTop: 10 }}>
        Прогресс по курсу: {completedSubmodules.size}/
        {modules.reduce((acc, module) => acc + module.submodules.length, 0)}
      </Typography>
      <LinearProgress variant="determinate" value={getProgress()} sx={{ margin: 2 }} />
      <List>
        {modules.map((module, moduleIndex) => (
          <React.Fragment key={moduleIndex}>
            <ListItem>
              <ListItemText
                primary={module.title}
                primaryTypographyProps={{ fontWeight: 'bold' }}
              />
            </ListItem>
            {module.submodules.map((submodule, submoduleIndex) => {
              const submoduleKey = `${moduleIndex}-${submoduleIndex}`;
              return (
                <ListItem
                  button
                  key={submoduleIndex}
                  selected={
                    selectedModule === moduleIndex && selectedSubmodule === submoduleIndex
                  }
                  onClick={() =>
                    handleSubmoduleClick(
                      moduleIndex,
                      submoduleIndex,
                      module.content[submoduleIndex]
                    )
                  }
                  sx={{ pl: 4 }}
                >
                  <ListItemText
                    primary={submodule}
                    primaryTypographyProps={{
                      style: completedSubmodules.has(submoduleKey)
                        ? { textDecoration: 'line-through' }
                        : {},
                    }}
                  />
                  {completedSubmodules.has(submoduleKey) && <DoneAllIcon />}
                </ListItem>
              );
            })}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Курс по веб-разработке
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        open
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          [`& .MuiDrawer-paper`]: { width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Container>
          <ReactMarkdown>{selectedContent}</ReactMarkdown>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleNextStep}
            disabled={selectedModule === null || selectedSubmodule === null}
          >
            Следующий шаг
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Course;
