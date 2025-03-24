import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Divider,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Notifications as NotificationsIcon,
  LocationOn as LocationIcon,
  Visibility as VisibilityIcon,
  Security as SecurityIcon,
  Help as HelpIcon,
  Info as InfoIcon,
  ExitToApp as LogoutIcon,
  Delete as DeleteIcon,
  Language as LanguageIcon,
  DarkMode as DarkModeIcon,
  DataUsage as DataUsageIcon,
} from '@mui/icons-material';

function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [language, setLanguage] = useState('english');
  const [distanceUnit, setDistanceUnit] = useState('miles');
  const [discoveryDistance, setDiscoveryDistance] = useState(10);
  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNotificationsChange = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleDarkModeChange = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  const handleLocationChange = () => {
    setLocationEnabled(!locationEnabled);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleDistanceUnitChange = (event) => {
    setDistanceUnit(event.target.value);
  };

  const handleDiscoveryDistanceChange = (event, newValue) => {
    setDiscoveryDistance(newValue);
  };

  const handleDeleteAccountDialogOpen = () => {
    setDeleteAccountDialogOpen(true);
  };

  const handleDeleteAccountDialogClose = () => {
    setDeleteAccountDialogOpen(false);
  };

  const handleLogoutDialogOpen = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutDialogClose = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <Box sx={{ py: { xs: 2, sm: 3 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, sm: 3 } }}>
        <IconButton component={Link} to="/" sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant={isMobile ? "h6" : "h5"} component="h1" fontWeight="bold">
          Settings
        </Typography>
      </Box>

      {/* Account Settings */}
      <Card sx={{ borderRadius: 3, mb: { xs: 2, sm: 3 } }}>
        <CardContent sx={{ pb: 0, px: { xs: 2, sm: 3 } }}>
          <Typography variant={isMobile ? "subtitle1" : "h6"} component="h2" fontWeight="bold" gutterBottom>
            Account
          </Typography>
          
          <List disablePadding>
            <ListItem 
              button 
              component={Link} 
              to="/edit-profile"
              sx={{ px: 0 }}
            >
              <ListItemText 
                primary="Edit Profile" 
                secondary="Change your profile information"
                primaryTypographyProps={{ fontSize: isMobile ? '0.95rem' : 'inherit' }}
                secondaryTypographyProps={{ fontSize: isMobile ? '0.8rem' : 'inherit' }}
              />
            </ListItem>
            
            <Divider component="li" />
            
            <ListItem 
              button 
              sx={{ px: 0 }}
            >
              <ListItemText 
                primary="Email" 
                secondary="alex.morgan@example.com"
                primaryTypographyProps={{ fontSize: isMobile ? '0.95rem' : 'inherit' }}
                secondaryTypographyProps={{ fontSize: isMobile ? '0.8rem' : 'inherit' }}
              />
            </ListItem>
            
            <Divider component="li" />
            
            <ListItem 
              button 
              sx={{ px: 0 }}
            >
              <ListItemText 
                primary="Phone Number" 
                secondary="+1 (555) 123-4567"
                primaryTypographyProps={{ fontSize: isMobile ? '0.95rem' : 'inherit' }}
                secondaryTypographyProps={{ fontSize: isMobile ? '0.8rem' : 'inherit' }}
              />
            </ListItem>
            
            <Divider component="li" />
            
            <ListItem 
              button 
              sx={{ px: 0 }}
            >
              <ListItemText 
                primary="Change Password" 
                secondary="Last changed 3 months ago"
                primaryTypographyProps={{ fontSize: isMobile ? '0.95rem' : 'inherit' }}
                secondaryTypographyProps={{ fontSize: isMobile ? '0.8rem' : 'inherit' }}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card sx={{ borderRadius: 3, mb: { xs: 2, sm: 3 } }}>
        <CardContent sx={{ pb: 0, px: { xs: 2, sm: 3 } }}>
          <Typography variant={isMobile ? "subtitle1" : "h6"} component="h2" fontWeight="bold" gutterBottom>
            Privacy
          </Typography>
          
          <List disablePadding>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: isMobile ? 40 : 56 }}>
                <VisibilityIcon fontSize={isMobile ? "small" : "medium"} />
              </ListItemIcon>
              <ListItemText 
                primary="Profile Visibility" 
                secondary="Control who can see your profile"
                primaryTypographyProps={{ fontSize: isMobile ? '0.95rem' : 'inherit' }}
                secondaryTypographyProps={{ fontSize: isMobile ? '0.8rem' : 'inherit' }}
              />
              <ListItemSecondaryAction>
                <Button size="small">Manage</Button>
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider component="li" />
            
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: isMobile ? 40 : 56 }}>
                <LocationIcon fontSize={isMobile ? "small" : "medium"} />
              </ListItemIcon>
              <ListItemText 
                primary="Location Services" 
                secondary={locationEnabled ? "Enabled" : "Disabled"}
                primaryTypographyProps={{ fontSize: isMobile ? '0.95rem' : 'inherit' }}
                secondaryTypographyProps={{ fontSize: isMobile ? '0.8rem' : 'inherit' }}
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={locationEnabled}
                  onChange={handleLocationChange}
                  size={isMobile ? "small" : "medium"}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider component="li" />
            
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: isMobile ? 40 : 56 }}>
                <SecurityIcon fontSize={isMobile ? "small" : "medium"} />
              </ListItemIcon>
              <ListItemText 
                primary="Privacy Policy" 
                secondary="Read our privacy policy"
                primaryTypographyProps={{ fontSize: isMobile ? '0.95rem' : 'inherit' }}
                secondaryTypographyProps={{ fontSize: isMobile ? '0.8rem' : 'inherit' }}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card sx={{ borderRadius: 3, mb: { xs: 2, sm: 3 } }}>
        <CardContent sx={{ pb: 0, px: { xs: 2, sm: 3 } }}>
          <Typography variant={isMobile ? "subtitle1" : "h6"} component="h2" fontWeight="bold" gutterBottom>
            Preferences
          </Typography>
          
          <List disablePadding>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: isMobile ? 40 : 56 }}>
                <NotificationsIcon fontSize={isMobile ? "small" : "medium"} />
              </ListItemIcon>
              <ListItemText 
                primary="Notifications" 
                secondary={notificationsEnabled ? "Enabled" : "Disabled"}
                primaryTypographyProps={{ fontSize: isMobile ? '0.95rem' : 'inherit' }}
                secondaryTypographyProps={{ fontSize: isMobile ? '0.8rem' : 'inherit' }}
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={notificationsEnabled}
                  onChange={handleNotificationsChange}
                  size={isMobile ? "small" : "medium"}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider component="li" />
            
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: isMobile ? 40 : 56 }}>
                <DarkModeIcon fontSize={isMobile ? "small" : "medium"} />
              </ListItemIcon>
              <ListItemText 
                primary="Dark Mode" 
                secondary={darkModeEnabled ? "Enabled" : "Disabled"}
                primaryTypographyProps={{ fontSize: isMobile ? '0.95rem' : 'inherit' }}
                secondaryTypographyProps={{ fontSize: isMobile ? '0.8rem' : 'inherit' }}
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={darkModeEnabled}
                  onChange={handleDarkModeChange}
                  size={isMobile ? "small" : "medium"}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider component="li" />
            
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: isMobile ? 40 : 56 }}>
                <LanguageIcon fontSize={isMobile ? "small" : "medium"} />
              </ListItemIcon>
              <ListItemText 
                primary="Language" 
                secondary={language.charAt(0).toUpperCase() + language.slice(1)}
                primaryTypographyProps={{ fontSize: isMobile ? '0.95rem' : 'inherit' }}
                secondaryTypographyProps={{ fontSize: isMobile ? '0.8rem' : 'inherit' }}
              />
              <ListItemSecondaryAction>
                <FormControl variant="standard" sx={{ minWidth: 100 }}>
                  <Select
                    value={language}
                    onChange={handleLanguageChange}
                    size={isMobile ? "small" : "medium"}
                  >
                    <MenuItem value="english">English</MenuItem>
                    <MenuItem value="spanish">Spanish</MenuItem>
                    <MenuItem value="french">French</MenuItem>
                    <MenuItem value="german">German</MenuItem>
                  </Select>
                </FormControl>
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider component="li" />
            
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: isMobile ? 40 : 56 }}>
                <DataUsageIcon fontSize={isMobile ? "small" : "medium"} />
              </ListItemIcon>
              <ListItemText 
                primary="Distance Unit" 
                secondary={distanceUnit.charAt(0).toUpperCase() + distanceUnit.slice(1)}
                primaryTypographyProps={{ fontSize: isMobile ? '0.95rem' : 'inherit' }}
                secondaryTypographyProps={{ fontSize: isMobile ? '0.8rem' : 'inherit' }}
              />
              <ListItemSecondaryAction>
                <FormControl variant="standard" sx={{ minWidth: 100 }}>
                  <Select
                    value={distanceUnit}
                    onChange={handleDistanceUnitChange}
                    size={isMobile ? "small" : "medium"}
                  >
                    <MenuItem value="miles">Miles</MenuItem>
                    <MenuItem value="kilometers">Kilometers</MenuItem>
                  </Select>
                </FormControl>
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider component="li" />
            
            <ListItem sx={{ px: 0, flexDirection: 'column', alignItems: 'flex-start' }}>
              <Box sx={{ display: 'flex', width: '100%', mb: 1 }}>
                <ListItemIcon sx={{ minWidth: isMobile ? 40 : 56 }}>
                  <LocationIcon fontSize={isMobile ? "small" : "medium"} />
                </ListItemIcon>
                <ListItemText 
                  primary="Discovery Distance" 
                  secondary={`${discoveryDistance} ${distanceUnit}`}
                  primaryTypographyProps={{ fontSize: isMobile ? '0.95rem' : 'inherit' }}
                  secondaryTypographyProps={{ fontSize: isMobile ? '0.8rem' : 'inherit' }}
                />
              </Box>
              <Box sx={{ width: '100%', pl: { xs: 5, sm: 7 }, pr: 2 }}>
                <Slider
                  value={discoveryDistance}
                  onChange={handleDiscoveryDistanceChange}
                  min={1}
                  max={100}
                  valueLabelDisplay="auto"
                  size={isMobile ? "small" : "medium"}
                />
              </Box>
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Support */}
      <Card sx={{ borderRadius: 3, mb: { xs: 2, sm: 3 } }}>
        <CardContent sx={{ pb: 0, px: { xs: 2, sm: 3 } }}>
          <Typography variant={isMobile ? "subtitle1" : "h6"} component="h2" fontWeight="bold" gutterBottom>
            Support
          </Typography>
          
          <List disablePadding>
            <ListItem 
              button 
              sx={{ px: 0 }}
            >
              <ListItemIcon sx={{ minWidth: isMobile ? 40 : 56 }}>
                <HelpIcon fontSize={isMobile ? "small" : "medium"} />
              </ListItemIcon>
              <ListItemText 
                primary="Help Center" 
                secondary="Get help with using Localfy"
                primaryTypographyProps={{ fontSize: isMobile ? '0.95rem' : 'inherit' }}
                secondaryTypographyProps={{ fontSize: isMobile ? '0.8rem' : 'inherit' }}
              />
            </ListItem>
            
            <Divider component="li" />
            
            <ListItem 
              button 
              sx={{ px: 0 }}
            >
              <ListItemIcon sx={{ minWidth: isMobile ? 40 : 56 }}>
                <InfoIcon fontSize={isMobile ? "small" : "medium"} />
              </ListItemIcon>
              <ListItemText 
                primary="About" 
                secondary="Learn more about Localfy"
                primaryTypographyProps={{ fontSize: isMobile ? '0.95rem' : 'inherit' }}
                secondaryTypographyProps={{ fontSize: isMobile ? '0.8rem' : 'inherit' }}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ pb: 2, px: { xs: 2, sm: 3 } }}>
          <Typography variant={isMobile ? "subtitle1" : "h6"} component="h2" fontWeight="bold" gutterBottom>
            Account Actions
          </Typography>
          
          <List disablePadding>
            <ListItem 
              button 
              onClick={handleLogoutDialogOpen}
              sx={{ px: 0 }}
            >
              <ListItemIcon sx={{ minWidth: isMobile ? 40 : 56 }}>
                <LogoutIcon fontSize={isMobile ? "small" : "medium"} />
              </ListItemIcon>
              <ListItemText 
                primary="Logout" 
                secondary="Sign out of your account"
                primaryTypographyProps={{ fontSize: isMobile ? '0.95rem' : 'inherit' }}
                secondaryTypographyProps={{ fontSize: isMobile ? '0.8rem' : 'inherit' }}
              />
            </ListItem>
            
            <Divider component="li" />
            
            <ListItem 
              button 
              onClick={handleDeleteAccountDialogOpen}
              sx={{ px: 0 }}
            >
              <ListItemIcon sx={{ minWidth: isMobile ? 40 : 56 }}>
                <DeleteIcon fontSize={isMobile ? "small" : "medium"} color="error" />
              </ListItemIcon>
              <ListItemText 
                primary="Delete Account" 
                secondary="Permanently delete your account"
                primaryTypographyProps={{ 
                  color: 'error',
                  fontSize: isMobile ? '0.95rem' : 'inherit'
                }}
                secondaryTypographyProps={{ fontSize: isMobile ? '0.8rem' : 'inherit' }}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Logout Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutDialogClose}
        fullWidth
        maxWidth="xs"
        fullScreen={isMobile}
      >
        <DialogTitle>Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout from your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutDialogClose}>Cancel</Button>
          <Button variant="contained" component={Link} to="/login">
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog
        open={deleteAccountDialogOpen}
        onClose={handleDeleteAccountDialogClose}
        fullWidth
        maxWidth="xs"
        fullScreen={isMobile}
      >
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Enter your password to confirm"
            type="password"
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteAccountDialogClose}>Cancel</Button>
          <Button variant="contained" color="error">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SettingsPage;
