import React, { useState } from 'react';
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

const messages = [
  { id: 1, text: 'Привет!', user: 'other' },
  { id: 2, text: 'Как дела?', user: 'other' },
  { id: 3, text: 'Отлично, спасибо!', user: 'me' },
];

const ChatUI = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState(messages);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessageList([...messageList, { id: Date.now(), text: message, user: 'me' }]);
      setMessage('');
    }
  };

  return (
    <Container
      sx={{
        padding: '0 !important',
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
                <ListItemText primary={msg.text} sx={{ color: '#00000 !important' }} />
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
