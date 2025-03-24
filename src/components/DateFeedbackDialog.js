import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Rating,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  SentimentVerySatisfied as HappyIcon,
  SentimentDissatisfied as SadIcon
} from '@mui/icons-material';

const feedbackTags = [
  'Great conversation',
  'Fun activity',
  'Good location',
  'On time',
  'Respectful',
  'Genuine',
  'Interesting',
  'Good listener',
  'Funny',
  'Awkward',
  'Late',
  'Different from profile',
  'Too short',
  'Too long'
];

function DateFeedbackDialog({ open, onClose, dateIdea, matchProfile }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [overallRating, setOverallRating] = useState(0);
  const [dateIdeaRating, setDateIdeaRating] = useState(0);
  const [matchRating, setMatchRating] = useState(0);
  const [followUp, setFollowUp] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [feedback, setFeedback] = useState('');

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {
    // In a real app, this would send feedback data to a backend
    const feedbackData = {
      dateIdeaId: dateIdea.id,
      matchProfileId: matchProfile.id,
      overallRating,
      dateIdeaRating,
      matchRating,
      followUp,
      tags: selectedTags,
      feedback
    };
    
    console.log('Feedback submitted:', feedbackData);
    
    // Reset form and close dialog
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setOverallRating(0);
    setDateIdeaRating(0);
    setMatchRating(0);
    setFollowUp('');
    setSelectedTags([]);
    setFeedback('');
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="md"
      fullScreen={isMobile}
    >
      <DialogTitle>
        <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold">
          How was your date?
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Date Idea: {dateIdea?.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            With: {matchProfile?.name}
          </Typography>
          
          <Box sx={{ my: 3 }}>
            <Typography variant="h6" gutterBottom>
              Overall Experience
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating
                name="overall-rating"
                value={overallRating}
                onChange={(event, newValue) => {
                  setOverallRating(newValue);
                }}
                precision={0.5}
                size={isMobile ? "medium" : "large"}
                icon={<FavoriteIcon fontSize="inherit" color="error" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {overallRating > 0 ? `${overallRating}/5` : 'Rate your overall experience'}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ my: 3 }}>
            <Typography variant="h6" gutterBottom>
              How was the date idea?
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating
                name="date-idea-rating"
                value={dateIdeaRating}
                onChange={(event, newValue) => {
                  setDateIdeaRating(newValue);
                }}
                precision={0.5}
                size={isMobile ? "medium" : "large"}
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {dateIdeaRating > 0 ? `${dateIdeaRating}/5` : 'Rate the date idea'}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ my: 3 }}>
            <Typography variant="h6" gutterBottom>
              How was your match?
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating
                name="match-rating"
                value={matchRating}
                onChange={(event, newValue) => {
                  setMatchRating(newValue);
                }}
                precision={0.5}
                size={isMobile ? "medium" : "large"}
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {matchRating > 0 ? `${matchRating}/5` : 'Rate your match'}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ my: 3 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                <Typography variant="h6">
                  Would you like to go on another date with this person?
                </Typography>
              </FormLabel>
              <RadioGroup
                row
                name="follow-up"
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
              >
                <FormControlLabel 
                  value="yes" 
                  control={<Radio color="success" />} 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <HappyIcon color="success" sx={{ mr: 0.5 }} />
                      <Typography>Yes, definitely!</Typography>
                    </Box>
                  } 
                />
                <FormControlLabel 
                  value="no" 
                  control={<Radio color="error" />} 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <SadIcon color="error" sx={{ mr: 0.5 }} />
                      <Typography>No, thanks</Typography>
                    </Box>
                  } 
                />
                <FormControlLabel 
                  value="maybe" 
                  control={<Radio />} 
                  label="Maybe / Not sure" 
                />
              </RadioGroup>
            </FormControl>
          </Box>
          
          <Box sx={{ my: 3 }}>
            <Typography variant="h6" gutterBottom>
              What went well? (Select all that apply)
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {feedbackTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onClick={() => handleTagToggle(tag)}
                  color={selectedTags.includes(tag) ? "primary" : "default"}
                  variant={selectedTags.includes(tag) ? "filled" : "outlined"}
                  sx={{ m: 0.5 }}
                />
              ))}
            </Box>
          </Box>
          
          <Box sx={{ my: 3 }}>
            <Typography variant="h6" gutterBottom>
              Additional Feedback (Optional)
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Share more details about your experience..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              size={isMobile ? "small" : "medium"}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Your feedback is anonymous and helps us improve our matching algorithm.
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={overallRating === 0 || dateIdeaRating === 0 || matchRating === 0 || followUp === ''}
        >
          Submit Feedback
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DateFeedbackDialog;
