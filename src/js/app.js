'use strict';

import clipboard from './copy';
import SVGs from './svgs';
import SVGHandler from './generate';
import download from './download';
import { genBtn, dlBtn, next, prev } from './domcache';
import historyHandler from './svghistory';
import { displaySVG } from './domhelpers';

import './../scss/styles.scss';

genBtn.addEventListener('click', SVGHandler);
dlBtn.addEventListener('click', download);

prev.addEventListener('click', () => {
  const prev = SVGs.prev();
  historyHandler();
  displaySVG(prev.svg);
});

next.addEventListener('click', () => {
  const next = SVGs.next();
  historyHandler();
  displaySVG(next.svg);
});

SVGHandler();
