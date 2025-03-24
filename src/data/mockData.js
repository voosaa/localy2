// Mock data for the Localfy app

// Categories for discovery
export const categories = [
  { id: 1, name: 'Nearby', icon: '📍' },
  { id: 2, name: 'New', icon: '✨' },
  { id: 3, name: 'Popular', icon: '🔥' },
  { id: 4, name: 'Events', icon: '🎉' },
  { id: 5, name: 'Food', icon: '🍔' },
  { id: 6, name: 'Outdoor', icon: '🏞️' },
  { id: 7, name: 'Nightlife', icon: '🌃' },
  { id: 8, name: 'Date Ideas', icon: '💕' },
];

// User profiles
export const mockProfiles = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 28,
    distance: '0.5 miles away',
    bio: 'Coffee enthusiast, hiker, and local foodie. Always looking for new adventures!',
    images: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=500&fit=crop&auto=format',
    ],
    verified: true,
    interests: ['Hiking', 'Coffee', 'Food', 'Travel', 'Photography', 'Music'],
    prompts: [
      {
        question: 'Favorite local spot',
        answer: 'The hidden coffee shop on Oak Street. They have the best cold brew and the most amazing view of the city.',
      },
      {
        question: 'Best weekend activity',
        answer: 'Hiking the mountain trails just outside the city. The sunrise view is absolutely worth waking up early!',
      },
      {
        question: 'Go-to restaurant recommendation',
        answer: 'Definitely try the family-owned Italian place on Main Street. Their homemade pasta is incredible.',
      },
    ],
    aboutMe: 'I moved to this city 3 years ago and have been exploring every corner since. I work as a graphic designer and love to spend my free time outdoors or trying new restaurants. I\'m always up for meeting new people who share similar interests or can introduce me to new experiences!',
    socialMedia: {
      instagram: '@sarahjdesigns',
      twitter: '@sarahjohnson',
    },
    events: [
      {
        id: 1,
        name: 'Downtown Music Festival',
        date: 'This Weekend',
        location: '0.8 miles away',
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=150&h=150&fit=crop&auto=format',
      },
      {
        id: 2,
        name: 'Local Art Exhibition',
        date: 'Next Thursday',
        location: '1.2 miles away',
        image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=150&h=150&fit=crop&auto=format',
      },
    ],
  },
  {
    id: '2',
    name: 'Michael Chen',
    age: 32,
    distance: '1.2 miles away',
    bio: 'Photographer and craft beer lover. I know all the hidden gems in this city.',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&h=500&fit=crop&auto=format',
    ],
    verified: true,
    interests: ['Photography', 'Beer', 'Art', 'Travel', 'Music', 'Food'],
    prompts: [
      {
        question: 'Favorite local spot',
        answer: 'The rooftop bar downtown with the best skyline view. Perfect for sunset photography.',
      },
      {
        question: 'Hidden gem in the city',
        answer: 'There\'s a small brewery in the industrial district that does amazing small-batch beers and has live music on weekends.',
      },
      {
        question: 'Best place for a first date',
        answer: 'The botanical gardens at dusk. It\'s beautiful, quiet enough to talk, and they have a nice café.',
      },
    ],
    aboutMe: 'Professional photographer specializing in urban landscapes and portraits. When I\'m not behind the camera, I\'m exploring new craft breweries or checking out local art exhibitions. I\'ve lived in 5 different cities and love discovering what makes each place unique.',
    socialMedia: {
      instagram: '@mikechenphoto',
      twitter: '@mikechenphoto',
    },
    events: [
      {
        id: 3,
        name: 'Photography Workshop',
        date: 'Next Saturday',
        location: '0.5 miles away',
        image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=150&h=150&fit=crop&auto=format',
      },
    ],
  },
  {
    id: '3',
    name: 'Jessica Williams',
    age: 26,
    distance: '0.8 miles away',
    bio: 'Yoga instructor and plant mom. Let me show you the best wellness spots!',
    images: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&h=500&fit=crop&auto=format',
    ],
    verified: false,
    interests: ['Yoga', 'Plants', 'Wellness', 'Meditation', 'Hiking', 'Cooking'],
    prompts: [
      {
        question: 'Best weekend activity',
        answer: 'Morning yoga in the park followed by the farmers market and a hike.',
      },
      {
        question: 'Favorite local spot',
        answer: 'The wellness center downtown. They have the best hot yoga classes and amazing smoothies.',
      },
      {
        question: 'Most underrated place in town',
        answer: 'The community garden on 7th Street. It\'s so peaceful and they offer free gardening workshops.',
      },
    ],
    aboutMe: 'Certified yoga instructor with a passion for holistic wellness. I teach classes at several studios around the city and love helping people find balance in their lives. My apartment is basically an urban jungle with over 50 plants. When I\'m not on my mat, I\'m hiking, cooking plant-based meals, or hunting for new additions to my plant family.',
    socialMedia: {
      instagram: '@jess_wellness',
    },
    events: [
      {
        id: 4,
        name: 'Sunrise Yoga in the Park',
        date: 'Every Sunday',
        location: '0.3 miles away',
        image: 'https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=150&h=150&fit=crop&auto=format',
      },
    ],
  },
  {
    id: '4',
    name: 'David Rodriguez',
    age: 30,
    distance: '1.5 miles away',
    bio: 'Music producer and vinyl collector. Always up for live shows and record hunting.',
    images: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=500&fit=crop&auto=format',
    ],
    verified: true,
    interests: ['Music', 'Vinyl', 'Concerts', 'DJing', 'Art', 'Coffee'],
    prompts: [
      {
        question: 'Favorite local spot',
        answer: 'The record store on Main Street. They have an amazing selection of rare vinyl and host listening parties.',
      },
      {
        question: 'Best place to relax',
        answer: 'The jazz café near the river. Great music, excellent coffee, and a chill atmosphere.',
      },
      {
        question: 'Go-to restaurant recommendation',
        answer: 'The taco truck by the music venue. Best late-night food after a show!',
      },
    ],
    aboutMe: 'Music producer by day, DJ by night. I\'ve been collecting vinyl for over 10 years and have more than 1,000 records. I produce electronic music and occasionally play sets at local venues. Always looking for new sounds and musical inspirations. I also run a small podcast about the local music scene.',
    socialMedia: {
      instagram: '@davidrodmusic',
      twitter: '@davidrodmusic',
    },
    events: [
      {
        id: 5,
        name: 'Underground DJ Night',
        date: 'This Friday',
        location: '0.7 miles away',
        image: 'https://images.unsplash.com/photo-1571266028243-8108f8e5c72a?w=150&h=150&fit=crop&auto=format',
      },
    ],
  },
  {
    id: 'me',
    name: 'Alex Morgan',
    age: 30,
    distance: '0 miles away',
    bio: 'Tech enthusiast, amateur chef, and fitness junkie. Looking to connect with like-minded locals.',
    images: [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=500&h=500&fit=crop&auto=format',
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
    events: [
      {
        id: 6,
        name: 'Tech Meetup: AI Basics',
        date: 'Next Tuesday',
        location: '0.3 miles away',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=150&h=150&fit=crop&auto=format',
      },
    ],
  },
];

