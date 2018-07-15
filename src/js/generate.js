import createGroup from './createGroup';
import createSVGObj from './createSVGObj';
import SVGs from './svgs';

const size = 50;
const columns = 3;
const rows = 5;
const w = columns * size;
const h = rows * size;

// const shapesRegEx = /<(?:\/)?rect>?|<(?:\/)?line>?|<(?:\/)?circle>?/g;
// const groupsRegEx = /<(?:\/)?g>/g;

const createSVG = () => {
  resetGlobals();
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const svgNS = svg.namespaceURI;
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
      createGroup(...coords, i, svg, svgNS);
    }
  });

  svg.setAttribute('viewBox', `-1.5 -1.5 ${w + 10} ${h + 10}`);
  svg.setAttribute('width', w + 10);
  svg.setAttribute('height', h + 10);
  // svg.setAttribute('id', `geoboxes${SVGs.list.length || ''}`);

  return svg;
};

// // create SVG Obj
// const createSVGObj = svg => {
//   const serializer = new XMLSerializer();
//   const doc = svg;
//   let str = serializer.serializeToString(doc);

//   str = str
//     .replace(shapesRegEx, match => `\n\t\t${match}`)
//     .replace(groupsRegEx, match => `\n\t${match}`)
//     .replace(/<\/svg>/, match => `\n${match}`);

//   return {
//     id: `geoboxes-${(0 && SVGs && SVGs.list.length) || ''}`,
//     str,
//     svg
//   };
// };

// const displaySVG = svg => {
//   t.innerHTML = '';
//   t.appendChild(svg);
// };

// reset each time a new SVG is generated
const resetGlobals = () => {
  // color = colors[Math.floor(Math.random() * colors.length)];
  // svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  // svgNS = svg.namespaceURI;
  // circles = 0;
};

const SVGHandler = () => {
  const svg = createSVG();
  const svgObj = createSVGObj(svg);
  console.log(svg, svgObj);

  SVGs.setCurrent(SVGs.list.length);
  // SVGs.list.push(svgObj);
  // historyHandler();
  // displaySVG(svg);
  // input.value = svgObj.str;
  // setText(statusEl, 'new SVG generated');
};

export default SVGHandler;
