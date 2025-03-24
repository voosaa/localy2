import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Divider,
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Check as CheckIcon,
  Close as CloseIcon
} from '@mui/icons-material';

function DatePlanCard({ datePlan, onAccept, onDecline, isProposal = false }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        mb: 2, 
        borderRadius: 2,
        borderColor: isProposal ? theme.palette.primary.main : theme.palette.divider,
        borderWidth: isProposal ? 2 : 1
      }}
    >
      {isProposal && (
        <Box sx={{ 
          bgcolor: 'primary.main', 
          color: 'primary.contrastText',
          py: 0.5,
          px: 2
        }}>
          <Typography variant="subtitle2">
            Date Proposal
          </Typography>
        </Box>
      )}
      
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <CardMedia
              component="img"
              height={120}
              image={datePlan.location.image}
              alt={datePlan.location.name}
              sx={{ borderRadius: 1 }}
            />
          </Grid>
          
          <Grid item xs={12} sm={8}>
            <Typography variant="h6" gutterBottom>
              {datePlan.dateIdea.title}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
              <Typography variant="body2">
                {datePlan.location.name} - {datePlan.location.address}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CalendarIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
              <Typography variant="body2">
                {datePlan.date}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TimeIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
              <Typography variant="body2">
                {datePlan.time}
              </Typography>
            </Box>
            
            {datePlan.notes && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {datePlan.notes}
              </Typography>
            )}
          </Grid>
        </Grid>
        
        {datePlan.status && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Chip 
                label={datePlan.status} 
                color={
                  datePlan.status === 'Confirmed' ? 'success' : 
                  datePlan.status === 'Pending' ? 'warning' : 
                  datePlan.status === 'Declined' ? 'error' : 
                  'default'
                }
                size="small"
              />
            </Box>
          </>
        )}
        
        {isProposal && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
            <Button 
              variant="outlined" 
              color="error" 
              size="small" 
              startIcon={<CloseIcon />}
              onClick={onDecline}
            >
              Decline
            </Button>
            <Button 
              variant="contained" 
              color="success" 
              size="small"
              startIcon={<CheckIcon />}
              onClick={onAccept}
            >
              Accept
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default DatePlanCard;
