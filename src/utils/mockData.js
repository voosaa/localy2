// Mock data utilities for Localfy app

// Categories for date ideas
const categories = [
  'Adventure', 'Romantic', 'Outdoors', 'Indoor', 'Food & Drink', 
  'Cultural', 'Active', 'Relaxing', 'Creative', 'Educational',
  'Entertainment', 'Budget-friendly', 'Luxury', 'Seasonal'
];

// Settings for date ideas
const settings = [
  'Casual', 'Formal', 'Intimate', 'Group', 'Active', 'Relaxing'
];

// Locations for date ideas
const locations = [
  'Downtown', 'Park', 'Beach', 'Restaurant', 'Museum', 'Theater',
  'Cafe', 'Home', 'Mall', 'Hiking Trail', 'Lake', 'Rooftop',
  'Garden', 'Vineyard', 'Studio', 'Concert Hall', 'Sports Venue'
];

// Duration options
const durations = [
  '1-2 hours', '2-3 hours', '3-4 hours', 'Half day', 'Full day', 'Evening'
];

// Sample date idea titles
const dateIdeaTitles = [
  'Sunset Picnic in the Park',
  'DIY Cocktail Workshop',
  'Street Food Tour',
  'Museum Scavenger Hunt',
  'Kayaking Adventure',
  'Cooking Class for Two',
  'Stargazing Night',
  'Vintage Arcade Game Night',
  'Pottery Workshop',
  'Botanical Garden Stroll',
  'Drive-in Movie Experience',
  'Local Brewery Tour',
  'Escape Room Challenge',
  'Farmers Market Brunch',
  'Salsa Dancing Lesson',
  'Rooftop Bar Hopping',
  'Bike Trail Exploration',
  'Art Gallery Exhibition',
  'Dessert Tasting Tour',
  'Outdoor Concert',
  'Hot Air Balloon Ride',
  'Indoor Rock Climbing',
  'Sunset Sail',
  'Wine Tasting Experience',
  'Bookstore Cafe Date',
  'Horseback Riding Adventure',
  'Themed Dinner Night',
  'Karaoke Evening',
  'Beach Bonfire',
  'Scenic Hike'
];

// Sample date idea descriptions
const dateIdeaDescriptions = [
  'Pack a basket with your favorite snacks and drinks, bring a blanket, and enjoy a beautiful sunset together in a local park. Perfect for deep conversations and getting to know each other.',
  'Learn to make craft cocktails together! Get some basic ingredients, find recipes online, and have fun creating and tasting your concoctions. A perfect indoor activity for a rainy day.',
  'Explore the city\'s best street food spots together. Try different cuisines and dishes at each stop, and rate your favorites. A delicious way to explore the city and bond over food.',
  'Create a fun scavenger hunt at a local museum. Make a list of items or artworks to find, and race to see who can complete it first. Educational and entertaining!',
  'Rent a tandem kayak and explore local waterways together. Great for active couples who enjoy nature and a bit of adventure. Don\'t forget sunscreen and water!',
  'Sign up for a cooking class where you\'ll learn to make a new dish together. It\'s a fun way to learn new skills, enjoy a delicious meal, and create memories.',
  'Find a spot away from city lights, bring a blanket, some hot drinks, and stargaze together. Download a stargazing app to identify constellations and planets.',
  'Visit a vintage arcade and challenge each other to classic games. It\'s nostalgic, competitive, and a great way to have fun without taking things too seriously.',
  'Get your hands dirty at a pottery workshop where you can create something together. It\'s creative, tactile, and you\'ll have a souvenir to remember the date.',
  'Take a leisurely walk through a botanical garden, admiring the plants and flowers. It\'s peaceful, beautiful, and offers plenty of photo opportunities.',
  'Experience the nostalgia of a drive-in movie. Bring snacks, blankets, and enjoy a film under the stars from the comfort of your car.',
  'Visit local breweries for a tasting tour. Learn about the brewing process, sample different beers, and find your favorites together.',
  'Test your problem-solving skills in an escape room. Working together to solve puzzles is a great way to see how well you communicate and collaborate.',
  'Visit a farmers market, pick up fresh ingredients, and prepare a brunch together. It\'s a relaxed way to spend a morning and enjoy good food.',
  'Take a salsa dancing lesson together. It\'s fun, energetic, and a great way to break the ice and get comfortable with each other.',
  'Visit several rooftop bars in one evening, enjoying different views, drinks, and atmospheres at each one.',
  'Rent bikes and explore a scenic trail together. It\'s active, adventurous, and allows you to cover more ground than walking.',
  'Visit an art gallery exhibition that interests both of you. Discussing art can reveal a lot about each other\'s perspectives and tastes.',
  'Go on a tour of the best dessert spots in town. Sample cakes, pastries, ice cream, and other sweet treats together.',
  'Attend an outdoor concert or music festival. Sharing musical experiences can be deeply connecting and memorable.',
  'Take to the skies in a hot air balloon for breathtaking views and an unforgettable experience. Perfect for special occasions.',
  'Challenge yourselves at an indoor rock climbing gym. It\'s a fun way to build trust, as you\'ll need to rely on each other for safety.',
  'Book a sunset sailing trip for a romantic and peaceful experience on the water. Bring some wine and snacks to enhance the mood.',
  'Visit a vineyard or wine bar for a tasting experience. Learn about different wines together and discover new favorites.',
  'Spend a cozy afternoon at a bookstore cafe, browsing books and enjoying coffee. Perfect for literary lovers and relaxed conversations.',
  'Go horseback riding on a scenic trail. It\'s adventurous, unique, and offers beautiful views of nature.',
  'Create a themed dinner night at home, cooking dishes from a specific country or culture. Decorate accordingly for extra fun.',
  'Let loose at a karaoke bar and sing your favorite songs together. It\'s entertaining and a great way to show your playful side.',
  'Gather wood, marshmallows, and stories for a beach bonfire. The relaxed atmosphere is perfect for meaningful conversations.',
  'Take a hike with scenic views as your reward. Choose a trail that matches your fitness levels and enjoy nature together.'
];

