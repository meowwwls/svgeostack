// based on this Dribbble shot https://dribbble.com/shots/4806195-SXSW-Featured-Events-Exploration

// globals
let size = 50;
let sw = 3;
let columns = 3;
let rows = 5;
const w = columns * size;
const h = rows * size;
const r = size / 2;
const geos = ['circle', 'line'];
const colors = ['#f49fc4', '#39cbb3', '#f2694b', '#000400', '#1f3ee0'];
const cMax = 2; // max circles to allow on each SVG

let circles = 0; // circles generated in currentSVG
let color;
let svg;
let svgNS;

// regex
const shapesRegEx = /<(?:\/)?rect>?|<(?:\/)?line>?|<(?:\/)?circle>?/g;
const groupsRegEx = /<(?:\/)?g>/g;

// set up Clipboard.js
const clipboard = new ClipboardJS('.js-copy');

// creates each "box" in the SVG
const createGroup = (...args) => {
  const [x1, x2, y1, y2, col] = args;
  const g = document.createElementNS(svgNS, 'g');
  let rect = createBox(x1, x2, y1, y2, col);
  let shape; // shape inside of box
  const random = Math.floor(Math.random() * 2);

  if (geos[random] === 'circle' && circles < cMax && col % 2 === 0) {
    circles++;
    shape = createCircle(x1, y1);
  } else {
    shape = createLine(x1, x2, y1, y2, col);
  }

  svg.appendChild(g);
  g.appendChild(rect);
  g.appendChild(shape);
};

const createBox = (...args) => {
  const [x1, x2, y1, y2, col] = args;
  const rect = document.createElementNS(svgNS, 'rect');
  rect.setAttribute('x', x1);
  rect.setAttribute('y', y1);
  rect.setAttribute('width', size);
  rect.setAttribute('height', size);
  rect.setAttribute('fill', 'none');
  rect.setAttribute('stroke-width', sw);
  rect.setAttribute('stroke', color);

  return rect;
};

const createLine = (...args) => {
  const [x1, x2, y1, y2, col] = args;
  const line = document.createElementNS(svgNS, 'line');
  line.setAttribute('x1', x1);
  line.setAttribute('y1', y1);
  line.setAttribute('x2', size + x1);
  line.setAttribute('y2', size + y1);
  line.setAttribute('stroke', color);
  line.setAttribute('stroke-width', sw);

  if (col % 2 === 0) {
    line.setAttribute('transform', `translate(${x1 + x2}, 0)scale(-1,1)`);
  }

  return line;
};

const createCircle = (x, y) => {
  const cx = r + x;
  const cy = r + y;

  const circle = document.createElementNS(svgNS, 'circle');
  circle.setAttribute('cx', cx);
  circle.setAttribute('cy', cy);
  circle.setAttribute('r', r);
  circle.setAttribute('stroke', color);
  circle.setAttribute('stroke-width', sw);
  circle.setAttribute('fill', 'none');

  return circle;
};

// reset each time a new SVG is generated
const resetGlobals = () => {
  color = colors[Math.floor(Math.random() * colors.length)];
  svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgNS = svg.namespaceURI;
  circles = 0;
};

// create a new SVG
const generateSVG = () => {
  resetGlobals();
  const vals = Array.from({ length: rows * columns }, item =>
    Math.round(Math.random())
  );

  let row = 0;

  vals.forEach((val, i) => {
    const coords = [];
    const xOffset = i % columns;

    if ((i + 1) % columns === 0) {
      row++;
    }

    if (i % columns === 2) {
      coords.push(
        xOffset * size,
        size * (xOffset + 1),
        size * (row - 1),
        size * (row + 1)
      );
    } else {
      coords.push(
        xOffset * size,
        size * (xOffset + 1),
        size * row,
        size * (row + 1)
      );
    }

    if (val) {
      createGroup(...coords, i);
    }
  });

  svg.setAttribute('viewBox', `-1.5 -1.5 ${w + 10} ${h + 10}`);
  svg.setAttribute('width', w + 10);
  svg.setAttribute('height', h + 10);
  svg.setAttribute('id', `geoboxes${SVGs.list.length || ''}`);

  return svg;
};

// create SVG Obj
const createSVGObj = svg => {
  const serializer = new XMLSerializer();
  const doc = svg;
  let str = serializer.serializeToString(doc);

  str = str
    .replace(shapesRegEx, match => `\n\t\t${match}`)
    .replace(groupsRegEx, match => `\n\t${match}`)
    .replace(/<\/svg>/, match => `\n${match}`);

  return {
    id: `geoboxes-${SVGs.list.length || ''}`,
    str,
    svg
  };
};

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

// on load/click of New BTN
const SVGHandler = () => {
  const svg = generateSVG();
  const svgObj = createSVGObj(svg);
  SVGs.setCurrent(SVGs.list.length);
  SVGs.list.push(svgObj);
  historyHandler();
  displaySVG(svg);
  input.value = svgObj.str;
  setText(statusEl, 'new SVG generated');
};

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

// download SVG
const download = () => {
  const el = dlTxt;

  try {
    saveSvg();
    setText(el, 'downloaded', 'download');
    setText(statusEl, 'download complete');
  } catch (e) {
    setText(el, 'download failed', 'download');
    setText(statusEl, 'download failed');
  }
};

const saveSvg = () => {
  const svg = SVGs.list[SVGs.current];
  console.log(svg);

  const file = svg.svg;
  file.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  const data = file.outerHTML;
  const preface = '<?xml version="1.0" standalone="no"?>\r\n';
  const blob = new Blob([preface, data], {
    type: 'image/svg+xml;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `${svg.id}geostack.svg`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
// DOM handling
const t = document.getElementById('output');
const genBtn = document.querySelector('.js-generate');
const prev = document.querySelector('.js-prev');
const next = document.querySelector('.js-next');
const dlBtn = document.querySelector('.js-dl');
const codeBtn = document.querySelector('.js-copy');
const dlTxt = dlBtn.querySelector('.btn__text');
const codeTxt = codeBtn.querySelector('.btn__text');
const input = document.getElementById('svg-code');
const historyTxt = document.querySelector('.js-history');
const statusEl = document.querySelector('.js-status');

const displaySVG = svg => {
  t.innerHTML = '';
  t.appendChild(svg);
};

const setText = (el, msg, end = '') => {
  el.textContent = msg;

  if (end) {
    setTimeout(() => {
      el.textContent = end;
    }, 1000);
  }
};

// handle success and error of code copy
clipboard.on('success', e => {
  setText(codeTxt, 'copied', 'copy code');
  setText(statusEl, 'SVG code copied');
  e.clearSelection();
});

clipboard.on('error', e => {
  setText(codeTxt, 'failed to copy', 'copy code');
  setText(statusEl, 'failed to copy SVG code');
});

genBtn.addEventListener('click', SVGHandler);

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

dlBtn.addEventListener('click', download);

if (!ClipboardJS.isSupported()) {
  codeBtn.setAttribute('hidden', 'true');
}

SVGHandler();
