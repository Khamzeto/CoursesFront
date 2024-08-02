import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { Box } from '@mui/system';
import { Inbox as InboxIcon } from '@mui/icons-material';
import axios from 'axios';

interface User {
  key: string;
  username: string;
  role: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get('/api/users').then(response => {
      setUsers(response.data);
    });
  }, []);

  const deleteUser = (key: string) => {
    setUsers(users.filter(user => user.key !== key));
    // Add delete logic
  };

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: '#141414' }}>
      <Table sx={{ minWidth: 650, backgroundColor: '#141414' }} aria-label="user table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#ffffff' }}>Имя пользователя</TableCell>
            <TableCell sx={{ color: '#ffffff' }}>Роль</TableCell>
            <TableCell sx={{ color: '#ffffff' }}>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0 ? (
            users.map(user => (
              <TableRow key={user.key}>
                <TableCell sx={{ color: '#ffffff' }}>{user.username}</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>{user.role}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteUser(user.key)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center" sx={{ color: '#ffffff' }}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <InboxIcon sx={{ mr: 1 }} />
                  No data
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
