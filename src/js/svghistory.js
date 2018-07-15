import { statusEl, historyTxt, prev, next } from './domcache';
import SVGs from './svgs';
import { setText } from './domhelpers';

const historyHandler = () => {
  const { current, list } = SVGs;
  setText(
    statusEl,
    `displaying generated SVG ${current + 1} of ${list.length}`
  );

  historyTxt.innerHTML = `<strong>${current + 1}</strong> of <strong>${
    list.length
  }</strong>`;

  if (current === 0) {
    prev.classList.add('u-hidden');
  } else {
    prev.classList.remove('u-hidden');
  }

  if (list.length < 2 || current === list.length - 1) {
    next.classList.add('u-hidden');
  } else {
    next.classList.remove('u-hidden');
  }
};

export default historyHandler;
