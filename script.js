// Evolv³ Maps v0.6.8 — Throughfare plan toggle and fetch on map load
if (!window.mapboxgl) {
  console.error('Mapbox GL JS failed to load.');
} else {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZXZvbHZlMSIsImEiOiJjbWQzZWwzZW4wNDB6MmpxNGl3dGNqODBkIn0.s-8k7OStBDRIC7SSFb6wKQ';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    center: [-97.7431, 30.2672],
    zoom: 9
  });
  map.addControl(new mapboxgl.NavigationControl());
  new mapboxgl.Marker().setLngLat([-97.7431, 30.2672]).addTo(map);
  map.on('load', () => {
    fetch('src/config/taylor_transportation_plan.geojson')
      .then(resp => resp.json())
      .then(data => {
        map.addSource('throughfare', { type: 'geojson', data: data });
        map.addLayer({
          id: 'throughfare-layer',
          type: 'line',
          source: 'throughfare',
          paint: { 'line-color': '#F25260', 'line-width': 2 }
        });
        const toggle = document.createElement('input');
        toggle.type = 'checkbox';
        toggle.id = 'throughfare-toggle';
        toggle.checked = true;
        toggle.style.position = 'absolute';
        toggle.style.top = '50px';
        toggle.style.left = '10px';
        toggle.style.zIndex = '1000';
        document.body.appendChild(toggle);
        const label = document.createElement('label');
        label.htmlFor = 'throughfare-toggle';
        label.innerText = 'Show throughfare plan';
        label.style.position = 'absolute';
        label.style.top = '50px';
        label.style.left = '35px';
        label.style.zIndex = '1000';
        label.style.color = '#FFFFFF';
        label.style.backgroundColor = '#004c6c';
        label.style.padding = '2px 6px';
        label.style.borderRadius = '4px';
        document.body.appendChild(label);
        toggle.addEventListener('change', e => {
          const visibility = e.target.checked ? 'visible' : 'none';
          map.setLayoutProperty('throughfare-layer', 'visibility', visibility);
        });
      })
      .catch(err => {
        console.error('Failed to load throughfare plan', err);
      });
  });
}
