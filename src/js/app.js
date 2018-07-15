import { a, b } from './test';
import SVGHandler from './generate';
import clipboard from './copy';
import download from './download';
import { genBtn } from './domcache';
import './../scss/styles.scss';

const SVGs = {
  list: [],
  current: 0,
  setCurrent(i) {
    this.current = i;
    return this.list[i];
  },
  prev() {
    const prev = this.current === 0 ? 0 : this.current - 1;
    this.setCurrent(prev);

    return this.list[prev];
  },
  next() {
    const next =
      this.current === this.list.length - 1 ? this.current : this.current + 1;
    this.setCurrent(next);

    return this.list[next];
  }
};

genBtn.addEventListener('click', SVGHandler);

// const clipboard = new ClipboardJS('.js-copy');

// clipboard.on('success', e => {
//   setText(codeTxt, 'copied', 'copy code');
//   setText(statusEl, 'SVG code copied');
//   e.clearSelection();
// });

// clipboard.on('error', e => {
//   setText(codeTxt, 'failed to copy', 'copy code');
//   setText(statusEl, 'failed to copy SVG code');
// });

// console.log(a, b);
