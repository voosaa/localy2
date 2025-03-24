import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Divider,
  Stack,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  VerifiedUser as VerifiedUserIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Share as ShareIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  LocationOn as LocationOnIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

// Import mock data
import { profiles } from '../data/mockData';

function ProfilePage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Find the profile based on the id parameter, or use the first profile if not found
  const profile = profiles.find(p => p.id === id) || profiles[0];
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Box sx={{ pb: { xs: 3, sm: 4 } }}>
      {/* Header with back button */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, sm: 3 } }}>
        <IconButton component={Link} to="/" sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant={isMobile ? "h6" : "h5"} component="h1" fontWeight="bold">
          Profile
        </Typography>
      </Box>
      
      {/* Profile Header */}
      <Box sx={{ position: 'relative', mb: { xs: 2, sm: 3 } }}>
        <CardMedia
          component="img"
          height={isMobile ? "150" : "200"}
          image={profile.images[0]}
          alt={profile.name}
          sx={{ borderRadius: 3 }}
        />
        
        <Box sx={{ 
          position: 'absolute', 
          bottom: isMobile ? -40 : -50, 
          left: isMobile ? 16 : 24, 
          display: 'flex',
          alignItems: 'flex-end'
        }}>
          <Avatar
            src={profile.images[0]}
            sx={{ 
              width: isMobile ? 80 : 100, 
              height: isMobile ? 80 : 100, 
              border: '4px solid white',
              boxShadow: 1,
            }}
          />
          {profile.verified && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                right: -8,
                backgroundColor: 'white',
                borderRadius: '50%',
                padding: '2px',
              }}
            >
              <VerifiedUserIcon color="primary" sx={{ fontSize: isMobile ? 20 : 24 }} />
            </Box>
          )}
        </Box>
        
        <Box sx={{ 
          position: 'absolute', 
          top: 16, 
          right: 16, 
          display: 'flex',
          gap: 1
        }}>
          <IconButton 
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              width: isMobile ? 36 : 40,
              height: isMobile ? 36 : 40,
            }}
            onClick={handleFavoriteToggle}
          >
            {isFavorite ? (
              <FavoriteIcon color="error" fontSize={isMobile ? "small" : "medium"} />
            ) : (
              <FavoriteBorderIcon fontSize={isMobile ? "small" : "medium"} />
            )}
          </IconButton>
          <IconButton 
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              width: isMobile ? 36 : 40,
              height: isMobile ? 36 : 40,
            }}
          >
            <ShareIcon fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
        </Box>
      </Box>
      
      {/* Profile Info */}
      <Box sx={{ mt: isMobile ? 5 : 7, px: { xs: 1, sm: 2 } }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? 2 : 0
        }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant={isMobile ? "h6" : "h5"} component="h2" fontWeight="bold">
                {profile.name}
              </Typography>
              <Typography variant={isMobile ? "subtitle1" : "h6"} color="text.secondary">
                {profile.age}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LocationOnIcon fontSize="small" />
              {profile.distance}
            </Typography>
          </Box>
          
          <Button 
            variant="contained" 
            component={Link} 
            to="/edit-profile"
            startIcon={<EditIcon />}
            size={isMobile ? "small" : "medium"}
          >
            Edit Profile
          </Button>
        </Box>
        
        <Box sx={{ mt: { xs: 1.5, sm: 2 } }}>
          <Typography variant="body1">
            {profile.bio}
          </Typography>
        </Box>
        
        {/* Interests */}
        <Box sx={{ mt: { xs: 2, sm: 3 } }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Interests
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {profile.interests.map((interest) => (
              <Chip 
                key={interest} 
                label={interest} 
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                sx={{ borderRadius: 1 }}
              />
            ))}
          </Box>
        </Box>
        
        {/* Social Media */}
        {profile.socialMedia && (
          <Box sx={{ mt: { xs: 2, sm: 3 } }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Social Media
            </Typography>
            <Stack 
              direction="row" 
              spacing={isMobile ? 1 : 2}
              sx={{ 
                flexWrap: isMobile ? 'wrap' : 'nowrap',
                gap: isMobile ? 1 : 0
              }}
            >
              {profile.socialMedia.instagram && (
                <Button 
                  startIcon={<InstagramIcon />} 
                  variant="outlined"
                  size="small"
                >
                  {isMobile ? 'IG' : 'Instagram'}
                </Button>
              )}
              {profile.socialMedia.twitter && (
                <Button 
                  startIcon={<TwitterIcon />} 
                  variant="outlined"
                  size="small"
                >
                  {isMobile ? 'X' : 'Twitter'}
                </Button>
              )}
              {profile.socialMedia.linkedin && (
                <Button 
                  startIcon={<LinkedInIcon />} 
                  variant="outlined"
                  size="small"
                >
                  {isMobile ? 'LI' : 'LinkedIn'}
                </Button>
              )}
            </Stack>
          </Box>
        )}
        
        {/* Tabs */}
        <Box sx={{ mt: { xs: 3, sm: 4 } }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            variant="fullWidth"
            sx={{
              '.MuiTabs-indicator': {
                height: 3,
                borderRadius: 1.5,
              },
            }}
          >
            <Tab label="Photos" />
            <Tab label="About" />
            <Tab label="Prompts" />
          </Tabs>
          
          <Divider />
          
          {/* Photos Tab */}
          {activeTab === 0 && (
            <Box sx={{ mt: { xs: 2, sm: 3 } }}>
              <Grid container spacing={isMobile ? 1 : 2}>
                {profile.images.map((image, index) => (
                  <Grid item xs={4} key={index}>
                    <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        height={isMobile ? 120 : 150}
                        image={image}
                        alt={`Photo ${index + 1}`}
                      />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
          
          {/* About Tab */}
          {activeTab === 1 && (
            <Box sx={{ mt: { xs: 2, sm: 3 } }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                About Me
              </Typography>
              <Typography variant="body1" paragraph>
                {profile.aboutMe || profile.bio}
              </Typography>
              
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Looking For
              </Typography>
              <Typography variant="body1" paragraph>
                {profile.lookingFor || "I'm looking to meet new people and explore the city together."}
              </Typography>
              
              <Box sx={{ mt: { xs: 2, sm: 3 } }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Location
                    </Typography>
                    <Typography variant="body1">
                      {profile.location || "San Francisco, CA"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Joined
                    </Typography>
                    <Typography variant="body1">
                      {profile.joined || "January 2023"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
          
          {/* Prompts Tab */}
          {activeTab === 2 && (
            <Box sx={{ mt: { xs: 2, sm: 3 } }}>
              {(profile.prompts || [
                { question: "A perfect day for me looks like...", answer: "Exploring a new neighborhood, finding a cozy café, and ending with dinner at a local spot." },
                { question: "My favorite local spot is...", answer: "The Ferry Building on Saturday mornings for the farmers market." },
                { question: "You should swipe right if...", answer: "You love trying new restaurants and going on adventures around the city." }
              ]).map((prompt, index) => (
                <Box key={index} sx={{ mb: { xs: 2.5, sm: 3 } }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {prompt.question}
                  </Typography>
                  <Typography variant="body1">
                    {prompt.answer}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ProfilePage;
