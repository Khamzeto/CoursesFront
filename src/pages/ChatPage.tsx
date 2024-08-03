// pages/ChatPage.tsx
import React from 'react';
import { Container, Box } from '@mui/material';
import ChatUI from '../components/Chat/Chat';

const ChatPage: React.FC = () => {
  return (
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 1200, height: '90%' }}>
        <ChatUI />
      </Box>
    </Container>
  );
};

export default ChatPage;
