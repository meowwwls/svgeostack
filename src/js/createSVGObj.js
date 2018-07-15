const shapesRegEx = /<(?:\/)?rect>?|<(?:\/)?line>?|<(?:\/)?circle>?/g;
const groupsRegEx = /<(?:\/)?g>/g;

const createSVGObj = svg => {
  const serializer = new XMLSerializer();
  const doc = svg;
  let str = serializer.serializeToString(doc);

  str = str
    .replace(shapesRegEx, match => `\n\t\t${match}`)
    .replace(groupsRegEx, match => `\n\t${match}`)
    .replace(/<\/svg>/, match => `\n${match}`);

  return {
    id: `geoboxes${(0 && SVGs && SVGs.list.length) || ''}`,
    str,
    svg
  };
};

export default createSVGObj;
