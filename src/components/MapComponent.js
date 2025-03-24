import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set your Mapbox access token
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function MapComponent({ dateIdeas, userLocation, onMarkerClick, onMapClick }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const userMarkerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize map click handler
  const handleMapClick = useCallback((e) => {
    if (onMapClick) {
      onMapClick({
        lat: e.lngLat.lat,
        lng: e.lngLat.lng
      });
    }
  }, [onMapClick]);

  // Initialize map when component mounts
  useEffect(() => {
    if (!mapContainerRef.current) return;

    try {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: userLocation ? [userLocation.lng, userLocation.lat] : [-74.0060, 40.7128], // Default to NYC
        zoom: 12,
        attributionControl: false
      });

      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
      map.addControl(new mapboxgl.AttributionControl({
        compact: true
      }));

      // Add click event to map
      map.on('click', handleMapClick);

      map.on('load', () => {
        setMapLoaded(true);
        setLoading(false);
      });

      mapRef.current = map;

      return () => {
        map.remove();
      };
    } catch (err) {
      console.error('Error initializing map:', err);
      setError('Failed to load map. Please try again later.');
      setLoading(false);
    }
  }, [userLocation, handleMapClick]);

  // Update map center when user location changes
  useEffect(() => {
    if (!mapRef.current || !userLocation) return;

    mapRef.current.flyTo({
      center: [userLocation.lng, userLocation.lat],
      zoom: 12,
      essential: true
    });

    // Add or update user location marker
    if (userMarkerRef.current) {
      userMarkerRef.current.setLngLat([userLocation.lng, userLocation.lat]);
    } else {
      // Create a DOM element for the user marker
      const userMarkerEl = document.createElement('div');
      userMarkerEl.className = 'user-marker';
      userMarkerEl.style.width = '24px';
      userMarkerEl.style.height = '24px';
      userMarkerEl.style.borderRadius = '50%';
      userMarkerEl.style.backgroundColor = '#4285F4';
      userMarkerEl.style.border = '3px solid white';
      userMarkerEl.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
      userMarkerEl.style.cursor = 'pointer';
      
      // Create a pulsating effect
      const pulse = document.createElement('div');
      pulse.className = 'pulse';
      pulse.style.position = 'absolute';
      pulse.style.width = '40px';
      pulse.style.height = '40px';
      pulse.style.borderRadius = '50%';
      pulse.style.backgroundColor = 'rgba(66, 133, 244, 0.4)';
      pulse.style.opacity = '1';
      pulse.style.animation = 'pulse 2s infinite';
      pulse.style.top = '-11px';
      pulse.style.left = '-11px';
      pulse.style.zIndex = '-1';
      userMarkerEl.appendChild(pulse);
      
      // Add animation style
      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes pulse {
          0% {
            transform: scale(0.5);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);

      userMarkerRef.current = new mapboxgl.Marker(userMarkerEl)
        .setLngLat([userLocation.lng, userLocation.lat])
        .addTo(mapRef.current);
    }
  }, [userLocation]);

  // Add markers for date ideas
  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !dateIdeas) return;

    // Remove existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add markers for each date idea
    dateIdeas.forEach(dateIdea => {
      if (!dateIdea.coordinates) return;

      // Create a custom marker element
      const el = document.createElement('div');
      el.className = 'date-idea-marker';
      el.style.width = '32px';
      el.style.height = '32px';
      el.style.backgroundImage = 'url(https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png)';
      el.style.backgroundSize = 'cover';
      el.style.cursor = 'pointer';
      
      // Add a tooltip with the title
      const tooltip = document.createElement('div');
      tooltip.className = 'marker-tooltip';
      tooltip.textContent = dateIdea.title;
      tooltip.style.position = 'absolute';
      tooltip.style.bottom = '40px';
      tooltip.style.left = '50%';
      tooltip.style.transform = 'translateX(-50%)';
      tooltip.style.backgroundColor = 'white';
      tooltip.style.padding = '4px 8px';
      tooltip.style.borderRadius = '4px';
      tooltip.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      tooltip.style.fontSize = '12px';
      tooltip.style.fontWeight = 'bold';
      tooltip.style.whiteSpace = 'nowrap';
      tooltip.style.display = 'none';
      tooltip.style.zIndex = '1';
      el.appendChild(tooltip);
      
      // Show/hide tooltip on hover
      el.addEventListener('mouseenter', () => {
        tooltip.style.display = 'block';
      });
      el.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
      });

      // Create and add the marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat([dateIdea.coordinates.lng, dateIdea.coordinates.lat])
        .addTo(mapRef.current);

      // Add click event
      el.addEventListener('click', () => {
        if (onMarkerClick) {
          onMarkerClick(dateIdea);
        }
      });

      markersRef.current.push(marker);
    });

    // Fit bounds to include all markers and user location if available
    if (dateIdeas.length > 0 && mapRef.current) {
      const bounds = new mapboxgl.LngLatBounds();
      
      // Include user location in bounds if available
      if (userLocation) {
        bounds.extend([userLocation.lng, userLocation.lat]);
      }
      
      // Include all date idea markers
      dateIdeas.forEach(dateIdea => {
        if (dateIdea.coordinates) {
          bounds.extend([dateIdea.coordinates.lng, dateIdea.coordinates.lat]);
        }
      });
      
      // Only adjust bounds if we have coordinates
      if (!bounds.isEmpty()) {
        mapRef.current.fitBounds(bounds, {
          padding: 50,
          maxZoom: 15
        });
      }
    }
  }, [dateIdeas, mapLoaded, onMarkerClick, userLocation]);

  if (error) {
    return (
      <Box sx={{ 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
        bgcolor: '#f5f5f5'
      }}>
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>
        <Typography variant="body2">
          Please check your internet connection and try again.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
      <div 
        ref={mapContainerRef} 
        style={{ 
          height: '100%', 
          width: '100%',
          borderRadius: '8px'
        }}
      />
      
      {loading && (
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          bgcolor: 'rgba(255, 255, 255, 0.7)',
          zIndex: 10,
          borderRadius: '8px'
        }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}

export default MapComponent;
