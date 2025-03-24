import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Avatar, 
  TextField, 
  IconButton, 
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Badge,
  Button,
  Tab,
  Tabs,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  FormHelperText
} from '@mui/material';
import { 
  Send as SendIcon, 
  AttachFile as AttachFileIcon,
  EmojiEmotions as EmojiIcon,
  Feedback as FeedbackIcon,
  LocationOn as LocationIcon,
  Event as EventIcon,
  MoreVert as MoreVertIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { mockProfiles } from '../data/mockData';
import ChatList from '../components/ChatList';
import ChatBubble from '../components/ChatBubble';
import DateFeedbackDialog from '../components/DateFeedbackDialog';
import LocationSuggestions from '../components/LocationSuggestions';
import ScheduledDates from '../components/ScheduledDates';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';

// Mock chat data
const mockChats = [
  {
    id: 1,
    userId: 2, // Jane Smith
    lastMessage: "That sounds perfect! I'd love to try that coffee shop.",
    timestamp: new Date('2025-03-24T10:30:00'),
    unread: 2,
    dateIdea: {
      id: 3,
      title: "Coffee Shop Hopping"
    }
  },
  {
    id: 2,
    userId: 3, // Michael Johnson
    lastMessage: "I'm free this Saturday for the hiking trip.",
    timestamp: new Date('2025-03-23T18:45:00'),
    unread: 0,
    dateIdea: {
      id: 1,
      title: "Sunset Hike"
    }
  },
  {
    id: 3,
    userId: 4, // Emily Davis
    lastMessage: "The art gallery exhibition starts at 7pm.",
    timestamp: new Date('2025-03-22T14:20:00'),
    unread: 0,
    dateIdea: {
      id: 2,
      title: "Art Gallery Tour"
    }
  }
];

// Mock messages for a specific chat
const mockMessages = [
  {
    id: 1,
    senderId: 1, // Current user
    receiverId: 2, // Jane Smith
    text: "Hey Jane! I saw we matched on the Coffee Shop Hopping date idea. Would you like to try that new place downtown?",
    timestamp: new Date('2025-03-23T09:15:00'),
    status: 'read'
  },
  {
    id: 2,
    senderId: 2, // Jane Smith
    receiverId: 1, // Current user
    text: "Hi! Yes, I've been wanting to check out that place. I heard they have amazing pastries too!",
    timestamp: new Date('2025-03-23T09:20:00')
  },
  {
    id: 3,
    senderId: 1, // Current user
    receiverId: 2, // Jane Smith
    text: "Great! How about this Saturday around 11am?",
    timestamp: new Date('2025-03-23T09:25:00'),
    status: 'read'
  },
  {
    id: 4,
    senderId: 2, // Jane Smith
    receiverId: 1, // Current user
    text: "That sounds perfect! I'd love to try that coffee shop.",
    timestamp: new Date('2025-03-24T10:30:00')
  },
  {
    id: 5,
    senderId: 1, // Current user
    receiverId: 2, // Jane Smith
    type: 'location',
    location: {
      id: 2,
      name: "The Coffee Bean",
      address: "123 Main St, New York, NY 10001",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    timestamp: new Date('2025-03-24T10:35:00'),
    status: 'delivered'
  },
  {
    id: 6,
    senderId: 1, // Current user
    receiverId: 2, // Jane Smith
    type: 'datePlan',
    datePlan: {
      dateIdea: {
        id: 3,
        title: "Coffee Shop Hopping"
      },
      location: {
        id: 2,
        name: "The Coffee Bean",
        address: "123 Main St, New York, NY 10001",
        image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      date: "Saturday, March 29, 2025",
      time: "11:00 AM",
      notes: "Looking forward to trying their famous cappuccino!",
      status: "Pending"
    },
    timestamp: new Date('2025-03-24T10:40:00'),
    status: 'sent'
  }
];

// Mock location data
const mockLocations = [
  {
    id: 1,
    name: "Central Park",
    address: "New York, NY 10022",
    category: "Park",
    rating: 4.8,
    reviews: 2453,
    priceLevel: 1,
    image: "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 2,
    name: "The Coffee Bean",
    address: "123 Main St, New York, NY 10001",
    category: "Cafe",
    rating: 4.5,
    reviews: 876,
    priceLevel: 2,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 3,
    name: "Skyline Rooftop Bar",
    address: "456 Broadway, New York, NY 10013",
    category: "Bar",
    rating: 4.7,
    reviews: 1243,
    priceLevel: 3,
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 4,
    name: "Metropolitan Museum of Art",
    address: "1000 5th Ave, New York, NY 10028",
    category: "Museum",
    rating: 4.9,
    reviews: 3254,
    priceLevel: 2,
    image: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  }
];

function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chats, setChats] = useState(mockChats);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [datePlanDialogOpen, setDatePlanDialogOpen] = useState(false);
  const [scheduledDatesDialogOpen, setScheduledDatesDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [datePlanNotes, setDatePlanNotes] = useState('');
  const messagesEndRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Load messages when a chat is selected
    if (selectedChat) {
      setMessages(mockMessages);
      
      // Mark messages as read
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === selectedChat.id ? { ...chat, unread: 0 } : chat
        )
      );
    }
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: messages.length + 1,
      senderId: 1, // Current user
      receiverId: selectedChat.userId,
      text: newMessage,
      timestamp: new Date(),
      status: 'sent'
    };
    
    setMessages([...messages, newMsg]);
    
    // Update last message in chat list
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === selectedChat.id 
          ? { 
              ...chat, 
              lastMessage: newMessage,
              timestamp: new Date()
            } 
          : chat
      )
    );
    
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Get user profile by ID
  const getUserProfile = (userId) => {
    const profile = mockProfiles.find(profile => profile.id === userId);
    if (!profile) {
      console.warn(`Profile not found for user ID: ${userId}`);
      return {
        id: userId,
        name: "Unknown User",
        profilePicture: "https://via.placeholder.com/40",
        bio: "No information available"
      };
    }
    return profile;
  };

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

  const handleOpenFeedbackDialog = () => {
    setFeedbackDialogOpen(true);
  };

  const handleCloseFeedbackDialog = () => {
    setFeedbackDialogOpen(false);
  };

  const handleOpenMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleOpenDatePlanDialog = () => {
    setDatePlanDialogOpen(true);
    handleCloseMenu();
  };

  const handleCloseDatePlanDialog = () => {
    setDatePlanDialogOpen(false);
    setSelectedLocation(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setDatePlanNotes('');
  };

  const handleOpenScheduledDatesDialog = () => {
    setScheduledDatesDialogOpen(true);
    handleCloseMenu();
  };

  const handleCloseScheduledDatesDialog = () => {
    setScheduledDatesDialogOpen(false);
  };

  const handleSendDatePlan = () => {
    if (!selectedLocation || !selectedDate || !selectedTime) return;

    const formattedDate = format(selectedDate, 'EEEE, MMMM d, yyyy');
    const formattedTime = format(selectedTime, 'h:mm a');

    const newDatePlan = {
      id: messages.length + 1,
      senderId: 1, // Current user
      receiverId: selectedChat.userId,
      type: 'datePlan',
      datePlan: {
        dateIdea: selectedChat.dateIdea,
        location: selectedLocation,
        date: formattedDate,
        time: formattedTime,
        notes: datePlanNotes,
        status: "Pending"
      },
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages([...messages, newDatePlan]);
    
    // Update last message in chat list
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === selectedChat.id 
          ? { 
              ...chat, 
              lastMessage: "Date plan sent: " + selectedLocation.name,
              timestamp: new Date()
            } 
          : chat
      )
    );

    handleCloseDatePlanDialog();
  };

  const handleSendLocation = (location) => {
    const newLocationMsg = {
      id: messages.length + 1,
      senderId: 1, // Current user
      receiverId: selectedChat.userId,
      type: 'location',
      location: location,
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages([...messages, newLocationMsg]);
    
    // Update last message in chat list
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === selectedChat.id 
          ? { 
              ...chat, 
              lastMessage: "Location shared: " + location.name,
              timestamp: new Date()
            } 
          : chat
      )
    );
  };

  const handleAcceptDatePlan = (messageId) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === messageId 
          ? { 
              ...msg, 
              datePlan: {
                ...msg.datePlan,
                status: "Confirmed"
              }
            } 
          : msg
      )
    );
  };

  const handleDeclineDatePlan = (messageId) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === messageId 
          ? { 
              ...msg, 
              datePlan: {
                ...msg.datePlan,
                status: "Declined"
              }
            } 
          : msg
      )
    );
  };

  // Mobile view shows either chat list or messages
  const showChatList = isMobile ? !selectedChat : true;
  const showMessages = isMobile ? selectedChat : true;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold" sx={{ mb: { xs: 2, sm: 4 } }}>
        Messages
      </Typography>
      
      <Paper elevation={2} sx={{ height: 'calc(100vh - 200px)', overflow: 'hidden' }}>
        <Grid container sx={{ height: '100%' }}>
          {/* Chat List */}
          {showChatList && (
            <Grid 
              item 
              xs={isMobile ? 12 : 4} 
              md={3} 
              sx={{ 
                borderRight: `1px solid ${theme.palette.divider}`,
                height: '100%',
                overflow: 'auto'
              }}
            >
              <ChatList 
                chats={chats}
                selectedChat={selectedChat}
                onChatSelect={handleChatSelect}
                getUserProfile={getUserProfile}
              />
            </Grid>
          )}
          
          {/* Chat Messages */}
          {showMessages && (
            <Grid item xs={isMobile ? 12 : 8} md={9} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <Box 
                    sx={{ 
                      p: 2, 
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {isMobile && (
                        <IconButton 
                          edge="start" 
                          onClick={() => setSelectedChat(null)}
                          sx={{ mr: 1 }}
                        >
                          <Box sx={{ 
                            width: 24, 
                            height: 24, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                          }}>
                            ←
                          </Box>
                        </IconButton>
                      )}
                      <Avatar 
                        src={getUserProfile(selectedChat.userId).profilePicture} 
                        alt={getUserProfile(selectedChat.userId).name}
                        sx={{ mr: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {getUserProfile(selectedChat.userId).name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Date Idea: {selectedChat.dateIdea.title}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Button
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        startIcon={<FeedbackIcon />}
                        onClick={handleOpenFeedbackDialog}
                        sx={{ mr: 1 }}
                      >
                        {isMobile ? "Feedback" : "Provide Feedback"}
                      </Button>
                      
                      <IconButton onClick={handleOpenMenu}>
                        <MoreVertIcon />
                      </IconButton>
                      
                      <Menu
                        anchorEl={menuAnchorEl}
                        open={Boolean(menuAnchorEl)}
                        onClose={handleCloseMenu}
                      >
                        <MenuItem onClick={handleOpenDatePlanDialog}>
                          <CalendarIcon fontSize="small" sx={{ mr: 1 }} />
                          Create Date Plan
                        </MenuItem>
                        <MenuItem onClick={handleOpenScheduledDatesDialog}>
                          <EventIcon fontSize="small" sx={{ mr: 1 }} />
                          View Scheduled Dates
                        </MenuItem>
                      </Menu>
                    </Box>
                  </Box>
                  
                  {/* Tabs for Messages and Locations */}
                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    sx={{ 
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      minHeight: '48px'
                    }}
                    variant={isMobile ? "fullWidth" : "standard"}
                  >
                    <Tab 
                      label="Messages" 
                      sx={{ minHeight: '48px' }}
                    />
                    <Tab 
                      label="Locations" 
                      icon={<LocationIcon fontSize="small" />}
                      iconPosition="start"
                      sx={{ minHeight: '48px' }}
                    />
                  </Tabs>
                  
                  {/* Messages Tab Panel */}
                  {tabValue === 0 && (
                    <>
                      <Box 
                        sx={{ 
                          p: 2, 
                          flexGrow: 1, 
                          overflow: 'auto',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        {messages.map((message) => {
                          const isSentByMe = message.senderId === 1;
                          const sender = getUserProfile(message.senderId);
                          return (
                            <ChatBubble 
                              key={message.id}
                              message={{
                                ...message,
                                onAccept: handleAcceptDatePlan,
                                onDecline: handleDeclineDatePlan
                              }}
                              sender={sender}
                              isCurrentUser={isSentByMe}
                            />
                          );
                        })}
                        <div ref={messagesEndRef} />
                      </Box>
                      
                      {/* Message Input */}
                      <Box 
                        sx={{ 
                          p: 2, 
                          borderTop: `1px solid ${theme.palette.divider}`,
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <IconButton size="small" sx={{ mr: 1 }}>
                          <EmojiIcon />
                        </IconButton>
                        <IconButton size="small" sx={{ mr: 1 }}>
                          <AttachFileIcon />
                        </IconButton>
                        <TextField
                          fullWidth
                          placeholder="Type a message..."
                          variant="outlined"
                          size="small"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          sx={{ mr: 1 }}
                        />
                        <IconButton 
                          color="primary" 
                          onClick={handleSendMessage}
                          disabled={newMessage.trim() === ''}
                        >
                          <SendIcon />
                        </IconButton>
                      </Box>
                    </>
                  )}
                  
                  {/* Locations Tab Panel */}
                  {tabValue === 1 && (
                    <Box 
                      sx={{ 
                        flexGrow: 1, 
                        overflow: 'auto',
                        p: 2
                      }}
                    >
                      <LocationSuggestions 
                        dateIdea={selectedChat.dateIdea} 
                        onLocationSelect={(location) => handleSendLocation(location)}
                      />
                    </Box>
                  )}
                </>
              ) : (
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center',
                    height: '100%',
                    p: 3
                  }}
                >
                  <Typography variant="h6" color="text.secondary" align="center">
                    Select a conversation to start messaging
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                    When you match with someone based on a date idea, you can plan your date here
                  </Typography>
                </Box>
              )}
            </Grid>
          )}
        </Grid>
      </Paper>

      {/* Feedback Dialog */}
      {selectedChat && (
        <DateFeedbackDialog
          open={feedbackDialogOpen}
          onClose={handleCloseFeedbackDialog}
          dateIdea={selectedChat.dateIdea}
          matchProfile={getUserProfile(selectedChat.userId)}
        />
      )}

      {/* Date Plan Dialog */}
      <Dialog
        open={datePlanDialogOpen}
        onClose={handleCloseDatePlanDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">
            Create Date Plan
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Date Idea: {selectedChat?.dateIdea.title}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              With: {selectedChat ? getUserProfile(selectedChat.userId).name : ''}
            </Typography>
          </Box>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth required error={!selectedLocation}>
                  <InputLabel id="location-select-label">Location</InputLabel>
                  <Select
                    labelId="location-select-label"
                    value={selectedLocation ? selectedLocation.id : ''}
                    label="Location"
                    onChange={(e) => {
                      const location = mockLocations.find(loc => loc.id === e.target.value);
                      setSelectedLocation(location);
                    }}
                  >
                    {mockLocations.map((location) => (
                      <MenuItem key={location.id} value={location.id}>
                        {location.name} - {location.category}
                      </MenuItem>
                    ))}
                  </Select>
                  {!selectedLocation && (
                    <FormHelperText>Please select a location</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Date"
                  value={selectedDate}
                  onChange={setSelectedDate}
                  renderInput={(params) => <TextField {...params} fullWidth required error={!selectedDate} helperText={!selectedDate ? "Please select a date" : ""} />}
                  disablePast
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TimePicker
                  label="Time"
                  value={selectedTime}
                  onChange={setSelectedTime}
                  renderInput={(params) => <TextField {...params} fullWidth required error={!selectedTime} helperText={!selectedTime ? "Please select a time" : ""} />}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Notes (Optional)"
                  multiline
                  rows={3}
                  fullWidth
                  value={datePlanNotes}
                  onChange={(e) => setDatePlanNotes(e.target.value)}
                  placeholder="Add any additional details about the date..."
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDatePlanDialog}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSendDatePlan}
            disabled={!selectedLocation || !selectedDate || !selectedTime}
          >
            Send Date Plan
          </Button>
        </DialogActions>
      </Dialog>

      {/* Scheduled Dates Dialog */}
      <Dialog
        open={scheduledDatesDialogOpen}
        onClose={handleCloseScheduledDatesDialog}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
      >
        <ScheduledDates onClose={handleCloseScheduledDatesDialog} />
      </Dialog>
    </Container>
  );
}

export default ChatPage;
