import React from 'react';
import { Box, Paper, Typography, Avatar, useTheme, Tooltip } from '@mui/material';
import { format } from 'date-fns';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DatePlanCard from './DatePlanCard';

function ChatBubble({ message, sender, isCurrentUser }) {
  const theme = useTheme();

  // Render different message types
  const renderMessageContent = () => {
    if (message.type === 'datePlan') {
      return (
        <DatePlanCard 
          datePlan={message.datePlan}
          isProposal={!isCurrentUser}
          onAccept={() => message.onAccept && message.onAccept(message.id)}
          onDecline={() => message.onDecline && message.onDecline(message.id)}
        />
      );
    } else if (message.type === 'location') {
      return (
        <Box 
          sx={{ 
            backgroundImage: `url(${message.location.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: 120,
            width: '100%',
            borderRadius: 1,
            mb: 1,
            position: 'relative'
          }}
        >
          <Box 
            sx={{ 
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: 'rgba(0,0,0,0.6)',
              color: 'white',
              p: 1
            }}
          >
            <Typography variant="subtitle2">{message.location.name}</Typography>
            <Typography variant="caption">{message.location.address}</Typography>
          </Box>
        </Box>
      );
    }
    
    // Default text message
    return (
      <Typography variant="body1">
        {message.text}
      </Typography>
    );
  };

  // Render message status indicators (for current user's messages)
  const renderMessageStatus = () => {
    if (!isCurrentUser) return null;
    
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 0.5 }}>
        {message.status === 'sent' && (
          <Tooltip title="Sent">
            <DoneIcon fontSize="small" sx={{ color: theme.palette.text.secondary, fontSize: 14 }} />
          </Tooltip>
        )}
        {message.status === 'delivered' && (
          <Tooltip title="Delivered">
            <DoneAllIcon fontSize="small" sx={{ color: theme.palette.text.secondary, fontSize: 14 }} />
          </Tooltip>
        )}
        {message.status === 'read' && (
          <Tooltip title="Read">
            <DoneAllIcon fontSize="small" sx={{ color: theme.palette.primary.main, fontSize: 14 }} />
          </Tooltip>
        )}
      </Box>
    );
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
        mb: 2,
        maxWidth: '80%',
        alignSelf: isCurrentUser ? 'flex-end' : 'flex-start'
      }}
    >
      {!isCurrentUser && (
        <Avatar 
          src={sender.profilePicture} 
          alt={sender.name}
          sx={{ mr: 1, width: 36, height: 36, alignSelf: 'flex-end' }}
        />
      )}
      <Box sx={{ maxWidth: message.type ? '300px' : '70%' }}>
        <Paper 
          elevation={0}
          sx={{ 
            p: message.type ? 0 : 2, 
            backgroundColor: isCurrentUser 
              ? theme.palette.primary.main 
              : theme.palette.grey[100],
            color: isCurrentUser && !message.type ? 'white' : 'inherit',
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          {renderMessageContent()}
        </Paper>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ 
              display: 'block', 
              textAlign: isCurrentUser ? 'right' : 'left',
            }}
          >
            {format(new Date(message.timestamp), 'h:mm a')}
          </Typography>
          {renderMessageStatus()}
        </Box>
      </Box>
      {isCurrentUser && (
        <Avatar 
          src={sender.profilePicture} 
          alt="You"
          sx={{ ml: 1, width: 36, height: 36, alignSelf: 'flex-end' }}
        />
      )}
    </Box>
  );
}

export default ChatBubble;
