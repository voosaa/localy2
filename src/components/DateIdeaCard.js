import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
  Avatar,
  MobileStepper,
  Paper,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Place as PlaceIcon,
  AccessTime as AccessTimeIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  LocalOffer as TagIcon,
  Share as ShareIcon,
  PersonAdd as PersonAddIcon,
  Public as PublicIcon,
  Lock as LockIcon,
} from '@mui/icons-material';

function DateIdeaCard({ dateIdea, compact = false }) {
  const [isFavorite, setIsFavorite] = useState(dateIdea.isFavorite || false);
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Handle multiple images or fallback to single image
  const images = dateIdea.images || [dateIdea.image || dateIdea.imageUrl || 'https://source.unsplash.com/random/400x300/?date'];
  const maxSteps = images.length;

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = (e) => {
    e.stopPropagation();
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  if (compact) {
    return (
      <Card sx={{ 
        width: '100%', 
        maxWidth: { xs: '100%', sm: 220 },
        borderRadius: 3,
        boxShadow: 2,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        },
        cursor: 'pointer',
      }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height={isMobile ? 100 : 120}
            image={images[0]}
            alt={dateIdea.title}
            sx={{ objectFit: 'cover' }}
          />
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
            }}
            onClick={handleFavoriteToggle}
            size="small"
          >
            {isFavorite ? (
              <FavoriteIcon fontSize="small" color="error" />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </IconButton>
          
          {dateIdea.isPublic === false && (
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                borderRadius: '4px',
                px: 0.5,
                py: 0.25,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <LockIcon fontSize="small" sx={{ color: 'white', fontSize: 14 }} />
              <Typography variant="caption" sx={{ color: 'white', ml: 0.5 }}>
                Private
              </Typography>
            </Box>
          )}
        </Box>
        <CardContent sx={{ p: 1.5 }}>
          <Typography variant="subtitle1" fontWeight="bold" noWrap>
            {dateIdea.title}
          </Typography>
          <Box sx={{ display: 'flex', mt: 1, gap: 0.5, flexWrap: 'wrap' }}>
            <Chip 
              label={dateIdea.category} 
              size="small" 
              sx={{ borderRadius: 1, height: 24 }}
            />
            <Chip 
              label={dateIdea.setting} 
              size="small" 
              variant="outlined"
              sx={{ borderRadius: 1, height: 24 }}
            />
          </Box>
          
          {dateIdea.tags && dateIdea.tags.length > 0 && (
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
              <TagIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5, fontSize: 14 }} />
              <Typography variant="caption" color="text.secondary" noWrap>
                {dateIdea.tags.slice(0, 2).join(', ')}
                {dateIdea.tags.length > 2 && ` +${dateIdea.tags.length - 2} more`}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ 
      borderRadius: 3,
      boxShadow: 2,
      overflow: 'hidden',
      mb: 2,
      width: '100%',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 4,
      },
    }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height={isMobile ? 150 : 200}
          image={images[activeStep]}
          alt={dateIdea.title}
          sx={{ objectFit: 'cover' }}
        />
        
        {maxSteps > 1 && (
          <>
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '12px',
                px: 1,
                py: 0.25,
              }}
            >
              <Typography variant="caption" sx={{ color: 'white' }}>
                {activeStep + 1}/{maxSteps}
              </Typography>
            </Box>
            
            <IconButton
              sx={{
                position: 'absolute',
                top: '50%',
                left: 8,
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
                display: isMobile ? 'none' : 'flex',
              }}
              onClick={handleBack}
              size="small"
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            
            <IconButton
              sx={{
                position: 'absolute',
                top: '50%',
                right: 8,
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
                display: isMobile ? 'none' : 'flex',
              }}
              onClick={handleNext}
              size="small"
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </>
        )}
        
        <Box
          sx={{
            position: 'absolute',
            top: isMobile ? 8 : 16,
            right: isMobile ? 8 : 16,
            display: 'flex',
            gap: 1,
          }}
        >
          <IconButton
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
            }}
            onClick={handleFavoriteToggle}
            size={isMobile ? "small" : "medium"}
          >
            {isFavorite ? (
              <FavoriteIcon color="error" fontSize={isMobile ? "small" : "medium"} />
            ) : (
              <FavoriteBorderIcon fontSize={isMobile ? "small" : "medium"} />
            )}
          </IconButton>
          
          <Tooltip title="Share this date idea">
            <IconButton
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
              }}
              size={isMobile ? "small" : "medium"}
              onClick={(e) => e.stopPropagation()}
            >
              <ShareIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          </Tooltip>
        </Box>
        
        {dateIdea.isPublic === false && (
          <Box
            sx={{
              position: 'absolute',
              top: isMobile ? 8 : 16,
              left: isMobile ? 8 : 16,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              borderRadius: '4px',
              px: 1,
              py: 0.5,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <LockIcon fontSize="small" sx={{ color: 'white' }} />
            <Typography variant="caption" sx={{ color: 'white', ml: 0.5 }}>
              Private
            </Typography>
          </Box>
        )}
      </Box>
      
      {maxSteps > 1 && isMobile && (
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{ 
            backgroundColor: 'transparent',
            padding: 0,
            margin: 0,
            '& .MuiMobileStepper-dot': {
              margin: '0 2px',
            },
          }}
          nextButton={null}
          backButton={null}
        />
      )}
      
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold" gutterBottom>
          {dateIdea.title}
        </Typography>
        
        <Box sx={{ display: 'flex', mb: 2, gap: 1, flexWrap: 'wrap' }}>
          <Chip 
            label={dateIdea.category} 
            size={isMobile ? "small" : "medium"}
            sx={{ borderRadius: 1 }}
          />
          <Chip 
            label={dateIdea.setting} 
            variant="outlined"
            size={isMobile ? "small" : "medium"}
            sx={{ borderRadius: 1 }}
          />
          {dateIdea.budget && (
            <Chip 
              label={dateIdea.budget} 
              variant="outlined"
              size={isMobile ? "small" : "medium"}
              sx={{ borderRadius: 1 }}
            />
          )}
          
          {dateIdea.priceLevel && (
            <Chip 
              label={'$'.repeat(dateIdea.priceLevel)} 
              variant="outlined"
              size={isMobile ? "small" : "medium"}
              sx={{ borderRadius: 1 }}
            />
          )}
        </Box>

        {dateIdea.tags && dateIdea.tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {dateIdea.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
                sx={{ 
                  borderRadius: 1, 
                  bgcolor: 'rgba(0, 0, 0, 0.04)',
                  '& .MuiChip-label': {
                    px: 1,
                  }
                }}
                icon={<TagIcon style={{ fontSize: 14 }} />}
              />
            ))}
          </Box>
        )}

        {(dateIdea.location || dateIdea.time) && (
          <Box sx={{ 
            display: 'flex', 
            mb: 2, 
            gap: 2,
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
          }}>
            {dateIdea.location && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <PlaceIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {dateIdea.location}
                </Typography>
              </Box>
            )}
            {dateIdea.time && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 0.5,
                mt: isMobile && dateIdea.location ? 1 : 0,
              }}>
                <AccessTimeIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {dateIdea.time}
                </Typography>
              </Box>
            )}
          </Box>
        )}
        
        <Typography variant="body1" paragraph>
          {dateIdea.description}
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: isMobile ? 'flex-start' : 'space-between',
          alignItems: isMobile ? 'stretch' : 'center',
          gap: isMobile ? 2 : 0,
          mt: 2 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <Typography 
                  variant="caption" 
                  sx={{ 
                    bgcolor: theme.palette.primary.main, 
                    color: 'white',
                    borderRadius: '50%',
                    width: 16,
                    height: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                  }}
                >
                  {dateIdea.matchCount > 99 ? '99+' : dateIdea.matchCount}
                </Typography>
              }
            >
              <Avatar 
                sx={{ 
                  bgcolor: theme.palette.primary.light,
                  width: 32,
                  height: 32,
                }}
              >
                <PersonAddIcon sx={{ fontSize: 16 }} />
              </Avatar>
            </Badge>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {dateIdea.matchCount || 0} people interested
            </Typography>
          </Box>
          
          <Button 
            variant="contained" 
            size={isMobile ? "small" : "medium"}
            onClick={(e) => e.stopPropagation()}
            sx={{ minWidth: isMobile ? '100%' : 'auto' }}
          >
            I'm Interested
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default DateIdeaCard;
