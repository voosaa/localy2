import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Slider,
  Grid,
  Divider,
  IconButton,
  Box,
  useTheme
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

// Mock data for filters
const CATEGORIES = [
  'Adventure', 'Romantic', 'Outdoors', 'Indoor', 'Food & Drink', 
  'Cultural', 'Active', 'Relaxing', 'Creative', 'Educational',
  'Entertainment', 'Budget-friendly', 'Luxury', 'Seasonal'
];

const SETTINGS = [
  'Casual', 'Formal', 'Intimate', 'Group', 'Active', 'Relaxing'
];

function FilterDialog({ open, onClose, filters, onFilterChange }) {
  const theme = useTheme();
  
  // Local state for filters
  const [localFilters, setLocalFilters] = useState({
    categories: [],
    settings: [],
    priceLevel: [1, 4],
    location: '',
    maxDistance: 50 // Default max distance in km
  });
  
  // Initialize local filters when dialog opens
  useEffect(() => {
    if (open) {
      setLocalFilters(filters);
    }
  }, [open, filters]);
  
  // Handle category change
  const handleCategoryChange = (category) => {
    setLocalFilters(prev => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      return {
        ...prev,
        categories: newCategories
      };
    });
  };
  
  // Handle setting change
  const handleSettingChange = (setting) => {
    setLocalFilters(prev => {
      const newSettings = prev.settings.includes(setting)
        ? prev.settings.filter(s => s !== setting)
        : [...prev.settings, setting];
      
      return {
        ...prev,
        settings: newSettings
      };
    });
  };
  
  // Handle price level change
  const handlePriceLevelChange = (event, newValue) => {
    setLocalFilters(prev => ({
      ...prev,
      priceLevel: newValue
    }));
  };
  
  // Handle max distance change
  const handleMaxDistanceChange = (event, newValue) => {
    setLocalFilters(prev => ({
      ...prev,
      maxDistance: newValue
    }));
  };
  
  // Format price level
  const formatPriceLevel = (level) => {
    return Array(level).fill('$').join('');
  };
  
  // Format distance
  const formatDistance = (distance) => {
    return `${distance} km`;
  };
  
  // Clear all filters
  const handleClearFilters = () => {
    setLocalFilters({
      categories: [],
      settings: [],
      priceLevel: [1, 4],
      location: '',
      maxDistance: 50
    });
  };
  
  // Apply filters
  const handleApplyFilters = () => {
    onFilterChange(localFilters);
  };
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        p: 2
      }}>
        <Typography variant="h6" fontWeight="bold">
          Filter Date Ideas
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 3 }}>
        {/* Categories */}
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Categories
        </Typography>
        <FormGroup sx={{ mb: 3 }}>
          <Grid container spacing={1}>
            {CATEGORIES.map((category) => (
              <Grid item xs={6} sm={4} key={category}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={localFilters.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      size="small"
                      color="primary"
                    />
                  }
                  label={category}
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
        
        <Divider sx={{ my: 2 }} />
        
        {/* Settings */}
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Settings
        </Typography>
        <FormGroup sx={{ mb: 3 }}>
          <Grid container spacing={1}>
            {SETTINGS.map((setting) => (
              <Grid item xs={6} sm={4} key={setting}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={localFilters.settings.includes(setting)}
                      onChange={() => handleSettingChange(setting)}
                      size="small"
                      color="primary"
                    />
                  }
                  label={setting}
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
        
        <Divider sx={{ my: 2 }} />
        
        {/* Price Level */}
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Price Range
        </Typography>
        <Box sx={{ px: 1, mb: 3 }}>
          <Slider
            value={localFilters.priceLevel}
            onChange={handlePriceLevelChange}
            valueLabelDisplay="auto"
            min={1}
            max={4}
            step={1}
            marks={[
              { value: 1, label: '$' },
              { value: 2, label: '$$' },
              { value: 3, label: '$$$' },
              { value: 4, label: '$$$$' }
            ]}
            valueLabelFormat={(value) => formatPriceLevel(value)}
            color="primary"
          />
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        {/* Max Distance */}
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Maximum Distance
        </Typography>
        <Box sx={{ px: 1, mb: 2 }}>
          <Slider
            value={localFilters.maxDistance}
            onChange={handleMaxDistanceChange}
            valueLabelDisplay="auto"
            min={1}
            max={100}
            step={1}
            marks={[
              { value: 5, label: '5 km' },
              { value: 25, label: '25 km' },
              { value: 50, label: '50 km' },
              { value: 100, label: '100 km' }
            ]}
            valueLabelFormat={(value) => formatDistance(value)}
            color="primary"
          />
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 2 }}>
        <Button 
          variant="outlined" 
          onClick={handleClearFilters}
          sx={{ borderRadius: 2 }}
        >
          Clear All
        </Button>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleApplyFilters}
          sx={{ borderRadius: 2 }}
        >
          Apply Filters
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FilterDialog;
