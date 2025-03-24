// Mapbox API Services for Localfy
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

/**
 * Geocode an address to get coordinates
 * @param {string} address - The address to geocode
 * @returns {Promise<{coordinates: {lat: number, lng: number}|null, error: string|null}>}
 */
export const geocodeAddress = async (address) => {
  try {
    const encodedAddress = encodeURIComponent(address);
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
    );
    
    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      const [lng, lat] = data.features[0].center;
      return { 
        coordinates: { lat, lng },
        placeName: data.features[0].place_name,
        error: null 
      };
    } else {
      return { coordinates: null, placeName: null, error: "Address not found" };
    }
  } catch (error) {
    console.error("Error geocoding address:", error);
    return { coordinates: null, placeName: null, error: error.message };
  }
};

/**
 * Reverse geocode coordinates to get an address
 * @param {Object} coordinates - The coordinates {lat, lng}
 * @returns {Promise<{address: string|null, error: string|null}>}
 */
export const reverseGeocode = async (coordinates) => {
  try {
    const { lat, lng } = coordinates;
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
    );
    
    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      return { 
        address: data.features[0].place_name,
        addressComponents: data.features,
        error: null 
      };
    } else {
      return { address: null, addressComponents: [], error: "Location not found" };
    }
  } catch (error) {
    console.error("Error reverse geocoding:", error);
    return { address: null, addressComponents: [], error: error.message };
  }
};

/**
 * Get directions between two points
 * @param {Object} origin - The origin coordinates {lat, lng}
 * @param {Object} destination - The destination coordinates {lat, lng}
 * @param {string} mode - The transportation mode (driving, walking, cycling)
 * @returns {Promise<{route: Object|null, distance: number|null, duration: number|null, error: string|null}>}
 */
export const getDirections = async (origin, destination, mode = 'driving') => {
  try {
    const profile = mode === 'walking' ? 'walking' : 
                    mode === 'cycling' ? 'cycling' : 'driving';
    
    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/${profile}/` +
      `${origin.lng},${origin.lat};${destination.lng},${destination.lat}` +
      `?steps=true&geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`
    );
    
    const data = await response.json();
    
    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      return { 
        route: route.geometry,
        distance: route.distance, // in meters
        duration: route.duration, // in seconds
        steps: route.legs[0].steps,
        error: null 
      };
    } else {
      return { 
        route: null, 
        distance: null, 
        duration: null,
        steps: [],
        error: "Route not found" 
      };
    }
  } catch (error) {
    console.error("Error getting directions:", error);
    return { 
      route: null, 
      distance: null, 
      duration: null,
      steps: [],
      error: error.message 
    };
  }
};

/**
 * Get places near a location
 * @param {Object} coordinates - The coordinates {lat, lng}
 * @param {string} query - The search query (e.g., "restaurant", "coffee")
 * @param {number} radius - The search radius in meters
 * @returns {Promise<{places: Array|null, error: string|null}>}
 */
export const getNearbyPlaces = async (coordinates, query, radius = 1000) => {
  try {
    const { lat, lng } = coordinates;
    const encodedQuery = encodeURIComponent(query);
    
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedQuery}.json?` +
      `proximity=${lng},${lat}&limit=10&access_token=${MAPBOX_ACCESS_TOKEN}`
    );
    
    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      // Process and filter results
      const places = data.features.map(feature => ({
        id: feature.id,
        name: feature.text,
        address: feature.place_name,
        coordinates: {
          lat: feature.center[1],
          lng: feature.center[0]
        },
        category: feature.properties?.category || null,
        distance: feature.properties?.distance || null
      }));
      
      return { places, error: null };
    } else {
      return { places: [], error: "No places found" };
    }
  } catch (error) {
    console.error("Error getting nearby places:", error);
    return { places: [], error: error.message };
  }
};
