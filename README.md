# Localfy

Localfy is a dating app that matches users based on shared interest in date ideas. It helps users discover potential matches through date ideas they both like.

## Features

- User profiles with images and preferences
- Date ideas discovery with swipe interface
- Geolocation-based filtering and distance calculation
- Interactive map for exploring date ideas
- Matchmaking based on shared date idea interests
- Chat functionality for matched users
- Modern UI with card-based design

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a Firebase project and update the configuration in `src/firebase/config.js`
4. Start the development server with `npm start`

## Tech Stack

- React
- React Router for navigation
- Material UI for components and styling
- Firebase (Authentication, Firestore, Storage)
- Mapbox for maps and location services

## API Integrations

### Firebase
- **Authentication**: User registration, login, and profile management
- **Firestore**: Database for storing user data, date ideas, and matches
- **Storage**: File storage for user profile images and date idea photos

### Mapbox
- **Maps**: Interactive maps for displaying date ideas
- **Geocoding**: Converting addresses to coordinates and vice versa
- **Directions**: Calculating routes between locations

### Browser APIs
- **Geolocation API**: Getting the user's current location
- **Web Storage API**: Storing user preferences locally

## Project Structure

```
src/
├── api/                  # API service integrations
│   ├── geolocation.js    # Browser geolocation API
│   ├── mapbox.js         # Mapbox API services
│   └── index.js          # API exports
├── components/           # Reusable UI components
├── firebase/             # Firebase services
│   ├── auth.js           # Authentication services
│   ├── config.js         # Firebase configuration
│   ├── firestore.js      # Firestore database services
│   └── storage.js        # Storage services
├── pages/                # Application pages
├── utils/                # Utility functions
│   └── locationUtils.js  # Location calculation utilities
└── App.js                # Main application component
```

## Environment Variables

The following environment variables are required:

```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
REACT_APP_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token