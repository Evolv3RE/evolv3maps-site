mapboxgl.accessToken="pk.eyJ1IjoiZXZvbHZlMSIsImEiOiJjbWQzZWwzZW4wNDB6MmpxNGl3dGNqODBkIn0.s-8k7OStBDRIC7SSFb6wKQ";
const map=new mapboxgl.Map({container:"map",style:"mapbox://styles/mapbox/dark-v11",center:[-97.7431,30.2672],zoom:9});
// Smooth scroll for Join Beta button
document.addEventListener("DOMContentLoaded", () => {
  const joinBtn = document.querySelector('a[href="#waitlist"]');
  if (joinBtn) {
    joinBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector("#waitlist");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});
