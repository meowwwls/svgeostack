import { t } from './domcache';

export const setText = (el, msg, end = '') => {
  el.textContent = msg;

  if (end) {
    setTimeout(() => {
      el.textContent = end;
    }, 1000);
  }
};

export const displaySVG = svg => {
  t.innerHTML = '';
  t.appendChild(svg);
};