// Sample images for date ideas
const dateIdeaImages = [
  'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1503152394-c571994fd383?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1572125675722-238a4f1f8c58?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1569863959165-56dae551d4fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1504609813442-a9924e2e4f5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
];

/**
 * Generate a random date idea
 * @returns {Object} A random date idea object
 */
function getRandomDateIdea() {
  const id = Math.floor(Math.random() * 10000) + 1;
  const titleIndex = Math.floor(Math.random() * dateIdeaTitles.length);
  const descriptionIndex = Math.floor(Math.random() * dateIdeaDescriptions.length);
  const imageIndex = Math.floor(Math.random() * dateIdeaImages.length);
  
  // Generate 1-3 random categories
  const numCategories = Math.floor(Math.random() * 3) + 1;
  const dateCategories = [];
  for (let i = 0; i < numCategories; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    if (!dateCategories.includes(category)) {
      dateCategories.push(category);
    }
  }
  
  // Generate 1-2 random settings
  const numSettings = Math.floor(Math.random() * 2) + 1;
  const dateSettings = [];
  for (let i = 0; i < numSettings; i++) {
    const setting = settings[Math.floor(Math.random() * settings.length)];
    if (!dateSettings.includes(setting)) {
      dateSettings.push(setting);
    }
  }
  
  return {
    id,
    title: dateIdeaTitles[titleIndex],
    description: dateIdeaDescriptions[descriptionIndex],
    image: dateIdeaImages[imageIndex],
    categories: dateCategories,
    setting: dateSettings[0],
    location: locations[Math.floor(Math.random() * locations.length)],
    duration: durations[Math.floor(Math.random() * durations.length)],
    priceLevel: Math.floor(Math.random() * 4) + 1,
    coordinates: {
      lat: (Math.random() * 0.1) + 37.7,
      lng: (Math.random() * 0.1) - 122.4
    },
    creator: {
      id: Math.floor(Math.random() * 100) + 1,
      name: ['Emma Wilson', 'Michael Chen', 'Sophia Rodriguez', 'David Kim', 'Olivia Johnson'][Math.floor(Math.random() * 5)],
      profilePicture: [
        'https://randomuser.me/api/portraits/women/1.jpg',
        'https://randomuser.me/api/portraits/men/1.jpg',
        'https://randomuser.me/api/portraits/women/2.jpg',
        'https://randomuser.me/api/portraits/men/2.jpg',
        'https://randomuser.me/api/portraits/women/3.jpg'
      ][Math.floor(Math.random() * 5)]
    }
  };
}

/**
 * Generate a list of random date ideas
 * @param {number} count - Number of date ideas to generate
 * @returns {Array} Array of date idea objects
 */
function getRandomDateIdeas(count = 10) {
  const ideas = [];
  for (let i = 0; i < count; i++) {
    ideas.push(getRandomDateIdea());
  }
  return ideas;
}

export {
  getRandomDateIdea,
  getRandomDateIdeas,
  categories,
  settings,
  locations,
  durations
};
