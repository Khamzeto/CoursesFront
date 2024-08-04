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

const initialProgressData: Progress[] = [
  { key: '1', username: 'khamzeto', course: 'БАС для чайников', progress: 50 },
  { key: '2', username: 'rosul', course: 'БАС для чайников', progress: 75 },
  { key: '3', username: 'rozomcool', course: 'БАС для чайников', progress: 20 },
];

const UserProgress: React.FC = () => {
  const [progressData, setProgressData] = useState<Progress[]>(initialProgressData);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="progress table">
        <TableHead>
          <TableRow>
            <TableCell>Имя пользователя</TableCell>
            <TableCell>Курс</TableCell>
            <TableCell>Прогресс</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {progressData.length > 0 ? (
            progressData.map(row => (
              <TableRow key={row.key}>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.course}</TableCell>
                <TableCell>{row.progress}%</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
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
