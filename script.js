// Evolv³ Maps v0.6 - static JS
// Brighten satellite view for daytime + improve dropzone UX.
// NOTE: Insert your Mapbox/Google init below; this script focuses on UI polish.

(function () {
  const appEl = document.getElementById('app');
  const mapEl = document.getElementById('map');

  // Add an overlay layer to subtly brighten imagery in daytime
  const overlay = document.createElement('div');
  overlay.className = 'map-brightness-overlay';
  mapEl.style.position = 'relative';
  mapEl.appendChild(overlay);

  // Basic dropzone behavior (click to select or drag files)
  const dz = document.getElementById('dropzone');
  dz.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.zip,.png,.jpg,.jpeg,.webp,.geojson,.json';
    input.onchange = () => handleFiles(input.files);
    input.click();
  });

  ;['dragenter','dragover'].forEach(evt => {
    dz.addEventListener(evt, e => {
      e.preventDefault();
      e.stopPropagation();
      dz.style.borderColor = 'var(--evolve-coral)';
      dz.style.background = 'rgba(15,30,58,0.33)';
      dz.style.color = '#fff';
      dz.textContent = 'Release to upload files';
    });
  });

  ;['dragleave','drop'].forEach(evt => {
    dz.addEventListener(evt, e => {
      e.preventDefault();
      e.stopPropagation();
      dz.style.borderColor = 'rgba(242,82,96,0.55)';
      dz.style.background = 'rgba(15,30,58,0.22)';
      dz.style.color = 'var(--muted)';
      dz.textContent = 'Drop files here (zips, images, geojson) or click to select';
    });
  });

  dz.addEventListener('drop', e => {
    const files = e.dataTransfer.files;
    handleFiles(files);
  });

  function handleFiles(fileList) {
    if (!fileList || !fileList.length) return;
    // For now, just list files and show a toast; integrate actual upload later.
    const names = Array.from(fileList).map(f => f.name).join(', ');
    notify(`Files added: ${names}`);
  }

  function notify(msg) {
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
})();
