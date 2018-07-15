const size = 50;
const sw = 3;
const r = size / 2;
const geos = ['circle', 'line'];
const cMax = 2; // max circles to allow on each SVG
let circles = 0; // circles generated in currentSVG
let color;

// creates each "box" in the SVG
const createGroup = (...args) => {
  const [x1, x2, y1, y2, col, svg, svgNS, currentColor] = args;
  color = currentColor;
  const g = document.createElementNS(svgNS, 'g');
  const random = Math.floor(Math.random() * 2);
  const rect = createBox(x1, x2, y1, y2, col, svgNS);
  let shape; // shape inside of box

  if (geos[random] === 'circle' && circles < cMax && col % 2 === 0) {
    circles++;
    shape = createCircle(x1, y1, svgNS);
  } else {
    shape = createLine(x1, x2, y1, y2, col, svgNS);
  }

  svg.appendChild(g);
  g.appendChild(rect);
  g.appendChild(shape);
};

const createBox = (...args) => {
  const [x1, x2, y1, y2, col, svgNS] = args;
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
  const [x1, x2, y1, y2, col, svgNS] = args;
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

const createCircle = (x, y, svgNS) => {
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

export default createGroup;
