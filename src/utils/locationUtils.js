/**
 * Utility functions for location-based features
 */

/**
 * Calculate distance between two coordinates using the Haversine formula
 * @param {Object} coords1 - First coordinates {lat, lng} or {latitude, longitude}
 * @param {Object} coords2 - Second coordinates {lat, lng} or {latitude, longitude}
 * @returns {Number} Distance in kilometers
 */
export const calculateDistance = (coords1, coords2) => {
  if (!coords1 || !coords2) return null;
  
  // Normalize coordinates to handle both {lat, lng} and {latitude, longitude} formats
  const lat1 = coords1.latitude !== undefined ? coords1.latitude : coords1.lat;
  const lon1 = coords1.longitude !== undefined ? coords1.longitude : coords1.lng;
  const lat2 = coords2.latitude !== undefined ? coords2.latitude : coords2.lat;
  const lon2 = coords2.longitude !== undefined ? coords2.longitude : coords2.lng;
  
  // Check if we have valid coordinates
  if (lat1 === undefined || lon1 === undefined || lat2 === undefined || lon2 === undefined) {
    return null;
  }
  
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distance in km
  
  return distance;
};

/**
 * Convert degrees to radians
 * @param {Number} deg - Degrees
 * @returns {Number} Radians
 */
const deg2rad = (deg) => {
  return deg * (Math.PI/180);
};

/**
 * Format distance for display
 * @param {Number} distance - Distance in kilometers
 * @returns {String} Formatted distance string
 */
export const formatDistance = (distance) => {
  if (distance === null || distance === undefined) return 'Unknown';
  
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }
  
  return `${distance.toFixed(1)} km`;
};

/**
 * Get estimated travel time based on distance
 * @param {Number} distance - Distance in kilometers
 * @returns {Object} Travel times for different modes of transportation
 */
export const getEstimatedTravelTime = (distance) => {
  if (distance === null || distance === undefined) {
    return { walking: 'Unknown', driving: 'Unknown', transit: 'Unknown' };
  }
  
  // Walking: ~5 km/h
  const walkingTime = distance / 5 * 60;
  
  // Car: ~30 km/h (city average)
  const drivingTime = distance / 30 * 60;
  
  // Transit: ~20 km/h (average)
  const transitTime = distance / 20 * 60;
  
  return {
    walking: formatTime(walkingTime),
    driving: formatTime(drivingTime),
    transit: formatTime(transitTime)
  };
};

/**
 * Format time for display
 * @param {Number} minutes - Time in minutes
 * @returns {String} Formatted time string
 */
const formatTime = (minutes) => {
  if (minutes < 1) {
    return "< 1 min";
  }
  
  if (minutes < 60) {
    return `${Math.round(minutes)} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  
  return `${hours} h ${mins} min`;
};

/**
 * Filter date ideas by distance from user location
 * @param {Array} dateIdeas - Array of date ideas
 * @param {Object} userLocation - User's coordinates {lat, lng} or {latitude, longitude}
 * @param {Number} maxDistance - Maximum distance in kilometers
 * @returns {Array} Filtered date ideas with distance property added
 */
export const filterDateIdeasByDistance = (dateIdeas, userLocation, maxDistance) => {
  if (!userLocation || !dateIdeas) return dateIdeas;
  
  // If maxDistance is not provided or invalid, don't filter but still calculate distances
  const shouldFilter = maxDistance !== undefined && maxDistance > 0;
  
  return dateIdeas.filter(idea => {
    if (!idea.coordinates) return true;
    
    const ideaCoords = {
      lat: idea.coordinates.lat,
      lng: idea.coordinates.lng
    };
    
    const userCoords = {
      lat: userLocation.latitude !== undefined ? userLocation.latitude : userLocation.lat,
      lng: userLocation.longitude !== undefined ? userLocation.longitude : userLocation.lng
    };
    
    const distance = calculateDistance(userCoords, ideaCoords);
    
    // Add distance to the date idea object for display
    idea.distance = distance;
    
    // Only filter if maxDistance is provided
    return !shouldFilter || distance <= maxDistance;
  });
};
