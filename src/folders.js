const path = require('path');

function folders(source, fileInPath) {

  const list = [];

  if (!fileInPath) {
    list.push(path.join(path.dirname(source), path.basename(source)));
  }

  let dirname = path.dirname(source);

  while (dirname != source) {
    list.push(dirname);
    source = dirname;
    dirname = path.dirname(source);
  }

  return list.slice(0, -1).reverse();
}

module.exports = exports = folders;
