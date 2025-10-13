// Evolv³ Maps v4 — minimal search
mapboxgl.accessToken='pk.eyJ1IjoiZXZvbHZlMSIsImEiOiJjbWQzZWwzZW4wNDB6MmpxNGl3dGNqODBkIn0.s-8k7OStBDRIC7SSFb6wKQ';
const map=new mapboxgl.Map({container:'map',style:'mapbox://styles/mapbox/dark-v11',center:[-97.7431,30.2672],zoom:9});
let marker=null;

document.getElementById('searchBtn').addEventListener('click',()=>{
  const q=document.getElementById('addressInput').value.trim();
  if(!q) return;
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json?access_token=pk.eyJ1IjoiZXZvbHZlMSIsImEiOiJjbWQzZWwzZW4wNDB6MmpxNGl3dGNqODBkIn0.s-8k7OStBDRIC7SSFb6wKQ`)
    .then(r=>r.json())
    .then(d=>{
      if(d.features && d.features.length>0){
        const coords=d.features[0].geometry.coordinates;
        if(marker) marker.remove();
        marker=new mapboxgl.Marker({color:'#F25260'}).setLngLat(coords).addTo(map);
        map.flyTo({center:coords,zoom:13,essential:true});
      } else {
        alert('Address not found.');
      }
    })
    .catch(err=>console.error('Geocoding error:',err));
});
