import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  IconButton,
  Chip,
  Grid,
  Avatar,
  Divider,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Fab,
  Tooltip,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  Tune as TuneIcon, 
  Refresh as RefreshIcon,
  Close as CloseIcon,
  Map as MapIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  MyLocation as MyLocationIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Components
import SwipeableCard from '../components/SwipeableCard';
import FilterDialog from '../components/FilterDialog';

// Utils
import { getRandomDateIdeas } from '../utils/mockData';
import { MatchmakingEngine } from '../utils/MatchmakingEngine';
import { calculateDistance, formatDistance, filterDateIdeasByDistance } from '../utils/locationUtils';

// Mock user profile for matchmaking
const currentUser = {
  id: 'user123',
  name: 'Alex Johnson',
  age: 28,
  gender: 'Non-binary',
  location: 'San Francisco, CA',
  bio: 'Adventure seeker looking for new experiences',
  interests: ['hiking', 'photography', 'cooking', 'art', 'live music'],
  preferences: {
    categories: ['outdoor', 'cultural', 'food', 'adventure'],
    settings: ['casual', 'romantic', 'active'],
    priceLevel: [1, 2, 3],
    location: 'urban',
    distance: 15 // miles
  },
  avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
};

function DiscoverPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const matchmakingEngine = new MatchmakingEngine();
  
  // State
  const [dateIdeas, setDateIdeas] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    settings: [],
    priceLevel: [1, 2, 3, 4],
    location: '',
    distance: 15 // miles
  });
  const [openMatchDialog, setOpenMatchDialog] = useState(false);
  const [matchedDateIdea, setMatchedDateIdea] = useState(null);
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Load date ideas
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let ideas = getRandomDateIdeas(20);
      
      // Apply matchmaking engine to calculate match scores
      ideas = ideas.map(idea => {
        const matchScore = matchmakingEngine.calculateDateIdeaMatchScore(currentUser, idea);
        const matchReason = matchmakingEngine.generateMatchReason(currentUser, idea);
        return { 
          ...idea, 
          matchScore,
          matchReason
        };
      });
      
      // Sort by match score (highest first)
      ideas.sort((a, b) => b.matchScore - a.matchScore);
      
      // Filter by distance
      if (currentLocation) {
        ideas = filterDateIdeasByDistance(ideas, currentLocation, filters.distance);
      }
      
      setDateIdeas(ideas);
      setIsLoading(false);
    }, 1500);
  }, [filters, currentLocation]);
  
  // Handle swipe left (dislike)
  const handleSwipeLeft = (dateIdea) => {
    // Skip to next card
    setCurrentIndex(prevIndex => prevIndex + 1);
  };
  
  // Handle swipe right (like)
  const handleSwipeRight = (dateIdea) => {
    // Simulate a match (50% chance)
    const isMatch = Math.random() > 0.5;
    
    if (isMatch) {
      // Generate mock matched users
      const mockUsers = [
        {
          id: 'user456',
          name: 'Jordan Smith',
          age: 26,
          bio: 'Coffee enthusiast and weekend hiker',
          avatar: 'https://randomuser.me/api/portraits/lego/2.jpg',
          compatibility: 87
        },
        {
          id: 'user789',
          name: 'Taylor Reed',
          age: 29,
          bio: 'Foodie and amateur photographer',
          avatar: 'https://randomuser.me/api/portraits/lego/3.jpg',
          compatibility: 75
        }
      ];
      
      setMatchedDateIdea(dateIdea);
      setMatchedUsers(mockUsers);
      setOpenMatchDialog(true);
    } else {
      // Skip to next card
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };
  
  // Handle info click
  const handleInfoClick = (dateIdea) => {
    // Show more details about the date idea
    console.log('Show more info for:', dateIdea);
  };
  
  // Handle filter change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setOpenFilterDialog(false);
    setCurrentIndex(0);
  };
  
  // Handle refresh
  const handleRefresh = () => {
    setCurrentIndex(0);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let ideas = getRandomDateIdeas(20);
      
      // Apply matchmaking engine to calculate match scores
      ideas = ideas.map(idea => {
        const matchScore = matchmakingEngine.calculateDateIdeaMatchScore(currentUser, idea);
        const matchReason = matchmakingEngine.generateMatchReason(currentUser, idea);
        return { 
          ...idea, 
          matchScore,
          matchReason
        };
      });
      
      // Sort by match score (highest first)
      ideas.sort((a, b) => b.matchScore - a.matchScore);
      
      // Filter by distance
      if (currentLocation) {
        ideas = filterDateIdeasByDistance(ideas, currentLocation, filters.distance);
      }
      
      setDateIdeas(ideas);
      setIsLoading(false);
    }, 1500);
  };
  
  // Navigate to map page
  const handleMapClick = () => {
    navigate('/map');
  };
  
  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setCurrentLocation({ latitude, longitude });
      }, error => {
        console.error('Error getting current location:', error);
        setSnackbarOpen(true);
      });
    } else {
      console.error('Geolocation not supported');
      setSnackbarOpen(true);
    }
  };
  
  useEffect(() => {
    getCurrentLocation();
  }, []);
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Discover
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Find date ideas on map">
            <IconButton 
              color="primary" 
              onClick={handleMapClick}
              sx={{ 
                bgcolor: 'rgba(98, 0, 238, 0.08)',
                '&:hover': {
                  bgcolor: 'rgba(98, 0, 238, 0.12)',
                }
              }}
            >
              <MapIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Refresh date ideas">
            <IconButton 
              color="primary" 
              onClick={handleRefresh}
              sx={{ 
                bgcolor: 'rgba(98, 0, 238, 0.08)',
                '&:hover': {
                  bgcolor: 'rgba(98, 0, 238, 0.12)',
                }
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Filter date ideas">
            <IconButton 
              color="primary" 
              onClick={() => setOpenFilterDialog(true)}
              sx={{ 
                bgcolor: 'rgba(98, 0, 238, 0.08)',
                '&:hover': {
                  bgcolor: 'rgba(98, 0, 238, 0.12)',
                }
              }}
            >
              <TuneIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Get current location">
            <IconButton 
              color="primary" 
              onClick={getCurrentLocation}
              sx={{ 
                bgcolor: 'rgba(98, 0, 238, 0.08)',
                '&:hover': {
                  bgcolor: 'rgba(98, 0, 238, 0.12)',
                }
              }}
            >
              <MyLocationIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 500 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : dateIdeas.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No date ideas found
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            sx={{ mt: 2 }}
          >
            Refresh
          </Button>
        </Box>
      ) : currentIndex >= dateIdeas.length ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            You've seen all date ideas
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            sx={{ mt: 2 }}
          >
            Refresh
          </Button>
        </Box>
      ) : (
        <SwipeableCard 
          dateIdea={dateIdeas[currentIndex]} 
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
          onInfoClick={handleInfoClick}
          matchScore={dateIdeas[currentIndex].matchScore}
          matchReason={dateIdeas[currentIndex].matchReason}
        />
      )}
      
      {/* Filter Dialog */}
      <FilterDialog 
        open={openFilterDialog} 
        onClose={() => setOpenFilterDialog(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      {/* Match Dialog */}
      <Dialog 
        open={openMatchDialog} 
        onClose={() => setOpenMatchDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            overflow: 'hidden'
          }
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <IconButton
            aria-label="close"
            onClick={() => setOpenMatchDialog(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              bgcolor: 'rgba(0, 0, 0, 0.4)',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.6)',
              }
            }}
          >
            <CloseIcon />
          </IconButton>
          
          {matchedDateIdea && (
            <>
              <Box 
                sx={{ 
                  height: 200, 
                  backgroundImage: `url(${matchedDateIdea.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'flex-end',
                  p: 3
                }}
              >
                <Box 
                  sx={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)',
                  }}
                />
                <Box sx={{ position: 'relative', color: 'white', width: '100%' }}>
                  <Typography variant="h4" fontWeight="bold" gutterBottom>
                    It's a Match!
                  </Typography>
                  <Typography variant="subtitle1">
                    You and {matchedUsers.length} others are interested in:
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {matchedDateIdea.title}
                  </Typography>
                </Box>
              </Box>
              
              <DialogContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  People who also liked this date idea:
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  {matchedUsers.map((user, index) => (
                    <Box key={user.id} sx={{ mb: index < matchedUsers.length - 1 ? 2 : 0 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <Avatar 
                            src={user.avatar} 
                            alt={user.name}
                            sx={{ width: 64, height: 64 }}
                          />
                        </Grid>
                        <Grid item xs>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="h6">
                              {user.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {user.age}
                            </Typography>
                            <Chip 
                              label={`${user.compatibility}% Match`} 
                              size="small" 
                              color="primary"
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {user.bio}
                          </Typography>
                        </Grid>
                      </Grid>
                      {index < matchedUsers.length - 1 && (
                        <Divider sx={{ my: 2 }} />
                      )}
                    </Box>
                  ))}
                </Box>
                
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    About this date idea:
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {matchedDateIdea.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {matchedDateIdea.categories && matchedDateIdea.categories.map((category, index) => (
                      <Chip 
                        key={index}
                        label={category} 
                        size="small" 
                        color="secondary"
                      />
                    ))}
                  </Box>
                </Box>
              </DialogContent>
              
              <DialogActions sx={{ p: 3, pt: 0 }}>
                <Button 
                  onClick={() => setOpenMatchDialog(false)} 
                  color="inherit"
                >
                  Later
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => {
                    setOpenMatchDialog(false);
                    // Navigate to chat or matches page
                    navigate('/matches');
                  }}
                >
                  Connect
                </Button>
              </DialogActions>
            </>
          )}
        </Box>
      </Dialog>
      
      {/* Navigation buttons for desktop */}
      {!isMobile && !isLoading && currentIndex < dateIdeas.length && (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            position: 'fixed', 
            left: '50%', 
            bottom: 80, 
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: 600,
            zIndex: 10
          }}
        >
          <Fab 
            color="error" 
            aria-label="dislike"
            onClick={() => handleSwipeLeft(dateIdeas[currentIndex])}
          >
            <ArrowBackIcon />
          </Fab>
          
          <Fab 
            color="success" 
            aria-label="like"
            onClick={() => handleSwipeRight(dateIdeas[currentIndex])}
          >
            <ArrowForwardIcon />
          </Fab>
        </Box>
      )}
      
      {/* Snackbar for location error */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          Error getting current location
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default DiscoverPage;
