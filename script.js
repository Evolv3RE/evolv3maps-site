// Evolv³ Maps v0.6.4 — Enhanced with throughfare layer toggle
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

  // Load the throughfare plan GeoJSON and add a toggleable layer
  fetch('src/config/taylor_transportation_plan.geojson')
    .then(response => response.json())
    .then(data => {
      map.on('load', () => {
        map.addSource('throughfare', { type: 'geojson', data: data });
        map.addLayer({
          id: 'throughfare-layer',
          type: 'line',
          source: 'throughfare',
          paint: {
            'line-color': '#F25260',
            'line-width': 2
          }
        });

        // Create a checkbox to toggle layer visibility
        const toggle = document.createElement('input');
        toggle.type = 'checkbox';
        toggle.id = 'throughfare-toggle';
        toggle.checked = true;
        toggle.style.position = 'absolute';
        toggle.style.top = '10px';
        toggle.style.left = '10px';
        toggle.style.zIndex = '1';
        document.body.appendChild(toggle);

        const label = document.createElement('label');
        label.htmlFor = 'throughfare-toggle';
        label.innerText = 'Show throughfare plan';
        label.style.position = 'absolute';
        label.style.top = '10px';
        label.style.left = '35px';
        label.style.zIndex = '1';
        label.style.color = '#FFFFFF';
        label.style.backgroundColor = '#F25260';
        label.style.padding = '2px 6px';
        label.style.borderRadius = '4px';
        document.body.appendChild(label);

        toggle.addEventListener('change', (e) => {
          const visibility = e.target.checked ? 'visible' : 'none';
          map.setLayoutProperty('throughfare-layer', 'visibility', visibility);
        });
      });
    })
    .catch(err => console.error('Failed to load throughfare plan', err));
});
