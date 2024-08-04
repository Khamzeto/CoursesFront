import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

interface Option {
  text: string;
  isCorrect: boolean;
}

interface Question {
  question: string;
  options: Option[];
}

interface TestEditorProps {
  value: Question[];
  onChange: (value: Question[]) => void;
}

const TestEditor: React.FC<TestEditorProps> = ({ value, onChange }) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      setQuestions(value);
    } else {
      setQuestions([]);
    }
  }, [value]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: [{ text: '', isCorrect: false }] },
    ]);
  };

  const handleQuestionChange = (index: number, key: 'question', value: string) => {
    const newQuestions = [...questions];
    newQuestions[index][key] = value;
    setQuestions(newQuestions);
    onChange(newQuestions);
  };

  const handleOptionChange = (
    qIndex: number,
    oIndex: number,
    key: 'text' | 'isCorrect',
    value: string | boolean
  ) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = {
      ...newQuestions[qIndex].options[oIndex],
      [key]: value,
    };
    setQuestions(newQuestions);
    onChange(newQuestions);
  };

  const addOption = (qIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push({ text: '', isCorrect: false });
    setQuestions(newQuestions);
    onChange(newQuestions);
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Редактор теста
      </Typography>
      {questions.map((question, qIndex) => (
        <Box key={qIndex} sx={{ marginBottom: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label={`Вопрос ${qIndex + 1}`}
                variant="outlined"
                fullWidth
                value={question.question}
                onChange={e => handleQuestionChange(qIndex, 'question', e.target.value)}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            {question.options.map((option, oIndex) => (
              <Grid item xs={12} key={oIndex} sx={{ marginBottom: 2 }}>
                <TextField
                  label={`Вариант ${oIndex + 1}`}
                  variant="outlined"
                  fullWidth
                  value={option.text}
                  onChange={e =>
                    handleOptionChange(qIndex, oIndex, 'text', e.target.value)
                  }
                  sx={{ marginBottom: 1 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={option.isCorrect}
                      onChange={e =>
                        handleOptionChange(qIndex, oIndex, 'isCorrect', e.target.checked)
                      }
                    />
                  }
                  label="Правильный"
                  sx={{ marginBottom: 1 }}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={() => addOption(qIndex)}
                fullWidth
                sx={{ backgroundColor: '#1DA57A', marginBottom: 2 }}
              >
                Добавить вариант
              </Button>
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button
        variant="contained"
        onClick={addQuestion}
        fullWidth
        sx={{ backgroundColor: '#1DA57A' }}
      >
        Добавить вопрос
      </Button>
    </Paper>
  );
};

export default TestEditor;
