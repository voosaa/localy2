import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

// Components
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import SettingsPage from './pages/SettingsPage';
import DateIdeasPage from './pages/DateIdeasPage';
import MatchesPage from './pages/MatchesPage';
import ChatPage from './pages/ChatPage';
import DiscoverPage from './pages/DiscoverPage';
import DateFeedbackPage from './pages/DateFeedbackPage';
import MapPage from './pages/MapPage';

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ee',
    },
    secondary: {
      main: '#03dac6',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Sidebar 
            mobileOpen={mobileOpen} 
            handleDrawerToggle={handleDrawerToggle} 
            isMobile={isMobile} 
          />
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              p: { xs: 2, sm: 3 }, 
              marginLeft: { xs: 0, md: '240px' },
              width: { xs: '100%', md: `calc(100% - 240px)` },
              transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            }}
          >
            {/* Add toolbar placeholder for mobile to prevent content from hiding under AppBar */}
            {isMobile && <Box sx={{ minHeight: '64px' }} />}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/edit-profile" element={<EditProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/date-ideas" element={<DateIdeasPage />} />
              <Route path="/matches" element={<MatchesPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/feedback" element={<DateFeedbackPage />} />
              <Route path="/map" element={<MapPage />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