// Export profiles as an alias for mockProfiles for backward compatibility
export const profiles = mockProfiles;

// Trending profiles
export const trendingProfiles = [
  {
    id: '5',
    name: 'Emma Thompson',
    age: 29,
    followers: '2,345',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=500&fit=crop&auto=format',
    verified: true,
  },
  {
    id: '6',
    name: 'James Wilson',
    age: 34,
    followers: '3,780',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop&auto=format',
    verified: true,
  },
  {
    id: '7',
    name: 'Olivia Martinez',
    age: 27,
    followers: '1,982',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop&auto=format',
    verified: false,
  },
  {
    id: '8',
    name: 'Noah Garcia',
    age: 31,
    followers: '4,210',
    image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=500&h=500&fit=crop&auto=format',
    verified: true,
  },
];

// Local events
export const localEvents = [
  {
    id: 1,
    name: 'Downtown Music Festival',
    date: 'This Weekend',
    location: '0.8 miles away',
    description: 'Join us for the biggest music festival of the year featuring local artists and food vendors.',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500&h=500&fit=crop&auto=format',
    attendees: 42,
  },
  {
    id: 2,
    name: 'Local Food & Wine Festival',
    date: 'Next Friday',
    location: '1.2 miles away',
    description: 'Taste the best local cuisine and wines from regional vineyards at this annual gathering.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=500&fit=crop&auto=format',
    attendees: 28,
  },
  {
    id: 3,
    name: 'Art in the Park',
    date: 'Next Saturday',
    location: '0.5 miles away',
    description: 'A showcase of local artists displaying their work in the central park. Live music and food trucks available.',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=500&h=500&fit=crop&auto=format',
    attendees: 35,
  },
  {
    id: 4,
    name: 'Tech Meetup: AI Basics',
    date: 'Next Tuesday',
    location: '0.3 miles away',
    description: 'Learn the fundamentals of artificial intelligence in this beginner-friendly tech meetup.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=500&fit=crop&auto=format',
    attendees: 18,
  },
];

