import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Home as HomeIcon,
  Explore as ExploreIcon,
  Favorite as FavoriteIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  LocalActivity as DateIdeasIcon,
  People as MatchesIcon,
  Menu as MenuIcon,
  Chat as ChatIcon,
  Shuffle as ShuffleIcon,
  Assessment as FeedbackIcon,
  Map as MapIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Discover', icon: <ShuffleIcon />, path: '/discover' },
  { text: 'Explore', icon: <ExploreIcon />, path: '/explore' },
  { text: 'Date Ideas', icon: <DateIdeasIcon />, path: '/date-ideas' },
  { text: 'Map', icon: <MapIcon />, path: '/map' },
  { text: 'Matches', icon: <MatchesIcon />, path: '/matches' },
  { text: 'Chat', icon: <ChatIcon />, path: '/chat' },
  { text: 'Favorites', icon: <FavoriteIcon />, path: '/favorites' },
  { text: 'Date Feedback', icon: <FeedbackIcon />, path: '/feedback' },
];

const profileItems = [
  { text: 'My Profile', icon: <PersonIcon />, path: '/profile/me' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

function Sidebar({ mobileOpen = false, handleDrawerToggle, isMobile = false }) {
  const location = useLocation();
  const theme = useTheme();

  const drawer = (
    <>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#6200ee' }}>
          LOCALFY
        </Typography>
      </Box>
      
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(98, 0, 238, 0.08)',
                  '&:hover': {
                    backgroundColor: 'rgba(98, 0, 238, 0.12)',
                  },
                },
                borderRadius: '0 20px 20px 0',
                margin: '4px 8px 4px 0',
                paddingLeft: 2,
              }}
              onClick={isMobile ? handleDrawerToggle : undefined}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? '#6200ee' : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 'medium' : 'normal',
                  color: location.pathname === item.path ? '#6200ee' : 'inherit',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="subtitle2" color="text.secondary" sx={{ px: 3, mb: 1 }}>
        PROFILE
      </Typography>
      
      <List>
        {profileItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(98, 0, 238, 0.08)',
                  '&:hover': {
                    backgroundColor: 'rgba(98, 0, 238, 0.12)',
                  },
                },
                borderRadius: '0 20px 20px 0',
                margin: '4px 8px 4px 0',
                paddingLeft: 2,
              }}
              onClick={isMobile ? handleDrawerToggle : undefined}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? '#6200ee' : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 'medium' : 'normal',
                  color: location.pathname === item.path ? '#6200ee' : 'inherit',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <>
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            width: '100%',
            backgroundColor: 'white',
            color: 'black',
            boxShadow: 1,
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', color: '#6200ee' }}>
              LOCALFY
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Mobile drawer (temporary) */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        // Desktop drawer (permanent)
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
}

export default Sidebar;
