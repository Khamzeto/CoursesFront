import React, { useState, useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
} from '@mui/material';
import { Inbox as InboxIcon } from '@mui/icons-material';
import axios from 'axios';

interface Progress {
  key: string;
  username: string;
  course: string;
  progress: number;
}

const UserProgress: React.FC = () => {
  const [progressData, setProgressData] = useState<Progress[]>([]);

  useEffect(() => {
    axios.get('/api/progress').then(response => {
      setProgressData(response.data);
    });
  }, []);

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: '#141414' }}>
      <Table
        sx={{ minWidth: 650, backgroundColor: '#141414' }}
        aria-label="progress table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#ffffff' }}>Имя пользователя</TableCell>
            <TableCell sx={{ color: '#ffffff' }}>Курс</TableCell>
            <TableCell sx={{ color: '#ffffff' }}>Прогресс</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {progressData.length > 0 ? (
            progressData.map(row => (
              <TableRow key={row.key}>
                <TableCell sx={{ color: '#ffffff' }}>{row.username}</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>{row.course}</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>{row.progress}%</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center" sx={{ color: '#ffffff' }}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <InboxIcon sx={{ mr: 1 }} />
                  Нет данных
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserProgress;
