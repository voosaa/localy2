import React, { useState, useRef } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Chip, 
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
  LinearProgress,
  Tooltip
} from '@mui/material';
import { 
  Favorite as FavoriteIcon, 
  Close as CloseIcon,
  Info as InfoIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  AttachMoney as MoneyIcon,
  ThumbUp as ThumbUpIcon
} from '@mui/icons-material';
import { motion, useMotionValue, useTransform } from 'framer-motion';

function SwipeableCard({ dateIdea, onSwipeLeft, onSwipeRight, onInfoClick, matchScore = 0, matchReason = '' }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [exitX, setExitX] = useState(0);
  const [showControls, setShowControls] = useState(true);
  
  // Motion values for the card
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  // Indicators for like/dislike based on swipe direction
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const dislikeOpacity = useTransform(x, [-100, 0], [1, 0]);
  
  // Handle drag end
  const handleDragEnd = (_, info) => {
    if (info.offset.x > 100) {
      setExitX(200);
      setShowControls(false);
      onSwipeRight(dateIdea);
    } else if (info.offset.x < -100) {
      setExitX(-200);
      setShowControls(false);
      onSwipeLeft(dateIdea);
    }
  };
  
  // Handle button clicks
  const handleLikeClick = () => {
    setExitX(200);
    setShowControls(false);
    onSwipeRight(dateIdea);
  };
  
  const handleDislikeClick = () => {
    setExitX(-200);
    setShowControls(false);
    onSwipeLeft(dateIdea);
  };
  
  // Format price level
  const formatPriceLevel = (level) => {
    return Array(level).fill('$').join('');
  };

  // Get match score color
  const getMatchScoreColor = (score) => {
    if (score >= 80) return theme.palette.success.main;
    if (score >= 60) return theme.palette.info.main;
    if (score >= 40) return theme.palette.warning.main;
    return theme.palette.error.main;
  };
  
  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: 600, mx: 'auto' }}>
      <motion.div
        style={{ 
          x,
          rotate,
          opacity,
          position: 'relative',
          width: '100%',
          height: '100%'
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={{ x: exitX }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Card 
          sx={{ 
            borderRadius: 4,
            boxShadow: 3,
            overflow: 'hidden',
            position: 'relative',
            height: isMobile ? 500 : 600,
            cursor: 'grab',
            '&:active': {
              cursor: 'grabbing'
            }
          }}
        >
          <CardMedia
            component="img"
            height={isMobile ? 250 : 300}
            image={dateIdea.image}
            alt={dateIdea.title}
          />
          
          {/* Match score badge */}
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 16, 
              left: 16, 
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 2,
              p: 0.75,
              boxShadow: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            <ThumbUpIcon sx={{ color: getMatchScoreColor(matchScore), fontSize: 18 }} />
            <Typography 
              variant="subtitle2" 
              fontWeight="bold"
              sx={{ color: getMatchScoreColor(matchScore) }}
            >
              {matchScore}% Match
            </Typography>
          </Box>
          
          {/* Like indicator overlay */}
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 20, 
              right: 20, 
              bgcolor: 'success.main',
              color: 'white',
              borderRadius: 2,
              p: 1,
              border: '3px solid white',
              transform: 'rotate(15deg)',
              zIndex: 2
            }}
            style={{ opacity: likeOpacity }}
          >
            <Typography variant="h6" fontWeight="bold">
              LIKE
            </Typography>
          </Box>
          
          {/* Dislike indicator overlay */}
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 20, 
              left: 20, 
              bgcolor: 'error.main',
              color: 'white',
              borderRadius: 2,
              p: 1,
              border: '3px solid white',
              transform: 'rotate(-15deg)',
              zIndex: 2
            }}
            style={{ opacity: dislikeOpacity }}
          >
            <Typography variant="h6" fontWeight="bold">
              NOPE
            </Typography>
          </Box>
          
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Typography variant="h5" component="h2" fontWeight="bold">
                {dateIdea.title}
              </Typography>
              <IconButton 
                size="small" 
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  onInfoClick(dateIdea);
                }}
              >
                <InfoIcon />
              </IconButton>
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              <Chip 
                icon={<LocationIcon fontSize="small" />} 
                label={dateIdea.location || 'Flexible'} 
                size="small" 
                color="primary" 
                variant="outlined"
              />
              <Chip 
                icon={<TimeIcon fontSize="small" />} 
                label={dateIdea.duration || 'Flexible'} 
                size="small" 
                variant="outlined"
              />
              <Chip 
                icon={<MoneyIcon fontSize="small" />} 
                label={formatPriceLevel(dateIdea.priceLevel) || '$'} 
                size="small" 
                variant="outlined"
              />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" paragraph>
                {dateIdea.description}
              </Typography>
            </Box>
            
            {matchReason && (
              <Box 
                sx={{ 
                  mb: 2, 
                  p: 1.5, 
                  bgcolor: 'rgba(98, 0, 238, 0.05)', 
                  borderRadius: 2,
                  border: '1px solid rgba(98, 0, 238, 0.1)'
                }}
              >
                <Typography variant="subtitle2" color="primary" fontWeight="bold" gutterBottom>
                  Why we think you'll like this:
                </Typography>
                <Typography variant="body2">
                  {matchReason}
                </Typography>
              </Box>
            )}
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {dateIdea.categories && dateIdea.categories.map((category, index) => (
                <Chip 
                  key={index}
                  label={category} 
                  size="small" 
                  color="secondary"
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      </motion.div>
      
      {showControls && (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 2, 
            mt: 2 
          }}
        >
          <IconButton 
            color="error" 
            sx={{ 
              bgcolor: 'white', 
              boxShadow: 2,
              p: 2
            }}
            onClick={handleDislikeClick}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
          
          <IconButton 
            color="success" 
            sx={{ 
              bgcolor: 'white', 
              boxShadow: 2,
              p: 2
            }}
            onClick={handleLikeClick}
          >
            <FavoriteIcon fontSize="large" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}

export default SwipeableCard;
