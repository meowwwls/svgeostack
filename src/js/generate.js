import createGroup from './createGroup';
import createSVGObj from './createSVGObj';
import SVGs from './svgs';
import historyHandler from './svghistory';
import { statusEl, input } from './domcache';
import { displaySVG, setText } from './domhelpers';

const size = 50;
const columns = 3;
const rows = 5;
const w = columns * size;
const h = rows * size;
const colors = ['#f49fc4', '#39cbb3', '#f2694b', '#000400', '#1f3ee0'];
let color;
let circles = 0;

const createSVG = () => {
  const color = colors[Math.floor(Math.random() * colors.length)];
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const svgNS = svg.namespaceURI;
  const vals = Array.from({ length: rows * columns }, item =>
    Math.round(Math.random())
  );

  let row = 0;
  let first = true; // flag for the first time a box is generated

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
      createGroup(...coords, i, svg, svgNS, color, first);

      if (first) {
        first = false;
      }
    }
  });

  svg.setAttribute('viewBox', `-1.5 -1.5 ${w + 10} ${h + 10}`);
  svg.setAttribute('width', w + 10);
  svg.setAttribute('height', h + 10);
  svg.setAttribute('id', `geoboxes${SVGs.list.length || ''}`);

  return svg;
};

const SVGHandler = () => {
  const svg = createSVG();
  const svgObj = createSVGObj(svg);

  SVGs.setCurrent(SVGs.list.length);
  SVGs.list.push(svgObj);

  input.value = svgObj.str;

  historyHandler();
  displaySVG(svg);
  setText(statusEl, 'new SVG generated');
};

export default SVGHandler;
