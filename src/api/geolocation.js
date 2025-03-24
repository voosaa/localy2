// Geolocation API Services for Localfy

/**
 * Get the user's current location
 * @param {Object} options - Geolocation options
 * @returns {Promise<{coordinates: {lat: number, lng: number}|null, error: string|null}>}
 */
export const getCurrentLocation = () => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ 
        coordinates: null, 
        error: "Geolocation is not supported by your browser" 
      });
      return;
    }
    
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          accuracy: position.coords.accuracy,
          error: null
        });
      },
      (error) => {
        let errorMessage;
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "User denied the request for geolocation";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get user location timed out";
            break;
          case error.UNKNOWN_ERROR:
            errorMessage = "An unknown error occurred";
            break;
          default:
            errorMessage = "Failed to get location";
        }
        
        resolve({ coordinates: null, error: errorMessage });
      },
      options
    );
  });
};

/**
 * Watch the user's location (continuous updates)
 * @param {Function} onSuccess - Success callback with coordinates
 * @param {Function} onError - Error callback
 * @returns {number} The watch ID to clear the watch
 */
export const watchLocation = (onSuccess, onError) => {
  if (!navigator.geolocation) {
    onError("Geolocation is not supported by your browser");
    return null;
  }
  
  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };
  
  const handleSuccess = (position) => {
    onSuccess({
      coordinates: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      },
      accuracy: position.coords.accuracy
    });
  };
  
  const handleError = (error) => {
    let errorMessage;
    
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = "User denied the request for geolocation";
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = "Location information is unavailable";
        break;
      case error.TIMEOUT:
        errorMessage = "The request to get user location timed out";
        break;
      case error.UNKNOWN_ERROR:
        errorMessage = "An unknown error occurred";
        break;
      default:
        errorMessage = "Failed to get location";
    }
    
    onError(errorMessage);
  };
  
  return navigator.geolocation.watchPosition(
    handleSuccess,
    handleError,
    options
  );
};

/**
 * Clear a location watch
 * @param {number} watchId - The watch ID returned by watchLocation
 */
export const clearLocationWatch = (watchId) => {
  if (watchId !== null && navigator.geolocation) {
    navigator.geolocation.clearWatch(watchId);
  }
};
