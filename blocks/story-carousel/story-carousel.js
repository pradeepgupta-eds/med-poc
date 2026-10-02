import { createOptimizedPicture } from '../../scripts/aem.js';

function hasContent(cell) {
  return cell.querySelector('picture, img, a') || cell.textContent.trim() !== '';
}

export default function decorate(block) {
  const intro = document.createElement('div');
  intro.className = 'story-carousel-intro';
  const track = document.createElement('ul');
  track.className = 'story-carousel-track';

  [...block.children].forEach((row) => {
    const cells = [...row.children].filter(hasContent);
    if (!cells.length) return;
    const hasPicture = cells.some((cell) => cell.querySelector('picture, img'));

    if (!hasPicture) {
      cells.forEach((cell) => {
        while (cell.firstChild) intro.append(cell.firstChild);
      });
      return;
    }

    const li = document.createElement('li');
    li.className = 'story-carousel-item';
    cells.forEach((cell) => {
      const isImage = cell.querySelector('picture, img') && !cell.querySelector('h1, h2, h3, h4, h5, h6');
      cell.className = isImage ? 'story-carousel-image' : 'story-carousel-body';
      li.append(cell);
    });
    track.append(li);
  });

  track.querySelectorAll('picture > img').forEach((img) => {
    const picture = img.closest('picture');
    const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    const oldLinkParent = picture.parentElement;
    if (oldLinkParent) picture.replaceWith(optimized);
  });
  // bare <img> not wrapped in picture: keep as is

  const nav = document.createElement('div');
  nav.className = 'story-carousel-nav';
  ['prev', 'next'].forEach((dir) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `story-carousel-${dir}`;
    button.setAttribute('aria-label', dir === 'prev' ? 'Previous' : 'Next');
    button.addEventListener('click', () => {
      const step = (track.firstElementChild ? track.firstElementChild.offsetWidth : 300) + 24;
      track.scrollBy({ left: dir === 'prev' ? -step : step, behavior: 'smooth' });
    });
    nav.append(button);
  });

  block.replaceChildren(...(intro.childNodes.length ? [intro] : []), track, nav);
}
