import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar, 
  Badge, 
  Box, 
  Typography, 
  useTheme 
} from '@mui/material';
import { format } from 'date-fns';

function ChatList({ chats, selectedChat, onChatSelect, getUserProfile }) {
  const theme = useTheme();

  // Format timestamp
  const formatTime = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    
    if (
      messageDate.getDate() === now.getDate() &&
      messageDate.getMonth() === now.getMonth() &&
      messageDate.getFullYear() === now.getFullYear()
    ) {
      return format(messageDate, 'h:mm a'); // Today: 3:30 PM
    } else if (
      now.getTime() - messageDate.getTime() < 7 * 24 * 60 * 60 * 1000
    ) {
      return format(messageDate, 'EEEE'); // Within a week: Monday, Tuesday, etc.
    } else {
      return format(messageDate, 'MMM d'); // Older: Jan 5, Feb 10, etc.
    }
  };

  return (
    <List sx={{ p: 0 }}>
      {chats.map((chat) => {
        const profile = getUserProfile(chat.userId) || {
          name: "Unknown User",
          profilePicture: "https://via.placeholder.com/40"
        };
        
        return (
          <ListItem 
            key={chat.id}
            button
            alignItems="flex-start"
            onClick={() => onChatSelect(chat)}
            sx={{ 
              borderBottom: `1px solid ${theme.palette.divider}`,
              backgroundColor: selectedChat?.id === chat.id 
                ? theme.palette.action.selected 
                : 'inherit',
              py: 2
            }}
          >
            <ListItemAvatar>
              <Badge 
                color="primary" 
                badgeContent={chat.unread} 
                invisible={chat.unread === 0}
              >
                <Avatar src={profile.profilePicture} alt={profile.name} />
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" fontWeight={chat.unread > 0 ? 'bold' : 'normal'}>
                    {profile.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatTime(chat.timestamp)}
                  </Typography>
                </Box>
              }
              secondary={
                <>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ 
                      display: 'inline',
                      fontWeight: chat.unread > 0 ? 'bold' : 'normal'
                    }}
                  >
                    {chat.lastMessage.length > 40 
                      ? `${chat.lastMessage.substring(0, 40)}...` 
                      : chat.lastMessage}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    sx={{ mt: 0.5 }}
                  >
                    Date Idea: {chat.dateIdea.title}
                  </Typography>
                </>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
}

export default ChatList;
