import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Divider,
  useMediaQuery,
  useTheme,
  Chip,
  IconButton,
  Avatar,
  Paper,
  Tooltip,
  FormHelperText,
  Autocomplete,
  Slider,
  Switch,
  FormControlLabel,
  Card,
  CardMedia,
} from '@mui/material';
import { 
  Add as AddIcon,
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  LocalOffer as TagIcon,
  Image as ImageIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  AttachMoney as MoneyIcon,
  Category as CategoryIcon,
  Public as PublicIcon,
} from '@mui/icons-material';
import DateIdeaCard from '../components/DateIdeaCard';
import { 
  dateIdeas, 
  dateIdeaCategories, 
  dateIdeaSettings, 
  dateIdeaBudgets 
} from '../data/mockData';

// Common tags for date ideas
const commonTags = [
  'Romantic', 'Adventure', 'Budget-friendly', 'Outdoors', 'Indoors', 
  'Food', 'Art', 'Music', 'Sports', 'Cultural', 'Educational', 'Relaxing',
  'Exciting', 'Unique', 'Popular', 'Hidden Gem', 'First Date', 'Anniversary',
  'Group Date', 'Weekend', 'Weekday', 'Morning', 'Evening', 'Seasonal'
];

function DateIdeasPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [filteredIdeas, setFilteredIdeas] = useState(dateIdeas);
  const [selectedCategory, setSelectedCategory] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const fileInputRef = useRef(null);
  
  // New date idea form state
  const [newDateIdea, setNewDateIdea] = useState({
    title: '',
    description: '',
    category: '',
    setting: '',
    budget: '',
    location: '',
    time: '',
    tags: [],
    images: [],
    isPublic: true,
    priceLevel: 2, // 1-5 scale
  });

  // Form validation
  const [formErrors, setFormErrors] = useState({});

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    
    if (newValue === 0) {
      setFilteredIdeas(dateIdeas);
    } else if (newValue === 1) {
      // My date ideas (created by me)
      setFilteredIdeas(dateIdeas.filter(idea => idea.createdBy === 'me'));
    } else if (newValue === 2) {
      // Favorites
      setFilteredIdeas(dateIdeas.filter(idea => idea.isFavorite));
    }
  };

  const handleCategoryFilter = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    
    if (category === '') {
      setFilteredIdeas(dateIdeas);
    } else {
      setFilteredIdeas(dateIdeas.filter(idea => idea.category === category));
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  const resetForm = () => {
    setNewDateIdea({
      title: '',
      description: '',
      category: '',
      setting: '',
      budget: '',
      location: '',
      time: '',
      tags: [],
      images: [],
      isPublic: true,
      priceLevel: 2,
    });
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDateIdea({
      ...newDateIdea,
      [name]: value,
    });
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const handleTagsChange = (event, newTags) => {
    setNewDateIdea({
      ...newDateIdea,
      tags: newTags
    });
  };

  const handlePriceLevelChange = (event, newValue) => {
    setNewDateIdea({
      ...newDateIdea,
      priceLevel: newValue
    });
  };

  const handlePublicToggle = (event) => {
    setNewDateIdea({
      ...newDateIdea,
      isPublic: event.target.checked
    });
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    
    // Process each file to create image previews
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }));
    
    setNewDateIdea({
      ...newDateIdea,
      images: [...newDateIdea.images, ...newImages]
    });
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedImages = newDateIdea.images.filter((_, index) => index !== indexToRemove);
    setNewDateIdea({
      ...newDateIdea,
      images: updatedImages
    });
  };

  const validateForm = () => {
    const errors = {};
    
    if (!newDateIdea.title.trim()) {
      errors.title = "Title is required";
    }
    
    if (!newDateIdea.description.trim()) {
      errors.description = "Description is required";
    }
    
    if (!newDateIdea.category) {
      errors.category = "Category is required";
    }
    
    if (!newDateIdea.setting) {
      errors.setting = "Setting is required";
    }
    
    if (!newDateIdea.budget) {
      errors.budget = "Budget is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    
    // In a real app, this would send data to a backend
    console.log('New date idea:', newDateIdea);
    
    // Mock adding the new date idea to the list
    const newId = dateIdeas.length + 1;
    const newIdeaWithId = {
      ...newDateIdea,
      id: newId,
      createdBy: 'me',
      createdAt: new Date(),
      likes: 0,
      isFavorite: false,
      imageUrl: newDateIdea.images.length > 0 ? newDateIdea.images[0].preview : 'https://source.unsplash.com/random/400x300/?date',
    };
    
    // In a real app, we would update the state with the new date idea
    console.log('Added new date idea:', newIdeaWithId);
    
    // Close the dialog
    setOpenDialog(false);
    resetForm();
    
    // Show success message
    alert('Date idea created successfully!');
  };

  const priceLevelMarks = [
    { value: 1, label: '$' },
    { value: 2, label: '$$' },
    { value: 3, label: '$$$' },
    { value: 4, label: '$$$$' },
    { value: 5, label: '$$$$$' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', 
        alignItems: isMobile ? 'flex-start' : 'center', 
        mb: { xs: 2, sm: 4 },
        gap: isMobile ? 2 : 0
      }}>
        <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
          Date Ideas
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          size={isMobile ? "small" : "medium"}
          fullWidth={isMobile}
        >
          Create New
        </Button>
      </Box>

      <Box sx={{ mb: { xs: 2, sm: 4 } }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          sx={{ mb: 2 }}
          variant={isMobile ? "fullWidth" : "standard"}
        >
          <Tab label="All Ideas" />
          <Tab label="My Ideas" />
          <Tab label="Favorites" />
        </Tabs>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center', 
          mb: { xs: 2, sm: 3 },
          gap: isMobile ? 1 : 0
        }}>
          <Typography variant="body1" sx={{ mr: isMobile ? 0 : 2, mb: isMobile ? 1 : 0 }}>
            Filter by:
          </Typography>
          <FormControl 
            size="small" 
            sx={{ 
              minWidth: isMobile ? '100%' : 200,
              maxWidth: isMobile ? '100%' : 'auto'
            }}
          >
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={handleCategoryFilter}
            >
              <MenuItem value="">All Categories</MenuItem>
              {dateIdeaCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Grid container spacing={isMobile ? 2 : 3}>
        {filteredIdeas.map((dateIdea) => (
          <Grid item xs={12} sm={6} key={dateIdea.id}>
            <DateIdeaCard dateIdea={dateIdea} />
          </Grid>
        ))}
      </Grid>

      {/* Create New Date Idea Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1
        }}>
          <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold">
            Create New Date Idea
          </Typography>
          <IconButton onClick={handleCloseDialog} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <Divider />
        
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {/* Image Upload Section */}
            <Paper 
              variant="outlined" 
              sx={{ 
                p: 2, 
                mb: 3, 
                backgroundColor: theme.palette.background.default,
                borderStyle: 'dashed'
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />
                
                <IconButton 
                  color="primary" 
                  sx={{ mb: 1, p: 2, backgroundColor: theme.palette.action.hover }}
                  onClick={() => fileInputRef.current.click()}
                >
                  <CloudUploadIcon fontSize="large" />
                </IconButton>
                
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  Upload Images
                </Typography>
                
                <Typography variant="body2" color="text.secondary">
                  Add photos to make your date idea more appealing (max 5 images)
                </Typography>
                
                <Button 
                  variant="outlined" 
                  startIcon={<ImageIcon />}
                  onClick={() => fileInputRef.current.click()}
                  sx={{ mt: 2 }}
                  size="small"
                >
                  Choose Files
                </Button>
              </Box>
              
              {newDateIdea.images.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Uploaded Images ({newDateIdea.images.length})
                  </Typography>
                  <Grid container spacing={1}>
                    {newDateIdea.images.map((image, index) => (
                      <Grid item xs={4} sm={3} md={2} key={index}>
                        <Card sx={{ position: 'relative' }}>
                          <CardMedia
                            component="img"
                            height="100"
                            image={image.preview}
                            alt={`Image ${index + 1}`}
                            sx={{ objectFit: 'cover' }}
                          />
                          <IconButton
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 2,
                              right: 2,
                              backgroundColor: 'rgba(0, 0, 0, 0.5)',
                              color: 'white',
                              '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                              },
                              padding: '4px',
                            }}
                            onClick={() => handleRemoveImage(index)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Paper>
            
            {/* Basic Information */}
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Basic Information
            </Typography>
            
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={newDateIdea.title}
              onChange={handleInputChange}
              margin="normal"
              required
              size={isMobile ? "small" : "medium"}
              error={!!formErrors.title}
              helperText={formErrors.title}
              placeholder="E.g., Sunset Picnic at the Park"
            />
            
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={newDateIdea.description}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={isMobile ? 3 : 4}
              required
              size={isMobile ? "small" : "medium"}
              error={!!formErrors.description}
              helperText={formErrors.description}
              placeholder="Describe what makes this date idea special and what people can expect..."
            />
            
            <Box sx={{ mt: 3, mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Categorization
              </Typography>
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FormControl 
                  fullWidth 
                  margin="normal" 
                  size={isMobile ? "small" : "medium"}
                  error={!!formErrors.category}
                >
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={newDateIdea.category}
                    label="Category"
                    onChange={handleInputChange}
                    required
                    startAdornment={
                      <CategoryIcon sx={{ mr: 1, color: 'text.secondary' }} fontSize="small" />
                    }
                  >
                    {dateIdeaCategories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                  {formErrors.category && (
                    <FormHelperText>{formErrors.category}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <FormControl 
                  fullWidth 
                  margin="normal" 
                  size={isMobile ? "small" : "medium"}
                  error={!!formErrors.setting}
                >
                  <InputLabel>Setting</InputLabel>
                  <Select
                    name="setting"
                    value={newDateIdea.setting}
                    label="Setting"
                    onChange={handleInputChange}
                    required
                    startAdornment={
                      <PublicIcon sx={{ mr: 1, color: 'text.secondary' }} fontSize="small" />
                    }
                  >
                    {dateIdeaSettings.map((setting) => (
                      <MenuItem key={setting} value={setting}>
                        {setting}
                      </MenuItem>
                    ))}
                  </Select>
                  {formErrors.setting && (
                    <FormHelperText>{formErrors.setting}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <FormControl 
                  fullWidth 
                  margin="normal" 
                  size={isMobile ? "small" : "medium"}
                  error={!!formErrors.budget}
                >
                  <InputLabel>Budget</InputLabel>
                  <Select
                    name="budget"
                    value={newDateIdea.budget}
                    label="Budget"
                    onChange={handleInputChange}
                    required
                    startAdornment={
                      <MoneyIcon sx={{ mr: 1, color: 'text.secondary' }} fontSize="small" />
                    }
                  >
                    {dateIdeaBudgets.map((budget) => (
                      <MenuItem key={budget} value={budget}>
                        {budget}
                      </MenuItem>
                    ))}
                  </Select>
                  {formErrors.budget && (
                    <FormHelperText>{formErrors.budget}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Price Level
              </Typography>
              <Box sx={{ px: 2 }}>
                <Slider
                  value={newDateIdea.priceLevel}
                  onChange={handlePriceLevelChange}
                  step={1}
                  marks={priceLevelMarks}
                  min={1}
                  max={5}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => '$'.repeat(value)}
                />
              </Box>
            </Box>
            
            <Box sx={{ mt: 3, mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Tags
              </Typography>
              <Autocomplete
                multiple
                id="tags-filled"
                options={commonTags}
                freeSolo
                value={newDateIdea.tags}
                onChange={handleTagsChange}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                      key={index}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Add Tags"
                    placeholder="Type and press enter"
                    helperText="Add tags to help others find your date idea"
                    fullWidth
                    size={isMobile ? "small" : "medium"}
                  />
                )}
              />
            </Box>
            
            <Box sx={{ mt: 3, mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Additional Details
              </Typography>
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={newDateIdea.location}
                  onChange={handleInputChange}
                  margin="normal"
                  size={isMobile ? "small" : "medium"}
                  placeholder="E.g., Central Park, Downtown, etc."
                  InputProps={{
                    startAdornment: (
                      <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} fontSize="small" />
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Time"
                  name="time"
                  value={newDateIdea.time}
                  onChange={handleInputChange}
                  margin="normal"
                  size={isMobile ? "small" : "medium"}
                  placeholder="E.g., Evening, Weekends, etc."
                  InputProps={{
                    startAdornment: (
                      <TimeIcon sx={{ mr: 1, color: 'text.secondary' }} fontSize="small" />
                    ),
                  }}
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 3 }}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={newDateIdea.isPublic} 
                    onChange={handlePublicToggle}
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">
                      Make this date idea public
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Public date ideas can be seen by all users. Private ideas are only visible to you.
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </Box>
        </DialogContent>
        
        <Divider />
        
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseDialog} variant="outlined">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!newDateIdea.title || !newDateIdea.description || !newDateIdea.category}
            startIcon={<CheckIcon />}
          >
            Create Date Idea
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default DateIdeasPage;
