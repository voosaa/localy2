import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Avatar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  VerifiedUser as VerifiedUserIcon,
} from '@mui/icons-material';

function ProfileCard({ 
  profile, 
  isFavorite, 
  onFavoriteToggle, 
  variant = 'standard', // 'standard', 'compact', or 'trending'
  showInterests = true,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the favorite button
    onFavoriteToggle(profile.id);
  };

  if (variant === 'compact') {
    return (
      <Box 
        component={Link}
        to={`/profile/${profile.id}`}
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          textDecoration: 'none',
          color: 'inherit',
          width: '100%',
        }}
      >
        <Avatar
          src={Array.isArray(profile.images) ? profile.images[0] : profile.image}
          sx={{ width: isMobile ? 40 : 50, height: isMobile ? 40 : 50, mr: 2 }}
        />
        <Box sx={{ overflow: 'hidden', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography 
              variant={isMobile ? "body1" : "subtitle1"} 
              fontWeight="medium"
              noWrap
            >
              {profile.name}
            </Typography>
            {profile.verified && (
              <VerifiedUserIcon 
                color="primary" 
                fontSize="small" 
                sx={{ ml: 0.5, flexShrink: 0 }} 
              />
            )}
          </Box>
          <Typography 
            variant="body2" 
            color="text.secondary"
            noWrap
          >
            {profile.age} • {typeof profile.distance === 'string' ? profile.distance : `${profile.distance} miles away`}
          </Typography>
        </Box>
      </Box>
    );
  }

  if (variant === 'trending') {
    return (
      <Card 
        component={Link} 
        to={`/profile/${profile.id}`}
        sx={{ 
          minWidth: isMobile ? 150 : 200,
          maxWidth: isMobile ? 150 : 200,
          borderRadius: 3,
          textDecoration: 'none',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height={isMobile ? "150" : "200"}
            image={Array.isArray(profile.images) ? profile.images[0] : profile.image}
            alt={profile.name}
            sx={{ borderRadius: '16px 16px 0 0', objectFit: 'cover' }}
          />
          {profile.verified && (
            <Box
              sx={{
                position: 'absolute',
                bottom: -12,
                right: 12,
                backgroundColor: 'white',
                borderRadius: '50%',
                padding: '2px',
              }}
            >
              <VerifiedUserIcon color="primary" fontSize={isMobile ? "small" : "medium"} />
            </Box>
          )}
        </Box>
        <CardContent sx={{ p: isMobile ? 1.5 : 2 }}>
          <Typography variant={isMobile ? "subtitle1" : "h6"} component="div" noWrap>
            {profile.name}, {profile.age}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {profile.followers} followers
          </Typography>
        </CardContent>
      </Card>
    );
  }

  // Standard variant (default)
  return (
    <Card 
      component={Link} 
      to={`/profile/${profile.id}`}
      sx={{ 
        width: '100%',
        minWidth: { xs: '100%', sm: 280 },
        maxWidth: { xs: '100%', sm: 280 },
        borderRadius: 3,
        textDecoration: 'none',
        position: 'relative',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
        },
      }}
    >
      <CardMedia
        component="img"
        height={isMobile ? "180" : "200"}
        image={Array.isArray(profile.images) ? profile.images[0] : profile.image}
        alt={profile.name}
        sx={{ objectFit: 'cover' }}
      />
      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          },
          padding: isMobile ? '4px' : '8px',
        }}
        onClick={handleFavoriteClick}
        size={isMobile ? "small" : "medium"}
      >
        {isFavorite ? (
          <FavoriteIcon color="error" fontSize={isMobile ? "small" : "medium"} />
        ) : (
          <FavoriteBorderIcon fontSize={isMobile ? "small" : "medium"} />
        )}
      </IconButton>
      <CardContent sx={{ p: isMobile ? 2 : 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Typography variant={isMobile ? "subtitle1" : "h6"} component="div">
            {profile.name}, {profile.age}
          </Typography>
          {profile.verified && (
            <VerifiedUserIcon color="primary" fontSize="small" />
          )}
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {typeof profile.distance === 'string' ? profile.distance : `${profile.distance} miles away`}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {isMobile && profile.bio && profile.bio.length > 100 
            ? `${profile.bio.substring(0, 100)}...` 
            : profile.bio}
        </Typography>
        {showInterests && profile.interests && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {profile.interests.slice(0, isMobile ? 2 : 3).map((interest) => (
              <Chip 
                key={interest} 
                label={interest} 
                size="small" 
                variant="outlined"
                sx={{ borderRadius: 1 }}
              />
            ))}
            {profile.interests.length > (isMobile ? 2 : 3) && (
              <Chip 
                label={`+${profile.interests.length - (isMobile ? 2 : 3)}`} 
                size="small" 
                variant="outlined"
                sx={{ borderRadius: 1 }}
              />
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
