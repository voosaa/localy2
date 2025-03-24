import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Avatar,
  Chip,
  TextField,
  InputAdornment,
  Paper,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';

// Import the ProfileCard component
import ProfileCard from '../components/ProfileCard';

// Import mock data
import { categories, profiles, trendingProfiles, localEvents } from '../data/mockData';

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleFavoriteToggle = (profileId) => {
    if (favorites.includes(profileId)) {
      setFavorites(favorites.filter(id => id !== profileId));
    } else {
      setFavorites([...favorites, profileId]);
    }
  };

  const scrollContainer = (containerId, direction) => {
    const container = document.getElementById(containerId);
    const scrollAmount = direction === 'left' ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <Box sx={{ py: { xs: 2, sm: 3 } }}>
      {/* Search Bar */}
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          mb: { xs: 3, sm: 4 },
          borderRadius: 2,
        }}
      >
        <InputAdornment position="start" sx={{ pl: 1 }}>
          <SearchIcon />
        </InputAdornment>
        <TextField
          fullWidth
          placeholder={isMobile ? "Search..." : "Search for people, places, or events..."}
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          sx={{ ml: 1, flex: 1 }}
        />
      </Paper>

      {/* Categories */}
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: { xs: 1.5, sm: 2 } 
        }}>
          <Typography variant={isMobile ? "h6" : "h5"} component="h2" fontWeight="bold">
            Discover
          </Typography>
          <Button variant="outlined" size="small">
            View All
          </Button>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 1, 
          overflowX: 'auto', 
          pb: 1,
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
        }}>
          {categories.map((category) => (
            <Chip
              key={category.id}
              label={
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 0.5,
                  whiteSpace: 'nowrap',
                }}>
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </Box>
              }
              onClick={() => setSelectedCategory(category.id)}
              color={selectedCategory === category.id ? 'primary' : 'default'}
              variant={selectedCategory === category.id ? 'filled' : 'outlined'}
              size={isMobile ? "small" : "medium"}
              sx={{ 
                borderRadius: 2,
                px: 1,
                '&.MuiChip-colorPrimary': {
                  fontWeight: 'medium',
                },
                flexShrink: 0,
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Nearby People */}
      <Box sx={{ mb: { xs: 4, sm: 6 } }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: { xs: 1.5, sm: 2 } 
        }}>
          <Typography variant={isMobile ? "h6" : "h5"} component="h2" fontWeight="bold">
            People Near You
          </Typography>
          {!isMobile && (
            <Box>
              <IconButton onClick={() => scrollContainer('nearby-profiles', 'left')}>
                <NavigateBeforeIcon />
              </IconButton>
              <IconButton onClick={() => scrollContainer('nearby-profiles', 'right')}>
                <NavigateNextIcon />
              </IconButton>
            </Box>
          )}
        </Box>
        
        <Box 
          id="nearby-profiles"
          sx={{ 
            display: 'flex', 
            gap: { xs: 1.5, sm: 2 }, 
            overflowX: 'auto',
            pb: 2,
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
            scrollSnapType: isMobile ? 'x mandatory' : 'none',
          }}
        >
          {profiles
            .filter(profile => profile.id !== 'me')
            .map((profile) => (
              <Box 
                key={profile.id} 
                sx={{ 
                  flexShrink: 0,
                  scrollSnapAlign: isMobile ? 'start' : 'none',
                  width: isMobile ? 'calc(100% - 16px)' : 'auto',
                }}
              >
                <ProfileCard
                  profile={profile}
                  isFavorite={favorites.includes(profile.id)}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              </Box>
            ))}
        </Box>
      </Box>

      {/* Trending Profiles */}
      <Box sx={{ mb: { xs: 4, sm: 6 } }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: { xs: 1.5, sm: 2 } 
        }}>
          <Typography variant={isMobile ? "h6" : "h5"} component="h2" fontWeight="bold">
            Trending Profiles
          </Typography>
          {!isMobile && (
            <Box>
              <IconButton onClick={() => scrollContainer('trending-profiles', 'left')}>
                <NavigateBeforeIcon />
              </IconButton>
              <IconButton onClick={() => scrollContainer('trending-profiles', 'right')}>
                <NavigateNextIcon />
              </IconButton>
            </Box>
          )}
        </Box>
        
        <Box 
          id="trending-profiles"
          sx={{ 
            display: 'flex', 
            gap: { xs: 1.5, sm: 2 }, 
            overflowX: 'auto',
            pb: 2,
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
            scrollSnapType: isMobile ? 'x mandatory' : 'none',
          }}
        >
          {trendingProfiles.map((profile) => (
            <Box 
              key={profile.id} 
              sx={{ 
                flexShrink: 0,
                scrollSnapAlign: isMobile ? 'start' : 'none',
              }}
            >
              <ProfileCard
                profile={profile}
                variant="trending"
                isFavorite={favorites.includes(profile.id)}
                onFavoriteToggle={handleFavoriteToggle}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Events Near You */}
      <Box>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: { xs: 1.5, sm: 2 } 
        }}>
          <Typography variant={isMobile ? "h6" : "h5"} component="h2" fontWeight="bold">
            Events Near You
          </Typography>
          <Button variant="outlined" size="small">
            View All
          </Button>
        </Box>
        
        <Grid container spacing={isMobile ? 2 : 3}>
          {localEvents.slice(0, isMobile ? 2 : 4).map((event) => (
            <Grid item xs={12} sm={6} key={event.id}>
              <Card 
                component={Link} 
                to={`/events/${event.id}`}
                sx={{ 
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  height: { xs: 'auto', sm: 140 },
                  borderRadius: 3,
                  overflow: 'hidden',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ 
                    width: { xs: '100%', sm: 140 },
                    height: { xs: 140, sm: '100%' },
                    objectFit: 'cover',
                  }}
                  image={event.image}
                  alt={event.name}
                />
                <CardContent sx={{ flex: '1 0 auto', p: { xs: 2, sm: 2.5 } }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {event.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {event.date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {event.location}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body2">
                      {event.attendees} attending
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default HomePage;
