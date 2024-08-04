import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  Paper,
  Container,
  Grid,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import setupSocket from '../../utils/socket'; // Adjust the import path as necessary

interface Message {
  id: number;
  text: string;
  user: 'me' | 'other';
}

const initialMessages: Message[] = [
  { id: 1, text: 'Привет!', user: 'other' },
  { id: 2, text: 'Как дела?', user: 'other' },
  { id: 3, text: 'Отлично, спасибо!', user: 'me' },
];
const generateUsername = () => {
  const adjectives = [
    'Quick',
    'Happy',
    'Bright',
    'Dark',
    'Blue',
    'Red',
    'Green',
    'Yellow',
    'Purple',
    'Fast',
  ];
  const nouns = [
    'Lion',
    'Tiger',
    'Bear',
    'Wolf',
    'Eagle',
    'Shark',
    'Panther',
    'Leopard',
    'Hawk',
    'Falcon',
  ];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${
    nouns[Math.floor(Math.random() * nouns.length)]
  }${Math.floor(Math.random() * 1000)}`;
};

const ChatUI = () => {
  const [username] = useState(generateUsername());
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState<Message[]>(initialMessages);
  const [user, setUser] = useState<'me' | 'other'>('me'); // Set a default user
  const socketRef = useRef<ReturnType<typeof setupSocket>>();

  const setupSocketConnection = useCallback(() => {
    try {
      const socket = setupSocket();
      socketRef.current = socket;

      socket.on('connect', () => {
        console.log('Connected to WebSocket');
      });

      socket.on('private_message', (data: { content: string; sender: string }) => {
        console.log('Received private message:', data);
        setMessageList(prev => [
          ...prev,
          { id: Date.now(), text: data.content, user: 'other' },
        ]);
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket');
      });

      socket.on('connect_error', (error: any) => {
        console.error('WebSocket Connection Error:', error);
      });

      socket.on('error', (error: any) => {
        console.error('WebSocket Error:', error);
      });
    } catch (error) {
      console.error('Socket setup error:', error);
    }
  }, []);

  useEffect(() => {
    setupSocketConnection();
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [setupSocketConnection]);

  const handleSendMessage = useCallback(() => {
    if (message.trim() && socketRef.current) {
      const newMessage = { recipient: username, content: message };
      console.log('Sending message:', newMessage);
      socketRef.current.emit('private_message', newMessage);
      setMessageList([...messageList, { id: Date.now(), text: message, user }]);
      setMessage('');
    }
  }, [message, messageList, user, username]);

  return (
    <Container
      sx={{
        padding: '0 !important',
        paddingLeft: '18px !important',
        maxHeight: '100vh',
        minWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        width: { xs: '98%', sm: '80%' },
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ padding: 2 }}>
        Чат
      </Typography>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          flexGrow: 1,
          maxHeight: '70vh',
          overflow: 'auto',
          width: '100%',
          marginBottom: 2,
        }}
      >
        <List>
          {messageList.map(msg => (
            <ListItem
              key={msg.id}
              sx={{
                display: 'flex',
                justifyContent: msg.user === 'me' ? 'flex-end' : 'flex-start',
                alignItems: 'center',
                marginBottom: 1,
              }}
            >
              {msg.user !== 'me' && (
                <Avatar
                  alt="User Avatar"
                  src="https://via.placeholder.com/40"
                  sx={{ marginRight: 1 }}
                />
              )}
              <Box
                sx={{
                  backgroundColor: msg.user === 'me' ? '#dcf8c6' : '#D3D3D3',
                  borderRadius: 2,
                  padding: 1,
                  maxWidth: '80%',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <ListItemText primary={msg.text} />
                {msg.user === 'me' && (
                  <DoneAllIcon
                    sx={{
                      alignSelf: 'flex-end',
                      fontSize: '16px',
                      color: '#34b7f1',
                      marginTop: 1,
                    }}
                  />
                )}
              </Box>
              {msg.user === 'me' && (
                <Avatar
                  alt="User Avatar"
                  src="https://via.placeholder.com/40"
                  sx={{ marginLeft: 1 }}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={10}>
          <TextField
            variant="outlined"
            placeholder="Введите сообщение"
            fullWidth
            value={message}
            onChange={e => setMessage(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            sx={{
              padding: { xs: 1, sm: 2 },
              '& .MuiSvgIcon-root': { fontSize: { xs: '1.5rem', sm: '2rem' } },
            }}
          >
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatUI;
