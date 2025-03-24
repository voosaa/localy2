import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  Avatar,
  AvatarGroup,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Verified as VerifiedIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Close as CloseIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';

function MatchCard({ match }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Card sx={{ 
      borderRadius: 3,
      boxShadow: 2,
      overflow: 'hidden',
      mb: 2,
      position: 'relative',
      width: '100%',
    }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height={isMobile ? 180 : 250}
          image={match.user.images[0]}
          alt={match.user.name}
          sx={{
            objectFit: 'cover',
          }}
        />
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
            p: { xs: 1.5, sm: 2 },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography 
            variant={isMobile ? "h6" : "h5"} 
            fontWeight="bold" 
            color="white" 
            sx={{ mr: 1 }}
          >
            {match.user.name}, {match.user.age}
          </Typography>
          {match.user.verified && (
            <VerifiedIcon color="primary" fontSize={isMobile ? "small" : "medium"} />
          )}
        </Box>
      </Box>
      
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant={isMobile ? "body1" : "subtitle1"} fontWeight="bold" gutterBottom>
            Matched on {match.dateIdeas.length} date ideas:
          </Typography>
          
          <AvatarGroup 
            max={isMobile ? 2 : 3} 
            sx={{ mb: 2 }}
          >
            {match.dateIdeas.map(idea => (
              <Avatar 
                key={idea.id} 
                alt={idea.title} 
                src={idea.image} 
                sx={{ width: isMobile ? 32 : 40, height: isMobile ? 32 : 40 }}
              />
            ))}
          </AvatarGroup>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {match.dateIdeas.map(idea => (
              <Chip 
                key={idea.id}
                label={idea.title}
                size="small"
                sx={{ borderRadius: 1, mb: 0.5 }}
              />
            ))}
          </Box>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant={isMobile ? "body1" : "subtitle1"} fontWeight="bold" gutterBottom>
            Common interests:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {match.commonInterests.map(interest => (
              <Chip 
                key={interest}
                label={interest}
                variant="outlined"
                size="small"
                sx={{ borderRadius: 1, mb: 0.5 }}
              />
            ))}
          </Box>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {match.matchPercentage}% match based on your preferences
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: isMobile ? 'center' : 'space-between',
          gap: isMobile ? 1 : 0,
          mt: 3 
        }}>
          <Button 
            variant="outlined" 
            color="error" 
            startIcon={<CloseIcon />}
            fullWidth={isMobile}
            size={isMobile ? "small" : "medium"}
          >
            Skip
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            startIcon={<FavoriteBorderIcon />}
            fullWidth={isMobile}
            size={isMobile ? "small" : "medium"}
            sx={{ mt: isMobile ? 1 : 0 }}
          >
            Like
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<ChatIcon />}
            fullWidth={isMobile}
            size={isMobile ? "small" : "medium"}
            sx={{ mt: isMobile ? 1 : 0 }}
          >
            Message
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MatchCard;
