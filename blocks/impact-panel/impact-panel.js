function hasContent(cell) {
  return cell.textContent.trim() !== '' || !!cell.querySelector('picture, img, a');
}

function decorateButtons(scope) {
  scope.querySelectorAll('a').forEach((a) => {
    a.classList.add('impact-panel-link');
    const wrapper = a.closest('p');
    if (wrapper) wrapper.classList.add('impact-panel-cta');
  });
}

function decorateEyebrow(scope) {
  const first = scope.firstElementChild;
  if (first && first.tagName === 'P' && !first.querySelector('a, picture, img')) {
    first.classList.add('impact-panel-eyebrow');
  }
}

function buildStat(cell) {
  cell.classList.add('impact-panel-stat');
  let valueDone = false;
  [...cell.children].forEach((child) => {
    if (child.querySelector && child.querySelector('picture, img')) {
      child.classList.add('impact-panel-stat-icon');
    } else if (child.tagName === 'P' && !valueDone) {
      child.classList.add('impact-panel-stat-value');
      valueDone = true;
    } else if (child.tagName === 'P') {
      child.classList.add('impact-panel-stat-label');
    }
  });
  return cell;
}

export default function decorate(block) {
  const main = document.createElement('div');
  main.className = 'impact-panel-main';
  const promo = document.createElement('div');
  promo.className = 'impact-panel-promo';

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const filled = cells.filter(hasContent);
    if (!filled.length) return;
    const hasHeading = !!row.querySelector('h1, h2, h3, h4, h5, h6');
    const hasImage = !!row.querySelector('picture, img');

    if (hasHeading && hasImage) {
      // promo card: image cell(s) plus text cell(s)
      filled.forEach((cell) => {
        if (cell.querySelector('h1, h2, h3, h4, h5, h6')) {
          cell.classList.add('impact-panel-promo-body');
          decorateEyebrow(cell);
          decorateButtons(cell);
        } else if (cell.querySelector('picture, img')) {
          cell.classList.add('impact-panel-promo-image');
        } else {
          cell.classList.add('impact-panel-promo-body');
        }
        promo.append(cell);
      });
    } else if (hasHeading) {
      const intro = document.createElement('div');
      intro.className = 'impact-panel-intro';
      filled.forEach((cell) => {
        cell.classList.add('impact-panel-intro-content');
        decorateEyebrow(cell);
        decorateButtons(cell);
        intro.append(cell);
      });
      main.append(intro);
    } else if (filled.length > 1 || hasImage) {
      const stats = document.createElement('div');
      stats.className = 'impact-panel-stats';
      filled.forEach((cell) => stats.append(buildStat(cell)));
      main.append(stats);
    } else {
      const note = document.createElement('div');
      note.className = 'impact-panel-note';
      filled.forEach((cell) => {
        decorateButtons(cell);
        note.append(cell);
      });
      main.append(note);
    }
  });

  // bare images (not wrapped in a picture) keep their intrinsic size
  block.querySelectorAll('img').forEach((img) => {
    if (!img.getAttribute('loading')) img.setAttribute('loading', 'lazy');
  });

  block.replaceChildren(main);
  if (promo.children.length) block.append(promo);
}
