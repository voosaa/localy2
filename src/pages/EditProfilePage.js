import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Grid,
  Chip,
  Avatar,
  Divider,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  PhotoCamera as PhotoCameraIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import SocialMediaConnect from '../components/SocialMediaConnect';

// Mock data for the current user's profile
const userProfile = {
  id: 'me',
  name: 'Alex Morgan',
  age: 30,
  location: 'Westside, 0 miles away',
  bio: 'Tech enthusiast, amateur chef, and fitness junkie. Looking to connect with like-minded locals.',
  images: [
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&auto=format',
  ],
  verified: true,
  interests: ['Technology', 'Cooking', 'Fitness', 'Reading', 'Movies', 'Hiking'],
  prompts: [
    {
      question: 'Favorite local spot',
      answer: 'The tech hub downtown. Great place to work remotely and meet other professionals.',
    },
    {
      question: 'Best weekend activity',
      answer: 'Farmers market on Saturday mornings followed by a hike in the afternoon.',
    },
    {
      question: 'Go-to restaurant recommendation',
      answer: 'The fusion taco place on 5th Street. Their Korean BBQ tacos are amazing!',
    },
  ],
  aboutMe: 'Software developer by day, amateur chef by night. I\'ve lived in this city my whole life and love showing people around. Big fan of outdoor activities and always looking for new hiking buddies. I also host a monthly tech meetup for locals interested in AI and machine learning.',
  socialMedia: {
    instagram: '@alexmorgantech',
    twitter: '@alexmorgan',
    linkedin: 'alexmorgan',
  },
};

// Available prompt questions
const availablePromptQuestions = [
  'Favorite local spot',
  'Best weekend activity',
  'Go-to restaurant recommendation',
  'Hidden gem in the city',
  'Favorite local event',
  'Best place for a first date',
  'Most underrated place in town',
  'Best place to relax',
  'Favorite outdoor activity',
  'Best local coffee shop',
];

// Available interests
const availableInterests = [
  'Technology', 'Cooking', 'Fitness', 'Reading', 'Movies', 'Hiking',
  'Music', 'Art', 'Photography', 'Travel', 'Food', 'Coffee',
  'Yoga', 'Running', 'Cycling', 'Gaming', 'Dancing', 'Writing',
  'Fashion', 'Design', 'Entrepreneurship', 'Volunteering', 'Languages', 'Science',
];

function EditProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(userProfile);
  const [newInterest, setNewInterest] = useState('');
  const [openInterestDialog, setOpenInterestDialog] = useState(false);
  const [openPromptDialog, setOpenPromptDialog] = useState(false);
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(null);
  const [newPrompt, setNewPrompt] = useState({ question: '', answer: '' });

  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSocialMediaChange = (platform, value) => {
    setProfile({
      ...profile,
      socialMedia: { ...profile.socialMedia, [platform]: value },
    });
  };

  const handleAddInterest = (interest) => {
    if (!profile.interests.includes(interest) && interest.trim() !== '') {
      setProfile({
        ...profile,
        interests: [...profile.interests, interest],
      });
    }
    setOpenInterestDialog(false);
  };

  const handleRemoveInterest = (interestToRemove) => {
    setProfile({
      ...profile,
      interests: profile.interests.filter(interest => interest !== interestToRemove),
    });
  };

  const handleOpenPromptDialog = (index) => {
    if (index !== undefined) {
      setSelectedPromptIndex(index);
      setNewPrompt(profile.prompts[index]);
    } else {
      setSelectedPromptIndex(null);
      setNewPrompt({ question: '', answer: '' });
    }
    setOpenPromptDialog(true);
  };

  const handlePromptChange = (field, value) => {
    setNewPrompt({ ...newPrompt, [field]: value });
  };

  const handleSavePrompt = () => {
    if (newPrompt.question && newPrompt.answer) {
      let updatedPrompts;
      if (selectedPromptIndex !== null) {
        // Edit existing prompt
        updatedPrompts = [...profile.prompts];
        updatedPrompts[selectedPromptIndex] = newPrompt;
      } else {
        // Add new prompt
        updatedPrompts = [...profile.prompts, newPrompt];
      }
      setProfile({ ...profile, prompts: updatedPrompts });
      setOpenPromptDialog(false);
    }
  };

  const handleDeletePrompt = (index) => {
    const updatedPrompts = [...profile.prompts];
    updatedPrompts.splice(index, 1);
    setProfile({ ...profile, prompts: updatedPrompts });
  };

  const handleSaveProfile = () => {
    // In a real app, this would save the profile to a database
    console.log('Saving profile:', profile);
    // Navigate back to the profile page
    navigate('/profile/me');
  };

  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton component={Link} to="/profile/me" sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="h1" fontWeight="bold">
          Edit Profile
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {/* Profile Images */}
          <Card sx={{ borderRadius: 3, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom>
                Profile Photos
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Add up to 6 photos to showcase yourself. The first photo will be your main profile picture.
              </Typography>
              
              <Grid container spacing={2}>
                {profile.images.map((image, index) => (
                  <Grid item xs={4} sm={4} key={index}>
                    <Box sx={{ position: 'relative' }}>
                      <Avatar
                        src={image}
                        variant="rounded"
                        sx={{ 
                          width: '100%', 
                          height: 150, 
                          borderRadius: 2,
                        }}
                      />
                      <IconButton
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                      {index === 0 && (
                        <Chip
                          label="Main"
                          size="small"
                          color="primary"
                          sx={{
                            position: 'absolute',
                            bottom: 8,
                            left: 8,
                          }}
                        />
                      )}
                    </Box>
                  </Grid>
                ))}
                {profile.images.length < 6 && (
                  <Grid item xs={4} sm={4}>
                    <Box
                      sx={{
                        width: '100%',
                        height: 150,
                        borderRadius: 2,
                        border: '2px dashed #ccc',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <IconButton color="primary">
                        <PhotoCameraIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card sx={{ borderRadius: 3, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom>
                Basic Information
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={profile.name}
                    onChange={handleBasicInfoChange}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Age"
                    name="age"
                    type="number"
                    value={profile.age}
                    onChange={handleBasicInfoChange}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    value={profile.bio}
                    onChange={handleBasicInfoChange}
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={2}
                    helperText="Brief introduction (max 150 characters)"
                    inputProps={{ maxLength: 150 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="About Me"
                    name="aboutMe"
                    value={profile.aboutMe}
                    onChange={handleBasicInfoChange}
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={4}
                    helperText="Tell others more about yourself"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Social Media Connect */}
          <SocialMediaConnect />

          {/* Interests */}
          <Card sx={{ borderRadius: 3, mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="h2" fontWeight="bold">
                  Interests
                </Typography>
                <Button 
                  variant="outlined" 
                  startIcon={<AddIcon />}
                  onClick={() => setOpenInterestDialog(true)}
                  size="small"
                >
                  Add
                </Button>
              </Box>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                Select interests to help you connect with like-minded people
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {profile.interests.map((interest) => (
                  <Chip 
                    key={interest} 
                    label={interest} 
                    onDelete={() => handleRemoveInterest(interest)}
                    variant="outlined"
                    sx={{ borderRadius: 2 }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Profile Prompts */}
          <Card sx={{ borderRadius: 3, mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="h2" fontWeight="bold">
                  Profile Prompts
                </Typography>
                {profile.prompts.length < 3 && (
                  <Button 
                    variant="outlined" 
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenPromptDialog()}
                    size="small"
                  >
                    Add
                  </Button>
                )}
              </Box>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                Add prompts to showcase your personality and start conversations
              </Typography>
              
              {profile.prompts.map((prompt, index) => (
                <Box key={index} sx={{ mb: index < profile.prompts.length - 1 ? 3 : 0 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                        {prompt.question}
                      </Typography>
                      <Typography variant="body1">
                        {prompt.answer}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton size="small" onClick={() => handleOpenPromptDialog(index)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeletePrompt(index)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  {index < profile.prompts.length - 1 && <Divider sx={{ mt: 3 }} />}
                </Box>
              ))}
              
              {profile.prompts.length === 0 && (
                <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
                  No prompts added yet. Add a prompt to make your profile more engaging.
                </Typography>
              )}
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card sx={{ borderRadius: 3, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom>
                Social Media
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Connect your social media accounts to enhance your profile
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Instagram"
                    value={profile.socialMedia.instagram || ''}
                    onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <InstagramIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Twitter"
                    value={profile.socialMedia.twitter || ''}
                    onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TwitterIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="LinkedIn"
                    value={profile.socialMedia.linkedin || ''}
                    onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LinkedInIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Button 
              variant="outlined" 
              component={Link} 
              to="/profile/me"
              sx={{ borderRadius: 2 }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSaveProfile}
              sx={{ borderRadius: 2 }}
            >
              Save Profile
            </Button>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          {/* Verification Status */}
          <Card sx={{ borderRadius: 3, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                Verification Status
              </Typography>
              
              {profile.verified ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mr: 2,
                    }}
                  >
                    <Typography variant="body1" color="white">✓</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="medium">
                      Verified Profile
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Your profile has been verified
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                    Not Verified
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Get verified to build trust with other users
                  </Typography>
                  <Button 
                    variant="contained" 
                    fullWidth
                    sx={{ borderRadius: 2 }}
                  >
                    Get Verified
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
          
          {/* Profile Visibility */}
          <Card sx={{ borderRadius: 3, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                Profile Visibility
              </Typography>
              
              <FormControl fullWidth margin="normal">
                <InputLabel>Who can see your profile</InputLabel>
                <Select
                  value="everyone"
                  label="Who can see your profile"
                >
                  <MenuItem value="everyone">Everyone</MenuItem>
                  <MenuItem value="verified">Verified Users Only</MenuItem>
                  <MenuItem value="matches">Matches Only</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth margin="normal">
                <InputLabel>Show distance</InputLabel>
                <Select
                  value="exact"
                  label="Show distance"
                >
                  <MenuItem value="exact">Exact Distance</MenuItem>
                  <MenuItem value="approximate">Approximate Distance</MenuItem>
                  <MenuItem value="hidden">Hidden</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
          
          {/* Profile Tips */}
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                Profile Tips
              </Typography>
              
              <Typography variant="body2" paragraph>
                • Add at least 3 photos to increase your visibility
              </Typography>
              <Typography variant="body2" paragraph>
                • Complete all profile prompts to showcase your personality
              </Typography>
              <Typography variant="body2" paragraph>
                • Verify your profile to build trust with other users
              </Typography>
              <Typography variant="body2">
                • Keep your interests updated to match with like-minded people
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Interest Dialog */}
      <Dialog open={openInterestDialog} onClose={() => setOpenInterestDialog(false)}>
        <DialogTitle>Add Interests</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" paragraph>
            Select interests to add to your profile
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {availableInterests
              .filter(interest => !profile.interests.includes(interest))
              .map((interest) => (
                <Chip 
                  key={interest} 
                  label={interest} 
                  onClick={() => handleAddInterest(interest)}
                  clickable
                  variant="outlined"
                  sx={{ borderRadius: 2 }}
                />
              ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenInterestDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Prompt Dialog */}
      <Dialog open={openPromptDialog} onClose={() => setOpenPromptDialog(false)}>
        <DialogTitle>{selectedPromptIndex !== null ? 'Edit Prompt' : 'Add Prompt'}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Question</InputLabel>
            <Select
              value={newPrompt.question}
              label="Question"
              onChange={(e) => handlePromptChange('question', e.target.value)}
            >
              {availablePromptQuestions.map((question) => (
                <MenuItem key={question} value={question}>
                  {question}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Your Answer"
            value={newPrompt.answer}
            onChange={(e) => handlePromptChange('answer', e.target.value)}
            margin="normal"
            variant="outlined"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPromptDialog(false)}>Cancel</Button>
          <Button onClick={handleSavePrompt} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default EditProfilePage;
