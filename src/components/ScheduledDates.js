import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Button,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useMediaQuery,
  useTheme,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Feedback as FeedbackIcon,
  Close as CloseIcon,
  Check as CheckIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { format, parseISO, isAfter } from 'date-fns';
import DateFeedbackDialog from './DateFeedbackDialog';

// Mock scheduled dates data
const mockScheduledDates = [
  {
    id: 1,
    dateIdea: {
      id: 3,
      title: "Coffee Shop Hopping"
    },
    matchId: 2, // Jane Smith
    location: {
      id: 2,
      name: "The Coffee Bean",
      address: "123 Main St, New York, NY 10001",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    date: "2025-03-29",
    time: "11:00",
    notes: "Looking forward to trying their famous cappuccino!",
    status: "Confirmed"
  },
  {
    id: 2,
    dateIdea: {
      id: 1,
      title: "Sunset Hike"
    },
    matchId: 3, // Michael Johnson
    location: {
      id: 1,
      name: "Central Park",
      address: "New York, NY 10022",
      image: "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    date: "2025-04-05",
    time: "17:30",
    notes: "Meet at the south entrance. Bring water!",
    status: "Pending"
  },
  {
    id: 3,
    dateIdea: {
      id: 2,
      title: "Art Gallery Tour"
    },
    matchId: 4, // Emily Davis
    location: {
      id: 4,
      name: "Metropolitan Museum of Art",
      address: "1000 5th Ave, New York, NY 10028",
      image: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    date: "2025-04-10",
    time: "14:00",
    notes: "Special exhibition on modern art this week.",
    status: "Confirmed"
  },
  {
    id: 4,
    dateIdea: {
      id: 4,
      title: "Wine Tasting"
    },
    matchId: 5, // Alex Wilson
    location: {
      id: 3,
      name: "Skyline Rooftop Bar",
      address: "456 Broadway, New York, NY 10013",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    date: "2025-03-15",
    time: "19:00",
    notes: "They have a special wine flight tasting menu.",
    status: "Completed"
  }
];

// Mock profiles data
const mockProfiles = [
  {
    id: 1,
    name: "Current User",
    profilePicture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Jane Smith",
    profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Michael Johnson",
    profilePicture: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Emily Davis",
    profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Alex Wilson",
    profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

function ScheduledDates({ onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [scheduledDates, setScheduledDates] = useState(mockScheduledDates);
  const [selectedDate, setSelectedDate] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');

  const handleOpenDetails = (date) => {
    setSelectedDate(date);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  const handleOpenCancelDialog = () => {
    setCancelDialogOpen(true);
  };

  const handleCloseCancelDialog = () => {
    setCancelDialogOpen(false);
    setCancelReason('');
  };

  const handleOpenFeedbackDialog = () => {
    setFeedbackDialogOpen(true);
    setDetailsOpen(false);
  };

  const handleCloseFeedbackDialog = () => {
    setFeedbackDialogOpen(false);
  };

  const handleCancelDate = () => {
    setScheduledDates(prevDates => 
      prevDates.map(date => 
        date.id === selectedDate.id 
          ? { ...date, status: 'Cancelled', cancelReason } 
          : date
      )
    );
    handleCloseCancelDialog();
    handleCloseDetails();
  };

  // Get user profile by ID
  const getUserProfile = (userId) => {
    return mockProfiles.find(profile => profile.id === userId);
  };

  // Format date and time
  const formatDateTime = (dateStr, timeStr) => {
    const date = parseISO(`${dateStr}T${timeStr}`);
    return format(date, 'EEEE, MMMM d, yyyy \'at\' h:mm a');
  };

  // Filter dates based on active tab
  const filteredDates = scheduledDates.filter(date => {
    const dateObj = parseISO(`${date.date}T${date.time}`);
    const isUpcoming = isAfter(dateObj, new Date()) && 
                      (date.status === 'Confirmed' || date.status === 'Pending');
    const isPast = !isAfter(dateObj, new Date()) || 
                  date.status === 'Completed' || 
                  date.status === 'Cancelled';
    
    return activeTab === 'upcoming' ? isUpcoming : isPast;
  });

  // Get status chip color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'success';
      case 'Pending': return 'warning';
      case 'Cancelled': return 'error';
      case 'Completed': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
          Scheduled Dates
        </Typography>
        {onClose && (
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      
      <Box sx={{ mb: 3, display: 'flex', gap: 1 }}>
        <Button 
          variant={activeTab === 'upcoming' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </Button>
        <Button 
          variant={activeTab === 'past' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('past')}
        >
          Past
        </Button>
      </Box>

      {filteredDates.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            {activeTab === 'upcoming' 
              ? 'No upcoming dates scheduled' 
              : 'No past dates found'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {activeTab === 'upcoming' 
              ? 'When you plan a date with a match, it will appear here' 
              : 'Your completed and cancelled dates will appear here'}
          </Typography>
        </Box>
      ) : (
        <List sx={{ width: '100%' }}>
          {filteredDates.map((date) => {
            const matchProfile = getUserProfile(date.matchId);
            return (
              <Card 
                key={date.id} 
                sx={{ 
                  mb: 2, 
                  borderRadius: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
                onClick={() => handleOpenDetails(date)}
              >
                <CardContent sx={{ p: 0 }}>
                  <Grid container>
                    <Grid item xs={4} sm={3}>
                      <CardMedia
                        component="img"
                        height={isMobile ? 100 : 140}
                        image={date.location.image}
                        alt={date.location.name}
                        sx={{ borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
                      />
                    </Grid>
                    <Grid item xs={8} sm={9}>
                      <Box sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box>
                            <Typography variant="h6" component="div">
                              {date.dateIdea.title}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Avatar 
                                src={matchProfile.profilePicture} 
                                alt={matchProfile.name}
                                sx={{ width: 24, height: 24, mr: 1 }}
                              />
                              <Typography variant="body2" color="text.secondary">
                                with {matchProfile.name}
                              </Typography>
                            </Box>
                          </Box>
                          <Chip 
                            label={date.status} 
                            color={getStatusColor(date.status)}
                            size="small"
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <LocationIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                          <Typography variant="body2" color="text.secondary">
                            {date.location.name}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                          <Typography variant="body2" color="text.secondary">
                            {formatDateTime(date.date, date.time)}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            );
          })}
        </List>
      )}

      {/* Date Details Dialog */}
      <Dialog
        open={detailsOpen}
        onClose={handleCloseDetails}
        maxWidth="sm"
        fullWidth
      >
        {selectedDate && (
          <>
            <DialogTitle sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              p: 2
            }}>
              <Typography variant="h6" component="div">
                Date Details
              </Typography>
              <IconButton onClick={handleCloseDetails} size="small">
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            
            <DialogContent dividers>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height={200}
                  image={selectedDate.location.image}
                  alt={selectedDate.location.name}
                  sx={{ borderRadius: 1 }}
                />
                <Chip 
                  label={selectedDate.status} 
                  color={getStatusColor(selectedDate.status)}
                  sx={{ 
                    position: 'absolute', 
                    top: 16, 
                    right: 16,
                    fontWeight: 'bold'
                  }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="h5" gutterBottom>
                  {selectedDate.dateIdea.title}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    src={getUserProfile(selectedDate.matchId).profilePicture} 
                    alt={getUserProfile(selectedDate.matchId).name}
                    sx={{ width: 32, height: 32, mr: 1 }}
                  />
                  <Typography variant="body1">
                    with {getUserProfile(selectedDate.matchId).name}
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="h6" gutterBottom>
                  Date & Location
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CalendarIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    {formatDateTime(selectedDate.date, selectedDate.time)}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    {selectedDate.location.name} - {selectedDate.location.address}
                  </Typography>
                </Box>
                
                {selectedDate.notes && (
                  <>
                    <Typography variant="h6" gutterBottom>
                      Notes
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {selectedDate.notes}
                    </Typography>
                  </>
                )}
                
                {selectedDate.cancelReason && (
                  <>
                    <Typography variant="h6" color="error" gutterBottom>
                      Cancellation Reason
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {selectedDate.cancelReason}
                    </Typography>
                  </>
                )}
              </Box>
            </DialogContent>
            
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={handleCloseDetails} variant="outlined">
                Close
              </Button>
              
              {/* Show different buttons based on date status */}
              {selectedDate.status === 'Confirmed' && (
                <>
                  <Button 
                    variant="outlined" 
                    color="error"
                    startIcon={<CancelIcon />}
                    onClick={handleOpenCancelDialog}
                  >
                    Cancel Date
                  </Button>
                </>
              )}
              
              {selectedDate.status === 'Pending' && (
                <>
                  <Button 
                    variant="outlined" 
                    color="error"
                    startIcon={<CloseIcon />}
                    onClick={handleOpenCancelDialog}
                  >
                    Decline
                  </Button>
                  <Button 
                    variant="contained" 
                    color="success"
                    startIcon={<CheckIcon />}
                    onClick={() => {
                      setScheduledDates(prevDates => 
                        prevDates.map(date => 
                          date.id === selectedDate.id 
                            ? { ...date, status: 'Confirmed' } 
                            : date
                        )
                      );
                      handleCloseDetails();
                    }}
                  >
                    Confirm
                  </Button>
                </>
              )}
              
              {(selectedDate.status === 'Completed' || selectedDate.status === 'Cancelled') && (
                <Button 
                  variant="contained"
                  startIcon={<FeedbackIcon />}
                  onClick={handleOpenFeedbackDialog}
                >
                  Provide Feedback
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Cancel Date Dialog */}
      <Dialog
        open={cancelDialogOpen}
        onClose={handleCloseCancelDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">
            {selectedDate?.status === 'Pending' ? 'Decline Date' : 'Cancel Date'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            {selectedDate?.status === 'Pending' 
              ? 'Are you sure you want to decline this date?' 
              : 'Are you sure you want to cancel this date?'}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {selectedDate?.status === 'Pending' 
              ? 'Please provide a reason for declining.' 
              : 'Please provide a reason for cancellation.'}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Reason"
            fullWidth
            multiline
            rows={3}
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseCancelDialog} variant="outlined">
            Back
          </Button>
          <Button 
            onClick={handleCancelDate} 
            variant="contained" 
            color="error"
            disabled={!cancelReason.trim()}
          >
            {selectedDate?.status === 'Pending' ? 'Decline' : 'Cancel'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Dialog */}
      {selectedDate && (
        <DateFeedbackDialog
          open={feedbackDialogOpen}
          onClose={handleCloseFeedbackDialog}
          dateIdea={selectedDate.dateIdea}
          matchProfile={getUserProfile(selectedDate.matchId)}
        />
      )}
    </Box>
  );
}

export default ScheduledDates;
