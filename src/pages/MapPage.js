import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  TextField, 
  InputAdornment, 
  IconButton, 
  Button, 
  Drawer, 
  Divider, 
  Chip, 
  useTheme, 
  useMediaQuery,
  CircularProgress,
  Slider
} from '@mui/material';
import { 
  Search as SearchIcon, 
  MyLocation as MyLocationIcon, 
  FilterList as FilterIcon, 
  Close as CloseIcon, 
  LocationOn as LocationIcon,
  DirectionsWalk as WalkIcon,
  DirectionsCar as CarIcon,
  Train as TransitIcon
} from '@mui/icons-material';
import { getRandomDateIdeas } from '../utils/mockData';
import DateIdeaCard from '../components/DateIdeaCard';
import MapComponent from '../components/MapComponent';
import FilterDialog from '../components/FilterDialog';
import { formatDistance, getEstimatedTravelTime, filterDateIdeasByDistance } from '../utils/locationUtils';

function MapPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [searchQuery, setSearchQuery] = useState('');
  const [dateIdeas, setDateIdeas] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [filteredDateIdeas, setFilteredDateIdeas] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedDateIdea, setSelectedDateIdea] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mapError, setMapError] = useState(null);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [maxDistance, setMaxDistance] = useState(50); // Default 50km
  const [filters, setFilters] = useState({
    categories: [],
    settings: [],
    priceLevel: [1, 4],
    location: '',
    maxDistance: 50
  });
  
  // Simulate loading date ideas with location data
  useEffect(() => {
    // In a real app, this would fetch from an API
    const ideasWithLocation = getRandomDateIdeas().map(idea => {
      // Generate random coordinates near a central point
      // In a real app, these would come from the database
      const lat = 40.7128 + (Math.random() - 0.5) * 0.1; // NYC area
      const lng = -74.0060 + (Math.random() - 0.5) * 0.1;
      
      return {
        ...idea,
        coordinates: {
          lat,
          lng
        }
      };
    });
    
    setDateIdeas(ideasWithLocation);
    setFilteredDateIdeas(ideasWithLocation);
    setLoading(false);
  }, []);
  
  // Apply filters when they change or user location changes
  useEffect(() => {
    if (dateIdeas.length === 0) return;
    
    let filtered = [...dateIdeas];
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(idea => 
        idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (idea.categories && idea.categories.some(cat => 
          cat.toLowerCase().includes(searchQuery.toLowerCase())
        ))
      );
    }
    
    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter(idea => 
        idea.categories && idea.categories.some(category => 
          filters.categories.includes(category)
        )
      );
    }
    
    // Filter by settings
    if (filters.settings.length > 0) {
      filtered = filtered.filter(idea => 
        idea.setting && filters.settings.includes(idea.setting)
      );
    }
    
    // Filter by price level
    filtered = filtered.filter(idea => 
      idea.priceLevel >= filters.priceLevel[0] && 
      idea.priceLevel <= filters.priceLevel[1]
    );
    
    // Filter by distance
    if (userLocation && filters.maxDistance) {
      filtered = filterDateIdeasByDistance(filtered, {
        latitude: userLocation.lat,
        longitude: userLocation.lng
      }, filters.maxDistance);
    }
    
    setFilteredDateIdeas(filtered);
  }, [dateIdeas, searchQuery, filters, userLocation]);
  
  // Get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userCoords);
          setSelectedLocation(userCoords);
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setMapError("Unable to get your location. Please check your browser permissions.");
          setLoading(false);
        }
      );
    } else {
      setMapError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };
  
  // Handle search query change
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };
  
  // Handle marker click on map
  const handleMarkerClick = (dateIdea) => {
    setSelectedDateIdea(dateIdea);
    setDrawerOpen(true);
  };
  
  // Handle map click (to place a new marker)
  const handleMapClick = (coords) => {
    setSelectedLocation(coords);
  };
  
  // Handle filter change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setFilterDialogOpen(false);
  };
  
  // Handle max distance change
  const handleMaxDistanceChange = (event, newValue) => {
    setMaxDistance(newValue);
    setFilters(prev => ({
      ...prev,
      maxDistance: newValue
    }));
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
          Explore Date Ideas Near You
        </Typography>
      </Box>
      
      <Paper 
        elevation={2} 
        sx={{ 
          p: 2, 
          mb: 3, 
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1
        }}
      >
        <TextField
          placeholder="Search for date ideas or locations..."
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 'auto' } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <Box sx={{ display: 'flex', gap: 1, width: { xs: '100%', sm: 'auto' } }}>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<MyLocationIcon />}
            onClick={getUserLocation}
            sx={{ flex: { xs: 1, sm: 'none' } }}
          >
            Near Me
          </Button>
          
          <Button 
            variant="outlined" 
            startIcon={<FilterIcon />}
            onClick={() => setFilterDialogOpen(true)}
            sx={{ flex: { xs: 1, sm: 'none' } }}
          >
            Filter
          </Button>
        </Box>
      </Paper>
      
      {/* Distance slider */}
      <Paper 
        elevation={2} 
        sx={{ 
          p: 2, 
          mb: 3, 
          borderRadius: 2
        }}
      >
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Maximum Distance: {maxDistance} km
        </Typography>
        <Slider
          value={maxDistance}
          onChange={handleMaxDistanceChange}
          min={1}
          max={100}
          step={1}
          marks={[
            { value: 5, label: '5 km' },
            { value: 25, label: '25 km' },
            { value: 50, label: '50 km' },
            { value: 100, label: '100 km' }
          ]}
          sx={{ mt: 2 }}
        />
      </Paper>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      ) : mapError ? (
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#FFF4F4', color: 'error.main', borderRadius: 2 }}>
          <Typography variant="body1">{mapError}</Typography>
          <Button 
            variant="outlined" 
            color="error" 
            sx={{ mt: 2 }}
            onClick={() => setMapError(null)}
          >
            Dismiss
          </Button>
        </Paper>
      ) : (
        <Box sx={{ height: { xs: '50vh', md: '60vh' }, position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
          <MapComponent 
            dateIdeas={filteredDateIdeas}
            userLocation={userLocation}
            onMarkerClick={handleMarkerClick}
            onMapClick={handleMapClick}
          />
        </Box>
      )}
      
      {/* Results count */}
      <Box sx={{ mt: 2, mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          {filteredDateIdeas.length} date ideas found
          {userLocation && ` near you`}
          {filters.categories.length > 0 && ` in ${filters.categories.join(', ')}`}
        </Typography>
      </Box>
      
      {/* Date idea drawer */}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: '80vh'
          }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        {selectedDateIdea && (
          <Box sx={{ px: 3, pb: 4 }}>
            <DateIdeaCard dateIdea={selectedDateIdea} variant="detailed" />
            
            {userLocation && selectedDateIdea.coordinates && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" fontWeight="medium" gutterBottom>
                  Distance & Travel Time
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    {formatDistance(selectedDateIdea.distance)} from your location
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Estimated travel time:
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
                  <Chip 
                    icon={<WalkIcon />} 
                    label={getEstimatedTravelTime(selectedDateIdea.distance).walking} 
                    variant="outlined" 
                  />
                  <Chip 
                    icon={<CarIcon />} 
                    label={getEstimatedTravelTime(selectedDateIdea.distance).driving} 
                    variant="outlined" 
                  />
                  <Chip 
                    icon={<TransitIcon />} 
                    label={getEstimatedTravelTime(selectedDateIdea.distance).transit} 
                    variant="outlined" 
                  />
                </Box>
              </Box>
            )}
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                sx={{ borderRadius: 4, px: 4 }}
              >
                Get Directions
              </Button>
            </Box>
          </Box>
        )}
      </Drawer>
      
      {/* Filter Dialog */}
      <FilterDialog 
        open={filterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </Container>
  );
}

export default MapPage;