// Available prompt questions for profile editing
export const promptQuestions = [
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

// Available interests for profile editing
export const availableInterests = [
  'Technology', 'Cooking', 'Fitness', 'Reading', 'Movies', 'Hiking',
  'Music', 'Art', 'Photography', 'Travel', 'Food', 'Coffee',
  'Yoga', 'Running', 'Cycling', 'Gaming', 'Dancing', 'Writing',
  'Fashion', 'Design', 'Entrepreneurship', 'Volunteering', 'Languages', 'Science',
];

// Date idea categories
export const dateIdeaCategories = [
  'Adventure', 'Romantic', 'Foodie', 'Cultural', 'Outdoors', 
  'Budget-friendly', 'Creative', 'Active', 'Relaxing', 'Educational'
];

// Date idea settings
export const dateIdeaSettings = [
  'Indoor', 'Outdoor', 'Both'
];

// Date idea budgets
export const dateIdeaBudgets = [
  '$', '$$', '$$$'
];

// Date ideas
export const dateIdeas = [
  {
    id: 1,
    title: 'Sunset Picnic in the Park',
    description: 'Pack a basket with your favorite snacks, a bottle of wine, and a blanket. Head to a local park with a good view of the sunset and enjoy a relaxing evening outdoors.',
    category: 'Romantic',
    setting: 'Outdoor',
    budget: '$',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=500&h=300&fit=crop&auto=format',
    location: 'Central Park',
    time: 'Evening',
    createdBy: '1',
    matchCount: 24,
    isFavorite: false,
  },
  {
    id: 2,
    title: 'Street Food Tour',
    description: 'Explore the city\'s best street food vendors and food trucks. Try a variety of cuisines and discover hidden culinary gems in your neighborhood.',
    category: 'Foodie',
    setting: 'Outdoor',
    budget: '$$',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=300&fit=crop&auto=format',
    location: 'Downtown',
    time: 'Lunch or Dinner',
    createdBy: '2',
    matchCount: 18,
    isFavorite: false,
  },
  {
    id: 3,
    title: 'DIY Cocktail Workshop',
    description: 'Learn to make craft cocktails together. Buy ingredients for a few classic drinks or get creative and invent your own signature cocktails.',
    category: 'Creative',
    setting: 'Indoor',
    budget: '$$',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&h=300&fit=crop&auto=format',
    location: 'Home',
    time: 'Evening',
    createdBy: '3',
    matchCount: 15,
    isFavorite: false,
  },
  {
    id: 4,
    title: 'Museum Bingo',
    description: 'Create bingo cards with items to find in a museum (e.g., "painting with a dog," "sculpture made before 1800"). Make it competitive with a small prize for the winner.',
    category: 'Cultural',
    setting: 'Indoor',
    budget: '$',
    image: 'https://images.unsplash.com/photo-1503152394-c571994fd383?w=500&h=300&fit=crop&auto=format',
    location: 'Art Museum',
    time: 'Afternoon',
    createdBy: '4',
    matchCount: 12,
    isFavorite: false,
  },
  {
    id: 5,
    title: 'Kayaking Adventure',
    description: 'Rent a tandem kayak and explore local waterways together. Perfect for a sunny day and a great way to have conversations while enjoying nature.',
    category: 'Adventure',
    setting: 'Outdoor',
    budget: '$$',
    image: 'https://images.unsplash.com/photo-1463694372132-6c267f6ba561?w=500&h=300&fit=crop&auto=format',
    location: 'City River',
    time: 'Morning or Afternoon',
    createdBy: 'me',
    matchCount: 20,
    isFavorite: true,
  },
  {
    id: 6,
    title: 'Cooking Class',
    description: 'Take a cooking class together and learn to make a new cuisine. Many restaurants and culinary schools offer evening classes for couples.',
    category: 'Foodie',
    setting: 'Indoor',
    budget: '$$$',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&h=300&fit=crop&auto=format',
    location: 'Culinary School',
    time: 'Evening',
    createdBy: '1',
    matchCount: 16,
    isFavorite: false,
  },
  {
    id: 7,
    title: 'Stargazing Night',
    description: 'Find a spot away from city lights, bring a telescope or just your eyes, and spend the evening looking at stars and planets. Don\'t forget to bring blankets and hot drinks!',
    category: 'Romantic',
    setting: 'Outdoor',
    budget: '$',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500&h=300&fit=crop&auto=format',
    location: 'Observatory Hill',
    time: 'Night',
    createdBy: '2',
    matchCount: 22,
    isFavorite: false,
  },
  {
    id: 8,
    title: 'Indoor Rock Climbing',
    description: 'Visit a climbing gym and try bouldering or top-rope climbing. It\'s a fun way to build trust and encourage each other through challenges.',
    category: 'Active',
    setting: 'Indoor',
    budget: '$$',
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=500&h=300&fit=crop&auto=format',
    location: 'Climbing Gym',
    time: 'Flexible',
    createdBy: '3',
    matchCount: 14,
    isFavorite: false,
  },
];

// Matches based on date ideas
export const matches = [
  {
    id: 1,
    user: mockProfiles[0], // Sarah Johnson
    dateIdeas: [dateIdeas[0], dateIdeas[6]], // Sunset Picnic, Stargazing Night
    commonInterests: ['Travel', 'Photography', 'Hiking'],
    matchPercentage: 85,
    lastActive: '2 hours ago',
  },
  {
    id: 2,
    user: mockProfiles[1], // Michael Rodriguez
    dateIdeas: [dateIdeas[4], dateIdeas[7]], // Kayaking Adventure, Indoor Rock Climbing
    commonInterests: ['Fitness', 'Hiking', 'Running'],
    matchPercentage: 78,
    lastActive: '5 hours ago',
  },
  {
    id: 3,
    user: mockProfiles[2], // Emily Chen
    dateIdeas: [dateIdeas[1], dateIdeas[5]], // Street Food Tour, Cooking Class
    commonInterests: ['Cooking', 'Food', 'Travel'],
    matchPercentage: 92,
    lastActive: '1 day ago',
  },
  {
    id: 4,
    user: mockProfiles[3], // James Wilson
    dateIdeas: [dateIdeas[2], dateIdeas[3]], // DIY Cocktail Workshop, Museum Bingo
    commonInterests: ['Art', 'Music', 'Design'],
    matchPercentage: 73,
    lastActive: '3 days ago',
  },
  {
    id: 5,
    user: mockProfiles[4], // Olivia Martinez
    dateIdeas: [dateIdeas[0], dateIdeas[3], dateIdeas[6]], // Sunset Picnic, Museum Bingo, Stargazing
    commonInterests: ['Reading', 'Art', 'Photography'],
    matchPercentage: 88,
    lastActive: 'Just now',
  },
];
