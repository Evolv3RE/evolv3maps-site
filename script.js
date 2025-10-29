// Evolv³ Maps v0.6.4 — Clean script rewritten to fix syntax error and render Mapbox map
window.addEventListener('load', () => {
  if (!window.mapboxgl) {
    console.error('Mapbox GL JS failed to load.');
    return;
  }

  // Set Mapbox access token
  mapboxgl.accessToken = 'pk.eyJ1IjoiZXZvbHZlMSIsImEiOiJjbWQzZWwzZW4wNDB6MmpxNGl3dGNqODBkIn0.s-8k7OStBDRIC7SSFb6wKQ';

  // Initialize map
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    center: [-97.7431, 30.2672], // Austin coordinates as default center
    zoom: 9
  });

  // Add zoom and rotation controls to the map
  map.addControl(new mapboxgl.NavigationControl());

  // Add a marker at the center
  new mapboxgl.Marker().setLngLat([-97.7431, 30.2672]).addTo(map);
});
