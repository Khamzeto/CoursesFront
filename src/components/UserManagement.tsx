import React, { useState, useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Box,
} from '@mui/material';
import { Inbox as InboxIcon } from '@mui/icons-material';
import axios from 'axios';

interface User {
  key: string;
  username: string;
  role: string;
}

const initialUsers: User[] = [
  { key: '1', username: 'khamzeto', role: 'Студент' },
  { key: '2', username: 'rosul', role: 'Студент' },
  { key: '3', username: 'rozomcool', role: 'Студент' },
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const deleteUser = (key: string) => {
    setUsers(users.filter(user => user.key !== key));
    // Add delete logic
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="user table">
        <TableHead>
          <TableRow>
            <TableCell>Имя пользователя</TableCell>
            <TableCell>Роль</TableCell>
            <TableCell>Действия</TableCell>
            <TableCell>Связаться</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0 ? (
            users.map(user => (
              <TableRow key={user.key}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteUser(user.key)}
                  >
                    Удалить
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteUser(user.key)}
                  >
                    Написать
                  </Button>
                </TableCell>
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

export default UserManagement;
