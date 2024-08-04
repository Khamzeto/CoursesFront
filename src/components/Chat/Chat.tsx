import React, { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  LinearProgress,
  Checkbox,
  FormControlLabel,
  Paper,
} from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import MenuIcon from '@mui/icons-material/Menu';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import $api from '../../api/axiosInstance';
import remarkGfm from 'remark-gfm';

interface Variant {
  variant: string;
  isAnswer: boolean;
}

interface Test {
  question: string;
  variants: Variant[];
}

interface Lecture {
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface Lesson {
  title: string;
  lectures: Lecture[];
  tests: Test[];
  createdAt: string;
  updatedAt: string;
}

interface Chapter {
  title: string;
  lessons: Lesson[];
}

interface CourseData {
  title: string;
  description: string;
  ownerId: number;
  preview: string | null;
  chapters: Chapter[];
  complexity: string;
  createdAt: string;
  updatedAt: string;
}

const drawerWidth = 240;

const Course = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseData | null>(null);
  const [selectedContent, setSelectedContent] = useState('');
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Set<number>>(new Set());
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [testResults, setTestResults] = useState<
    { correct: boolean; selected: boolean }[] | null
  >(null);
  const [finalResults, setFinalResults] = useState<any[]>([]);
  const [showFinalResults, setShowFinalResults] = useState(false);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await $api.get(`/api/v1/course/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourse();
  }, [id]);

  const handleLessonClick = (
    chapterIndex: number,
    lessonIndex: number,
    content: string,
    test: Test | null
  ) => {
    setSelectedChapter(chapterIndex);
    setSelectedLesson(lessonIndex);
    setSelectedContent(content);
    setSelectedTest(test);
    setSelectedAnswers(new Set());
    setIsTestCompleted(false);
    setTestResults(null);
  };

  const handleAnswerChange = (index: number) => {
    setSelectedAnswers(prev => {
      const newSelectedAnswers = new Set(prev);
      if (newSelectedAnswers.has(index)) {
        newSelectedAnswers.delete(index);
      } else {
        newSelectedAnswers.add(index);
      }
      return newSelectedAnswers;
    });
  };

  const handleTestSubmit = () => {
    if (selectedTest) {
      const results = selectedTest.variants.map((variant, index) => ({
        correct: variant.isAnswer,
        selected: selectedAnswers.has(index),
      }));
      setTestResults(results);
      setIsTestCompleted(true);
    }
  };

  const handleNextStep = () => {
    if (selectedChapter !== null && selectedLesson !== null && course) {
      const chapter = course.chapters[selectedChapter];
      const lessonKey = `${selectedChapter}-${selectedLesson}`;
      setCompletedLessons(prev => new Set(prev).add(lessonKey));

      setFinalResults(prev => [
        ...prev,
        {
          lesson: `${chapter.title} - ${chapter.lessons[selectedLesson].title}`,
          results: testResults,
        },
      ]);

      if (selectedLesson < chapter.lessons.length - 1) {
        handleLessonClick(
          selectedChapter,
          selectedLesson + 1,
          chapter.lessons[selectedLesson + 1].lectures[0]?.content || '',
          chapter.lessons[selectedLesson + 1].tests[0] || null
        );
      } else if (selectedChapter < course.chapters.length - 1) {
        handleLessonClick(
          selectedChapter + 1,
          0,
          course.chapters[selectedChapter + 1].lessons[0].lectures[0]?.content || '',
          course.chapters[selectedChapter + 1].lessons[0].tests[0] || null
        );
      } else {
        setSelectedContent('Курс завершен!');
        setSelectedTest(null);
        calculateAccuracy();
      }
    }
  };

  const calculateAccuracy = () => {
    const totalQuestions = finalResults.reduce(
      (acc, result) => acc + result.results.length,
      0
    );
    const correctAnswers = finalResults.reduce(
      (acc, result) =>
        acc + result.results.filter((res: any) => res.correct && res.selected).length,
      0
    );
    setAccuracy((correctAnswers / totalQuestions) * 100);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getProgress = () => {
    const totalLessons = course
      ? course.chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0)
      : 0;
    const completedCount = completedLessons.size;
    return (completedCount / totalLessons) * 100;
  };

  const drawer = (
    <Box sx={{ overflow: 'auto' }}>
      <Typography variant="h6" sx={{ padding: 2, fontWeight: 'bold', marginTop: 10 }}>
        Прогресс по курсу: {completedLessons.size}/
        {course
          ? course.chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0)
          : 0}
      </Typography>
      <LinearProgress variant="determinate" value={getProgress()} sx={{ margin: 2 }} />
      <List>
        {course?.chapters.map((chapter, chapterIndex) => (
          <React.Fragment key={chapterIndex}>
            <ListItem>
              <ListItemText
                primary={chapter.title}
                primaryTypographyProps={{ fontWeight: 'bold' }}
              />
            </ListItem>
            {chapter.lessons.map((lesson, lessonIndex) => {
              const lessonKey = `${chapterIndex}-${lessonIndex}`;
              return (
                <ListItem
                  button
                  key={lessonIndex}
                  selected={
                    selectedChapter === chapterIndex && selectedLesson === lessonIndex
                  }
                  onClick={() =>
                    handleLessonClick(
                      chapterIndex,
                      lessonIndex,
                      lesson.lectures[0]?.content || '',
                      lesson.tests[0] || null
                    )
                  }
                  sx={{ pl: 4 }}
                >
                  <ListItemText
                    primary={lesson.title}
                    primaryTypographyProps={{
                      style: completedLessons.has(lessonKey)
                        ? { textDecoration: 'line-through' }
                        : {},
                    }}
                  />
                  {completedLessons.has(lessonKey) && <DoneAllIcon />}
                </ListItem>
              );
            })}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  const renderers = {
    h1: ({ children }: any) => (
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        sx={{ fontSize: '2.5rem !important' }}
      >
        {children}
      </Typography>
    ),
    h2: ({ children }: any) => (
      <Typography
        variant="h2"
        component="h2"
        gutterBottom
        sx={{ fontSize: '2.0rem !important' }}
      >
        {children}
      </Typography>
    ),
    h3: ({ children }: any) => (
      <Typography
        variant="h3"
        component="h3"
        gutterBottom
        sx={{ fontSize: '1.75rem !important' }}
      >
        {children}
      </Typography>
    ),
    h4: ({ children }: any) => (
      <Typography
        variant="h4"
        component="h4"
        gutterBottom
        sx={{ fontSize: '1.5rem !important' }}
      >
        {children}
      </Typography>
    ),
    h5: ({ children }: any) => (
      <Typography
        variant="h5"
        component="h5"
        gutterBottom
        sx={{ fontSize: '1.25rem !important' }}
      >
        {children}
      </Typography>
    ),
    h6: ({ children }: any) => (
      <Typography
        variant="h6"
        component="h6"
        gutterBottom
        sx={{ fontSize: '1.0rem !important' }}
      >
        {children}
      </Typography>
    ),
    p: ({ children }: any) => (
      <Typography
        variant="body1"
        component="p"
        gutterBottom
        sx={{ fontSize: '1.0rem !important' }}
      >
        {children}
      </Typography>
    ),
    img: ({ src, alt }: { src?: string; alt?: string }) => (
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{ maxWidth: '100%', height: 'auto' }}
      />
    ),
  };

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
          <ReactMarkdown components={renderers} remarkPlugins={[remarkGfm]}>
            {selectedContent}
          </ReactMarkdown>
          {selectedTest && (
            <Paper sx={{ padding: 3, marginTop: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedTest.question}
              </Typography>
              {selectedTest.variants.map((variant, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={selectedAnswers.has(index)}
                      onChange={() => handleAnswerChange(index)}
                    />
                  }
                  label={variant.variant}
                />
              ))}
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleTestSubmit}
                disabled={selectedAnswers.size === 0}
              >
                Проверить ответ
              </Button>
              {isTestCompleted && testResults && (
                <Box sx={{ mt: 2 }}>
                  {testResults.map((result, index) => (
                    <Typography
                      key={index}
                      sx={{
                        color: result.correct ? 'green' : 'red',
                        textDecoration:
                          result.selected && !result.correct ? 'line-through' : 'none',
                      }}
                    >
                      {selectedTest.variants[index].variant} -{' '}
                      {result.correct ? 'Правильно' : 'Неправильно'}
                    </Typography>
                  ))}
                  <Button variant="contained" sx={{ mt: 2 }} onClick={handleNextStep}>
                    Следующий шаг
                  </Button>
                </Box>
              )}
            </Paper>
          )}
          {!selectedTest && selectedContent !== 'Курс завершен!' && (
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleNextStep}
              disabled={
                selectedChapter === null || selectedLesson === null || !isTestCompleted
              }
            >
              Следующий шаг
            </Button>
          )}
          {selectedContent === 'Курс завершен!' && accuracy !== null && (
            <Paper sx={{ padding: 3, marginTop: 2 }}>
              <Typography variant="h6" gutterBottom>
                Курс завершен!
              </Typography>
              <Typography variant="h6" gutterBottom>
                Процент правильных ответов: {accuracy.toFixed(2)}%
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => setShowFinalResults(true)}
              >
                Посмотреть результаты
              </Button>
            </Paper>
          )}
          {showFinalResults && (
            <Paper sx={{ padding: 3, marginTop: 2 }}>
              <Typography variant="h6" gutterBottom>
                Результаты тестов
              </Typography>
              {finalResults.map((result, index) => (
                <Box key={index} sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {result.lesson}
                  </Typography>
                  {result.results.map((res: any, idx: number) => (
                    <Typography
                      key={idx}
                      sx={{
                        color: res.correct ? 'green' : 'red',
                        textDecoration:
                          res.selected && !res.correct ? 'line-through' : 'none',
                      }}
                    >
                      {selectedTest?.variants[idx].variant} -{' '}
                      {res.correct ? 'Правильно' : 'Неправильно'}
                    </Typography>
                  ))}
                </Box>
              ))}
            </Paper>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Course;
