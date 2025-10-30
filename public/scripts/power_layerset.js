// Sample power layer set script
map.on('load', function() {
  // Add sources
  map.addSource('substations', {
    type: 'geojson',
    data: './data/energy/power_substations_tx_v1.geojson'
  });
  map.addSource('corridors', {
    type: 'geojson',
    data: './data/energy/transmission_corridors_tx_v1.geojson'
  });
  map.addSource('buffer-2mi', {
    type: 'geojson',
    data: './data/energy/buffers_2mi.geojson'
  });
  map.addSource('buffer-10mi', {
    type: 'geojson',
    data: './data/energy/buffers_10mi.geojson'
  });
  map.addSource('buffer-20mi', {
    type: 'geojson',
    data: './data/energy/buffers_20mi.geojson'
  });

  // Add layers
  map.addLayer({
    id: 'substation-points',
    type: 'circle',
    source: 'substations',
    paint: {
      'circle-radius': 5,
      'circle-color': '#F25260',
      'circle-stroke-color': '#ffffff',
      'circle-stroke-width': 1
    }
  });

  map.addLayer({
    id: 'transmission-corridors',
    type: 'line',
    source: 'corridors',
    paint: {
      'line-width': 2,
      'line-color': '#00bcd4',
      'line-opacity': 0.6
    }
  });

  // Buffer layers
  ['2mi','10mi','20mi'].forEach(function(radius) {
    map.addLayer({
      id: 'buffer-' + radius,
      type: 'fill',
      source: 'buffer-' + radius,
      paint: {
        'fill-color': '#F25260',
        'fill-opacity': radius === '2mi' ? 0.25 : (radius === '10mi' ? 0.15 : 0.08)
      }
    });
  });
});
