export default function decorate(block) {
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const hasHeading = !!row.querySelector('h1, h2, h3, h4, h5, h6');
    const hasPicture = !!row.querySelector('picture, img');
    const links = row.querySelectorAll('a');
    const text = row.textContent.trim();

    if (hasHeading) {
      row.classList.add('hero-links-content');
    } else if (hasPicture && !text && !links.length) {
      row.classList.add('hero-links-bg');
    } else if (hasPicture && links.length) {
      row.classList.add('hero-links-tiles');
    } else if (links.length) {
      row.classList.add('hero-links-side');
    } else {
      row.classList.add('hero-links-extra');
    }

    cells.forEach((cell) => {
      if (!cell.children.length && !cell.textContent.trim()) {
        cell.classList.add('hero-links-empty');
      }
    });
  });
}
