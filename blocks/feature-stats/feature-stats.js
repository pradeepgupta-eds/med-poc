export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('feature-stats-row');
    const cells = [...row.children];
    cells.forEach((cell) => {
      cell.classList.add('feature-stats-cell');
      // drop empty padding cells from the authored table so they take no space
      if (!cell.children.length && !cell.textContent.trim()) cell.classList.add('feature-stats-empty');
    });

    if (row.querySelector('picture, img')) {
      row.classList.add('feature-stats-media');
    } else if (row.querySelector('h1, h2, h3, h4, h5, h6')) {
      row.classList.add('feature-stats-text');
      const link = row.querySelector('a');
      if (link) link.classList.add('feature-stats-cta');
      const first = row.querySelector('.feature-stats-cell > p:first-child');
      if (first) first.classList.add('feature-stats-eyebrow');
    } else if (cells.filter((c) => c.textContent.trim()).length > 1) {
      row.classList.add('feature-stats-numbers');
      row.querySelectorAll('.feature-stats-cell > p:first-child').forEach((p) => p.classList.add('feature-stats-value'));
      row.querySelectorAll('.feature-stats-cell > p:not(:first-child)').forEach((p) => p.classList.add('feature-stats-label'));
    } else {
      row.classList.add('feature-stats-note');
    }
  });
}
