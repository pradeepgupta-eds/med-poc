import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const ICONS = {
  facebook: 'M22 2H2v20h10.8v-7.8H10v-3.2h2.8V8.6c0-2.8 1.7-4.3 4.2-4.3 1.2 0 2.200.1 2.500.1v2.900h-1.700c-1.400 0-1.600.7-1.600 1.600V11h3.300l-.4 3.200h-2.900V22H22z',
  youtube: 'M23 7.200a3 3 0 0 0-2.100-2.100C19 4.600 12 4.600 12 4.600s-7 0-8.900.5A3 3 0 0 0 1 7.200C.5 9.100.5 12 .5 12s0 2.900.5 4.800a3 3 0 0 0 2.100 2.100c1.900.5 8.900.5 8.900.5s7 0 8.900-.5a3 3 0 0 0 2.100-2.100c.5-1.900.5-4.800.5-4.800s0-2.900-.5-4.800zM9.800 15.500v-7l6 3.500z',
  linkedin: 'M2 2h20v20H2zm4.200 7.500v8.300h2.700V9.500zm1.300-4a1.600 1.600 0 1 0 0 3.200 1.600 1.600 0 0 0 0-3.200zm3.100 4v8.300h2.600v-4.400c0-1.200.5-1.900 1.500-1.900s1.300.7 1.300 1.900v4.400h2.600v-5c0-2.200-1.100-3.500-3-3.500-1.100 0-1.900.5-2.400 1.200V9.500z',
};

function iconFor(href) {
  if (/facebook/.test(href)) return ICONS.facebook;
  if (/youtube/.test(href)) return ICONS.youtube;
  if (/linkedin/.test(href)) return ICONS.linkedin;
  return null;
}

function buildSocial(ul) {
  ul.classList.add('footer-social');
  ul.querySelectorAll('a').forEach((a) => {
    const d = iconFor(a.href);
    if (!d) return;
    const label = a.textContent.trim();
    a.textContent = '';
    a.setAttribute('aria-label', label);
    a.target = '_blank';
    a.rel = 'noopener';
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('fill', 'currentColor');
    svg.append(path);
    a.append(svg);
  });
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  block.textContent = '';
  const footer = document.createElement('div');
  if (!fragment) {
    block.append(footer);
    return;
  }
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // decorate by content order, regardless of how many wrapper divs exist
  const root = footer.querySelector('ul')?.parentElement || footer;
  const lists = [...footer.querySelectorAll('ul')].filter((ul) => !ul.parentElement.closest('ul'));
  const paras = [...footer.querySelectorAll('p')];
  const [menu, social, legal] = lists;
  const firstListPos = menu || null;
  const brandParas = paras.filter((p) => !firstListPos
    || (p.compareDocumentPosition(firstListPos) & Node.DOCUMENT_POSITION_FOLLOWING));
  const tailParas = paras.filter((p) => !brandParas.includes(p));

  const wrap = document.createElement('div');
  wrap.className = 'footer-inner';

  if (menu) {
    menu.classList.add('footer-columns');
    [...menu.children].forEach((li) => li.classList.add('footer-column'));
    menu.querySelectorAll('a[href^="http"]').forEach((a) => {
      if (/connect\.medtronic|diabetes\.shop|manuals\.medtronic/.test(a.href)) {
        a.target = '_blank';
        a.rel = 'noopener';
      }
    });
    wrap.append(menu);
  }

  const bar = document.createElement('div');
  bar.className = 'footer-bar';
  if (brandParas.length) {
    const brand = document.createElement('div');
    brand.className = 'footer-brand';
    brandParas.forEach((p) => brand.append(p));
    bar.append(brand);
  }
  if (legal) {
    legal.classList.add('footer-legal');
    bar.append(legal);
  }
  if (social) {
    buildSocial(social);
    bar.append(social);
  }
  if (bar.children.length) wrap.append(bar);

  if (tailParas.length) {
    const copy = document.createElement('div');
    copy.className = 'footer-copyright';
    const [address, ...rest] = tailParas;
    address.classList.add('footer-address');
    copy.append(address);
    const codes = document.createElement('div');
    codes.className = 'footer-codes';
    rest.forEach((p) => codes.append(p));
    copy.append(codes);
    wrap.append(copy);
  }

  if (!wrap.children.length && root) {
    footer.className = 'footer-fallback';
    block.append(footer);
    return;
  }
  footer.textContent = '';
  footer.append(wrap);
  block.append(footer);
}
