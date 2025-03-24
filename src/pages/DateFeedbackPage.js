import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Tabs,
  Tab,
  Rating,
  Chip,
  Divider,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Button,
  useTheme,
  useMediaQuery,
  CircularProgress,
  LinearProgress
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
  History as HistoryIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  SentimentVerySatisfied as HappyIcon,
  SentimentDissatisfied as SadIcon
} from '@mui/icons-material';
import { PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for past date feedback
const mockFeedbackData = [
  {
    id: 1,
    dateIdeaId: 3,
    dateIdea: {
      id: 3,
      title: "Sunset Picnic at the Park",
      category: "Romantic",
      setting: "Outdoors",
      priceLevel: 1
    },
    matchProfileId: 2,
    matchProfile: {
      id: 2,
      name: "Emma Wilson",
      profilePicture: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    date: new Date(2025, 2, 15),
    overallRating: 4.5,
    dateIdeaRating: 5,
    matchRating: 4,
    followUp: "yes",
    tags: ["Great conversation", "Fun activity", "Good location", "On time"],
    feedback: "Had a wonderful time! The sunset was beautiful and we had great conversations."
  },
  {
    id: 2,
    dateIdeaId: 5,
    dateIdea: {
      id: 5,
      title: "Coffee Shop Board Game Night",
      category: "Casual",
      setting: "Indoors",
      priceLevel: 2
    },
    matchProfileId: 4,
    matchProfile: {
      id: 4,
      name: "Michael Brown",
      profilePicture: "https://randomuser.me/api/portraits/men/4.jpg"
    },
    date: new Date(2025, 2, 10),
    overallRating: 3,
    dateIdeaRating: 4,
    matchRating: 2.5,
    followUp: "no",
    tags: ["Awkward", "Good location", "Different from profile"],
    feedback: "The board games were fun but we didn't really click. Conversation was a bit forced."
  },
  {
    id: 3,
    dateIdeaId: 8,
    dateIdea: {
      id: 8,
      title: "Local Art Gallery Exhibition",
      category: "Cultural",
      setting: "Indoors",
      priceLevel: 1
    },
    matchProfileId: 7,
    matchProfile: {
      id: 7,
      name: "Sophia Martinez",
      profilePicture: "https://randomuser.me/api/portraits/women/7.jpg"
    },
    date: new Date(2025, 2, 5),
    overallRating: 5,
    dateIdeaRating: 4.5,
    matchRating: 5,
    followUp: "yes",
    tags: ["Great conversation", "Interesting", "Good listener", "Genuine"],
    feedback: "Amazing connection! We both loved the art and had deep conversations about it. Definitely want to see her again."
  },
  {
    id: 4,
    dateIdeaId: 12,
    dateIdea: {
      id: 12,
      title: "Cooking Class: Italian Cuisine",
      category: "Food & Drink",
      setting: "Indoors",
      priceLevel: 3
    },
    matchProfileId: 9,
    matchProfile: {
      id: 9,
      name: "Olivia Johnson",
      profilePicture: "https://randomuser.me/api/portraits/women/9.jpg"
    },
    date: new Date(2025, 1, 28),
    overallRating: 4,
    dateIdeaRating: 4.5,
    matchRating: 3.5,
    followUp: "maybe",
    tags: ["Fun activity", "Good location", "Interesting", "Too long"],
    feedback: "The cooking class was great and we had fun, but I'm not sure if there's a romantic connection."
  },
  {
    id: 5,
    dateIdeaId: 15,
    dateIdea: {
      id: 15,
      title: "Hiking Trail Adventure",
      category: "Adventure",
      setting: "Outdoors",
      priceLevel: 1
    },
    matchProfileId: 11,
    matchProfile: {
      id: 11,
      name: "Daniel Taylor",
      profilePicture: "https://randomuser.me/api/portraits/men/11.jpg"
    },
    date: new Date(2025, 1, 20),
    overallRating: 4.5,
    dateIdeaRating: 5,
    matchRating: 4,
    followUp: "yes",
    tags: ["Great conversation", "Fun activity", "Respectful", "Interesting"],
    feedback: "Great outdoor adventure! We both enjoyed the hike and had meaningful conversations along the way."
  }
];

// Analytics data derived from feedback
const categoryRatings = [
  { name: 'Romantic', rating: 4.5, count: 1 },
  { name: 'Casual', rating: 3.0, count: 1 },
  { name: 'Cultural', rating: 5.0, count: 1 },
  { name: 'Food & Drink', rating: 4.0, count: 1 },
  { name: 'Adventure', rating: 4.5, count: 1 }
];

const settingRatings = [
  { name: 'Indoors', rating: 4.0, count: 3 },
  { name: 'Outdoors', rating: 4.5, count: 2 }
];

const followUpData = [
  { name: 'Yes', value: 3 },
  { name: 'No', value: 1 },
  { name: 'Maybe', value: 1 }
];

const COLORS = ['#0088FE', '#FF8042', '#FFBB28', '#00C49F', '#FF6B6B'];

function DateFeedbackPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold" sx={{ mb: { xs: 2, sm: 4 } }}>
        Date Feedback & Insights
      </Typography>
      
      <Paper elevation={2} sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant={isMobile ? "fullWidth" : "standard"}
          sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
        >
          <Tab 
            label="Feedback History" 
            icon={<HistoryIcon />}
            iconPosition="start"
          />
          <Tab 
            label="Analytics" 
            icon={<AssessmentIcon />}
            iconPosition="start"
          />
        </Tabs>
        
        {/* Feedback History Tab */}
        {tabValue === 0 && (
          <Box sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="h6" gutterBottom>
              Your Past Date Feedback
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Review feedback from your previous dates and see what worked well.
            </Typography>
            
            <Grid container spacing={3}>
              {mockFeedbackData.map((feedback) => (
                <Grid item xs={12} key={feedback.id}>
                  <Card variant="outlined">
                    <CardHeader
                      avatar={
                        <Avatar src={feedback.matchProfile.profilePicture} alt={feedback.matchProfile.name} />
                      }
                      title={
                        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {feedback.matchProfile.name}
                          </Typography>
                          {feedback.followUp === "yes" && (
                            <Chip 
                              icon={<ThumbUpIcon fontSize="small" />} 
                              label="Wanted to meet again" 
                              size="small" 
                              color="success" 
                              variant="outlined" 
                            />
                          )}
                          {feedback.followUp === "no" && (
                            <Chip 
                              icon={<ThumbDownIcon fontSize="small" />} 
                              label="No follow-up" 
                              size="small" 
                              color="error" 
                              variant="outlined" 
                            />
                          )}
                          {feedback.followUp === "maybe" && (
                            <Chip 
                              label="Maybe" 
                              size="small" 
                              color="default" 
                              variant="outlined" 
                            />
                          )}
                        </Box>
                      }
                      subheader={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {feedback.dateIdea.title} • {formatDate(feedback.date)}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                              Overall:
                            </Typography>
                            <Rating
                              value={feedback.overallRating}
                              precision={0.5}
                              size="small"
                              readOnly
                              icon={<FavoriteIcon fontSize="inherit" color="error" />}
                              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                            />
                          </Box>
                        </Box>
                      }
                    />
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                              Date Idea Rating:
                            </Typography>
                            <Rating
                              value={feedback.dateIdeaRating}
                              precision={0.5}
                              size="small"
                              readOnly
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                              Match Rating:
                            </Typography>
                            <Rating
                              value={feedback.matchRating}
                              precision={0.5}
                              size="small"
                              readOnly
                            />
                          </Box>
                        </Grid>
                      </Grid>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Feedback Tags:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {feedback.tags.map((tag, index) => (
                            <Chip
                              key={index}
                              label={tag}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </Box>
                      
                      {feedback.feedback && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Your Notes:
                          </Typography>
                          <Typography variant="body2">
                            "{feedback.feedback}"
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        
        {/* Analytics Tab */}
        {tabValue === 1 && (
          <Box sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="h6" gutterBottom>
              Your Dating Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Insights based on your dating history and feedback to help you find better matches.
            </Typography>
            
            <Grid container spacing={4}>
              {/* Follow-up Preferences */}
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Follow-up Preferences
                  </Typography>
                  <Box sx={{ height: 250, display: 'flex', justifyContent: 'center' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={followUpData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {followUpData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                    {followUpData[0].value > followUpData[1].value + followUpData[2].value 
                      ? "You've had a positive experience with most of your dates!"
                      : "You might want to try different types of dates or matches."}
                  </Typography>
                </Paper>
              </Grid>
              
              {/* Category Performance */}
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Date Idea Categories
                  </Typography>
                  <Box sx={{ height: 250, display: 'flex', justifyContent: 'center' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={categoryRatings}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 5]} />
                        <Tooltip />
                        <Bar dataKey="rating" fill="#8884d8">
                          {categoryRatings.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                    {categoryRatings.sort((a, b) => b.rating - a.rating)[0].name} dates have been your most successful category.
                  </Typography>
                </Paper>
              </Grid>
              
              {/* Date Settings */}
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Indoor vs Outdoor Preferences
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    {settingRatings.map((setting) => (
                      <Grid item xs={6} key={setting.name}>
                        <Box sx={{ textAlign: 'center', p: 2 }}>
                          <Typography variant="h4" fontWeight="bold" color="primary">
                            {setting.rating.toFixed(1)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Average Rating
                          </Typography>
                          <Typography variant="subtitle1" sx={{ mt: 1 }}>
                            {setting.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {setting.count} dates
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                    {settingRatings[0].rating > settingRatings[1].rating 
                      ? "You seem to enjoy indoor dates more than outdoor ones."
                      : "You seem to enjoy outdoor dates more than indoor ones."}
                  </Typography>
                </Paper>
              </Grid>
              
              {/* Most Common Tags */}
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Most Common Feedback
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    {[
                      { tag: "Great conversation", count: 3, percentage: 60 },
                      { tag: "Fun activity", count: 3, percentage: 60 },
                      { tag: "Good location", count: 3, percentage: 60 },
                      { tag: "Interesting", count: 2, percentage: 40 },
                      { tag: "Respectful", count: 1, percentage: 20 }
                    ].map((item) => (
                      <Box key={item.tag} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2">{item.tag}</Typography>
                          <Typography variant="body2" color="text.secondary">{item.count} dates ({item.percentage}%)</Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={item.percentage} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 4,
                            backgroundColor: theme.palette.action.hover
                          }} 
                        />
                      </Box>
                    ))}
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                    "Great conversation" and "Fun activity" are the most common positive feedback from your dates.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Personalized Recommendations
              </Typography>
              <Typography variant="body1" paragraph>
                Based on your feedback history, you might enjoy these date ideas:
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Art Gallery Tour
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Your cultural dates have received high ratings.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Scenic Hike
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        You've enjoyed outdoor adventure activities.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Rooftop Dinner
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Romantic settings have been successful for you.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
      </Paper>
      
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body2" color="text.secondary" paragraph>
          Your feedback helps us improve our matching algorithm and provide better date suggestions.
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<TimelineIcon />}
        >
          Export Dating History
        </Button>
      </Box>
    </Container>
  );
}

export default DateFeedbackPage;
