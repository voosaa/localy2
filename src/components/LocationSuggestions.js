import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Rating,
  Button,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Directions as DirectionsIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Star as StarIcon,
  AccessTime as TimeIcon,
  AttachMoney as MoneyIcon,
  Close as CloseIcon,
  Send as SendIcon
} from '@mui/icons-material';

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
    description: "Central Park is an urban park in New York City located between the Upper West and Upper East Sides of Manhattan. It is the most visited urban park in the United States.",
    openingHours: "6:00 AM - 1:00 AM",
    website: "https://www.centralparknyc.org/",
    phone: "+1 212-310-6600",
    saved: false
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
    description: "A cozy coffee shop offering a variety of specialty coffees, teas, and pastries. Perfect for a casual date.",
    openingHours: "7:00 AM - 9:00 PM",
    website: "https://www.thecoffeebean.com/",
    phone: "+1 212-555-1234",
    saved: true
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
    description: "Enjoy stunning views of the city skyline while sipping on craft cocktails at this trendy rooftop bar.",
    openingHours: "4:00 PM - 2:00 AM",
    website: "https://www.skylinerooftopbar.com/",
    phone: "+1 212-555-5678",
    saved: false
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
    description: "The Metropolitan Museum of Art presents over 5,000 years of art from around the world for everyone to experience and enjoy.",
    openingHours: "10:00 AM - 5:30 PM",
    website: "https://www.metmuseum.org/",
    phone: "+1 212-535-7710",
    saved: false
  }
];

function LocationSuggestions({ dateIdea, onLocationSelect }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [locations, setLocations] = useState(mockLocations);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleToggleSave = (locationId) => {
    setLocations(prevLocations =>
      prevLocations.map(location =>
        location.id === locationId
          ? { ...location, saved: !location.saved }
          : location
      )
    );
  };

  const handleOpenDetails = (location) => {
    setSelectedLocation(location);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  const getPriceLevelString = (level) => {
    return Array(level).fill('$').join('');
  };

  const handleSendLocation = (location) => {
    if (onLocationSelect) {
      onLocationSelect(location);
    }
    handleCloseDetails();
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold" gutterBottom>
        Suggested Locations for {dateIdea?.title || "Your Date"}
      </Typography>
      
      <Typography variant="body2" color="text.secondary" paragraph>
        Here are some recommended places for your date idea. Click on a location to see more details.
      </Typography>
      
      <Grid container spacing={isMobile ? 2 : 3}>
        {locations.map((location) => (
          <Grid item xs={12} sm={6} md={4} key={location.id}>
            <Card 
              elevation={1} 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: 2,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <CardMedia
                component="img"
                height={160}
                image={location.image}
                alt={location.name}
              />
              <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h6" component="h2" gutterBottom noWrap sx={{ maxWidth: '80%' }}>
                    {location.name}
                  </Typography>
                  <IconButton 
                    size="small" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleSave(location.id);
                    }}
                    sx={{ p: 0.5 }}
                  >
                    {location.saved ? (
                      <BookmarkIcon color="primary" />
                    ) : (
                      <BookmarkBorderIcon />
                    )}
                  </IconButton>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {location.address}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating
                    value={location.rating}
                    precision={0.1}
                    size="small"
                    readOnly
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {location.rating} ({location.reviews})
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                  <Chip 
                    label={location.category} 
                    size="small" 
                    variant="outlined"
                  />
                  <Chip 
                    label={getPriceLevelString(location.priceLevel)} 
                    size="small" 
                    variant="outlined"
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  mb: 1
                }}>
                  {location.description}
                </Typography>
              </CardContent>
              
              <Box sx={{ p: 2, pt: 0, mt: 'auto', display: 'flex', gap: 1 }}>
                <Button 
                  variant="outlined" 
                  fullWidth
                  onClick={() => handleOpenDetails(location)}
                  size={isMobile ? "small" : "medium"}
                >
                  View Details
                </Button>
                {onLocationSelect && (
                  <Button 
                    variant="contained" 
                    color="primary"
                    size={isMobile ? "small" : "medium"}
                    startIcon={<SendIcon />}
                    onClick={() => onLocationSelect(location)}
                  >
                    Share
                  </Button>
                )}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Location Details Dialog */}
      <Dialog
        open={detailsOpen}
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
      >
        {selectedLocation && (
          <>
            <DialogTitle sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              p: 2
            }}>
              <Typography variant={isMobile ? "h6" : "h5"} component="div">
                {selectedLocation.name}
              </Typography>
              <IconButton onClick={handleCloseDetails} size="small">
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            
            <DialogContent dividers>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height={300}
                  image={selectedLocation.image}
                  alt={selectedLocation.name}
                  sx={{ borderRadius: 1 }}
                />
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 16, 
                    right: 16, 
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '50%',
                    p: 0.5
                  }}
                >
                  <IconButton 
                    onClick={() => handleToggleSave(selectedLocation.id)}
                    size="small"
                  >
                    {selectedLocation.saved ? (
                      <BookmarkIcon color="primary" />
                    ) : (
                      <BookmarkBorderIcon />
                    )}
                  </IconButton>
                </Box>
              </Box>
              
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" gutterBottom>
                    About
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {selectedLocation.description}
                  </Typography>
                  
                  <Typography variant="h6" gutterBottom>
                    Details
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationIcon color="action" sx={{ mr: 1 }} />
                    <Typography variant="body1">
                      {selectedLocation.address}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TimeIcon color="action" sx={{ mr: 1 }} />
                    <Typography variant="body1">
                      {selectedLocation.openingHours}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <MoneyIcon color="action" sx={{ mr: 1 }} />
                    <Typography variant="body1">
                      {getPriceLevelString(selectedLocation.priceLevel)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <StarIcon color="action" sx={{ mr: 1 }} />
                    <Typography variant="body1">
                      {selectedLocation.rating} stars ({selectedLocation.reviews} reviews)
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Card variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Perfect For
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        <Chip label="First Date" size="small" />
                        <Chip label="Casual" size="small" />
                        <Chip label={selectedLocation.category} size="small" />
                        {selectedLocation.priceLevel < 3 && (
                          <Chip label="Budget Friendly" size="small" />
                        )}
                        {selectedLocation.category === 'Cafe' && (
                          <Chip label="Coffee Date" size="small" />
                        )}
                        {selectedLocation.category === 'Park' && (
                          <Chip label="Outdoor" size="small" />
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                  
                  <Card variant="outlined" sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Contact
                      </Typography>
                      <Typography variant="body2" paragraph>
                        Phone: {selectedLocation.phone}
                      </Typography>
                      <Typography variant="body2" paragraph>
                        Website: {selectedLocation.website}
                      </Typography>
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<DirectionsIcon />}
                        sx={{ mb: 1 }}
                      >
                        Get Directions
                      </Button>
                      <Button
                        variant="outlined"
                        fullWidth
                      >
                        Share Location
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </DialogContent>
            
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={handleCloseDetails} variant="outlined">
                Close
              </Button>
              {onLocationSelect && (
                <Button 
                  variant="contained"
                  startIcon={<SendIcon />}
                  onClick={() => handleSendLocation(selectedLocation)}
                >
                  Send to Chat
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default LocationSuggestions;
