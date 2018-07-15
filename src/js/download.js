import { setText } from './domhelpers';
import { dlTxt, statusEl } from './domcache';
import SVGs from './svgs';

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

const download = () => {
  const el = dlTxt;

  try {
    saveSvg();
    setText(el, 'downloaded', 'download');
    setText(statusEl, 'download complete');
  } catch (e) {
    console.log(e);

    setText(el, 'download failed', 'download');
    setText(statusEl, 'download failed');
  }
};

export default download;
