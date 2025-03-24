import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Tabs,
  Tab,
  Divider,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
} from '@mui/icons-material';
import MatchCard from '../components/MatchCard';
import DateIdeaCard from '../components/DateIdeaCard';
import { matches, dateIdeas } from '../data/mockData';

function MatchesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMatches, setFilteredMatches] = useState(matches);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query === '') {
      setFilteredMatches(matches);
    } else {
      setFilteredMatches(
        matches.filter(match => 
          match.user.name.toLowerCase().includes(query) ||
          match.commonInterests.some(interest => interest.toLowerCase().includes(query)) ||
          match.dateIdeas.some(idea => idea.title.toLowerCase().includes(query))
        )
      );
    }
  };

  const getRecommendedDateIdeas = () => {
    // In a real app, this would be based on user preferences and behavior
    return dateIdeas.filter(idea => idea.matchCount > 15).slice(0, isMobile ? 2 : 4);
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      <Box sx={{ mb: { xs: 2, sm: 4 } }}>
        <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold" gutterBottom>
          Your Matches
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Find people who share your interests and date ideas
        </Typography>
      </Box>

      <Box sx={{ mb: { xs: 2, sm: 4 } }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          sx={{ mb: { xs: 2, sm: 3 } }}
          variant={isMobile ? "fullWidth" : "standard"}
        >
          <Tab label="All Matches" />
          <Tab label="New Matches" />
          <Tab label="Favorites" />
        </Tabs>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center', 
          mb: { xs: 2, sm: 3 }, 
          gap: { xs: 1, sm: 2 } 
        }}>
          <TextField
            placeholder="Search matches..."
            value={searchQuery}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            sx={{ flexGrow: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ 
            display: 'flex', 
            gap: 1,
            width: isMobile ? '100%' : 'auto',
            mt: isMobile ? 1 : 0
          }}>
            <Button 
              variant="outlined" 
              startIcon={<FilterListIcon />}
              sx={{ 
                minWidth: isMobile ? '50%' : 100,
                flex: isMobile ? 1 : 'none'
              }}
            >
              Filter
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<SortIcon />}
              sx={{ 
                minWidth: isMobile ? '50%' : 100,
                flex: isMobile ? 1 : 'none'
              }}
            >
              Sort
            </Button>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))
          ) : (
            <Card sx={{ borderRadius: 3, boxShadow: 2, p: { xs: 2, sm: 3 }, textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  No matches found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search criteria or create more date ideas to find matches
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
        
        <Grid item xs={12} md={4}>
          {/* For mobile, show recommendations after a divider instead of side-by-side */}
          {isMobile && <Divider sx={{ my: 3 }} />}
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Recommended Date Ideas
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Popular ideas that might help you find more matches
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'row' : 'column',
              flexWrap: isMobile ? 'wrap' : 'nowrap',
              gap: 2,
              overflow: isMobile ? 'auto' : 'visible',
              pb: isMobile ? 1 : 0, // Add padding for scrolling on mobile
            }}>
              {getRecommendedDateIdeas().map((idea) => (
                <Box 
                  key={idea.id} 
                  sx={{ 
                    width: isMobile ? 'calc(50% - 8px)' : '100%',
                    flex: isMobile ? '0 0 auto' : '1',
                  }}
                >
                  <DateIdeaCard dateIdea={idea} compact={true} />
                </Box>
              ))}
            </Box>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Matching Tips
            </Typography>
            <Typography variant="body2" paragraph>
              • Add more date ideas to your profile to increase match potential
            </Typography>
            <Typography variant="body2" paragraph>
              • Complete your profile with detailed interests and preferences
            </Typography>
            <Typography variant="body2" paragraph>
              • Be specific about the types of activities you enjoy
            </Typography>
            <Typography variant="body2" paragraph>
              • Respond to messages promptly to keep the conversation going
            </Typography>
            
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ mt: 2 }}
              href="/date-ideas"
            >
              Create New Date Idea
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MatchesPage;
