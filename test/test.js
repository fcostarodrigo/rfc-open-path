const fs = require('fs');
const assert = require('assert');
const folders = require('rfc-folders');
const openPath = require('../index.js');

describe('openPath', function() {

  it('create folders recursively', function() {
    const file = 'a/b/c/d/e.f';
    openPath(file);
    fs.writeFileSync(file, '');
    fs.unlinkSync(file);
    for (const folder of folders(file).reverse()) {
      fs.rmdirSync(folder);
    }
  });

  it('Use the last folder of a path', function() {
    const folder = 'a/b/c/d/e.f/';
    const file = 'a/b/c/d/e.f/g.h';
    openPath(folder);
    fs.writeFileSync(file, '');
    fs.unlinkSync(file);
    for (const folder of folders(file).reverse()) {
      fs.rmdirSync(folder);
    }
  });
});
