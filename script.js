// Evolv³ Maps v1.0 — Austin corridor interactive map with toggle layers
if (!window.mapboxgl) {
  console.error('Mapbox GL JS failed to load.');
} else {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZXZvbHZlMSIsImEiOiJjbWQzZWwzZW4wNDB6MmpxNGl3dGNqODBkIn0.s-8k7OStBDRIC7SSFb6wKQ';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    center: [-97.5, 30.3],
    zoom: 9
  });
  map.addControl(new mapboxgl.NavigationControl());
  // Add marker at Austin center (optional)
  new mapboxgl.Marker().setLngLat([-97.7431, 30.2672]).addTo(map);

  map.on('load', () => {
    fetch('src/config/austin_corridor.geojson')
      .then(resp => resp.json())
      .then(data => {
        // Single source with all features
        map.addSource('austin_corridor', { type: 'geojson', data: data });

        // Thoroughfare line layer
        map.addLayer({
          id: 'thoroughfare-layer',
          type: 'line',
          source: 'austin_corridor',
          filter: ['==', ['get', 'layer'], 'thoroughfare'],
          paint: {
            'line-color': '#F25260',
            'line-width': 2
          }
        });

        // Development polygon layer
        map.addLayer({
          id: 'development-layer',
          type: 'fill',
          source: 'austin_corridor',
          filter: ['==', ['get', 'layer'], 'development'],
          paint: {
            'fill-color': '#F25260',
            'fill-opacity': 0.3,
            'fill-outline-color': '#F25260'
          }
        });

        // Create toggle UI elements
        function createToggle(id, layerId, labelText, top) {
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.id = id;
          checkbox.checked = true;
          checkbox.style.position = 'absolute';
          checkbox.style.top = top + 'px';
          checkbox.style.left = '10px';
          checkbox.style.zIndex = '1000';
          document.body.appendChild(checkbox);

          const label = document.createElement('label');
          label.htmlFor = id;
          label.innerText = labelText;
          label.style.position = 'absolute';
          label.style.top = top + 'px';
          label.style.left = '35px';
          label.style.zIndex = '1000';
          label.style.color = '#FFFFFF';
          label.style.backgroundColor = '#004c6c';
          label.style.padding = '2px 6px';
          label.style.borderRadius = '4px';
          document.body.appendChild(label);

          checkbox.addEventListener('change', (e) => {
            const visibility = e.target.checked ? 'visible' : 'none';
            map.setLayoutProperty(layerId, 'visibility', visibility);
          });
        }

        createToggle('thoroughfare-toggle', 'thoroughfare-layer', 'Show Thoroughfare Plan', 50);
        createToggle('development-toggle', 'development-layer', 'Show Development Zones', 80);
      })
      .catch(err => {
        console.error('Failed to load Austin corridor data', err);
      });
  });
}
