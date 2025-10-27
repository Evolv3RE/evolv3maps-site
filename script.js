// Evolv³ Maps v0.6.1 — Mapbox Satellite Integration (Austin-centered)
(function(){

  // --- Mapbox base ---
  if (!window.mapboxgl) {
    var s = document.createElement('script');
    s.src = 'https://api.mapbox.com/mapbox-gl-js/v2.16.1/mapbox-gl.js';
    s.defer = true;
    document.head.appendChild(s);
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://api.mapbox.com/mapbox-gl-js/v2.16.1/mapbox-gl.css';
    document.head.appendChild(l);
    s.onload = initMap;
  } else {
    initMap();
  }

  function initMap() {
    if (!document.getElementById('map')) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoiZXZvbHZlMSIsImEiOiJjbWQzZWwzZW4wNDB6MmpxNGl3dGNqODBkIn0.s-8k7OStBDRIC7SSFb6wKQ';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [-97.7431, 30.2672], // Austin, TX
      zoom: 9.5,
      pitch: 0,
      bearing: 0
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Branded marker on Austin
    const markerEl = document.createElement('div');
    markerEl.style.width = '16px';
    markerEl.style.height = '16px';
    markerEl.style.borderRadius = '50%';
    markerEl.style.background = '#F25260';
    markerEl.style.boxShadow = '0 0 0 3px rgba(242,82,96,0.35)';
    new mapboxgl.Marker({ element: markerEl }).setLngLat([-97.7431, 30.2672]).addTo(map);

    // Brightness overlay
    const mapEl = document.getElementById('map');
    mapEl.style.position = 'relative';
    const overlay = document.createElement('div');
    overlay.className = 'map-brightness-overlay';
    mapEl.appendChild(overlay);

    // Dropzone behavior
    const dz = document.getElementById('dropzone');
    if (dz) {
      dz.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.accept = '.zip,.png,.jpg,.jpeg,.webp,.geojson,.json';
        input.onchange = () => handleFiles(input.files);
        input.click();
      });

      ['dragenter','dragover'].forEach(evt => {
        dz.addEventListener(evt, e => {
          e.preventDefault();
          e.stopPropagation();
          dz.style.borderColor = 'var(--evolve-coral)';
          dz.style.background = 'rgba(15,30,58,0.33)';
          dz.style.color = '#fff';
          dz.textContent = 'Release to upload files';
        });
      });

      ['dragleave','drop'].forEach(evt => {
        dz.addEventListener(evt, e => {
          e.preventDefault();
          e.stopPropagation();
          dz.style.borderColor = 'rgba(242,82,96,0.55)';
          dz.style.background = 'rgba(15,30,58,0.22)';
          dz.style.color = 'var(--muted)';
          dz.textContent = 'Drop files here (zips, images, geojson) or click to select';
        });
      });

      dz.addEventListener('drop', e => handleFiles(e.dataTransfer.files));
    }

    function handleFiles(fileList) {
      if (!fileList || !fileList.length) return;
      const names = Array.from(fileList).map(f => f.name).join(', ');
      toast(`Files added: ${names}`);
    }

    function toast(msg) {
      const n = document.createElement('div');
      n.textContent = msg;
      n.style.position = 'fixed';
      n.style.bottom = '18px';
      n.style.right = '18px';
      n.style.background = 'rgba(17,24,39,0.92)';
      n.style.color = '#fff';
      n.style.padding = '10px 12px';
      n.style.border = '1px solid rgba(255,255,255,0.08)';
      n.style.borderRadius = '10px';
      n.style.boxShadow = '0 6px 22px rgba(0,0,0,0.35)';
      n.style.zIndex = 9999;
      document.body.appendChild(n);
      setTimeout(() => n.remove(), 3200);
    }
  }
})();
