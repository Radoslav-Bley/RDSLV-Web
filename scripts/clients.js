const track1 = document.querySelector('.track-row-1');
const track2 = document.querySelector('.track-row-2');

const cloneLogos = (track) => {
  const logos = Array.from(track.children);
  logos.forEach(logo => {
    const clone = logo.cloneNode(true);
    track.appendChild(clone);
  });
  logos.forEach(logo => {
    const clone = logo.cloneNode(true);
    track.appendChild(clone);
  });
};

// Clone logos for both rows
cloneLogos(track1);
cloneLogos(track2);