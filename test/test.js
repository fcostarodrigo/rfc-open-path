const fs = require('fs');
const assert = require('assert');
const folders = require('../src/folders');
const openPath = require('../src/openPath');

describe('folders', function() {

  it('should list relative folders', function() {

    assert.deepStrictEqual(folders('a/b/c'), [
      'a', 'a/b', 'a/b/c'
    ]);
  });

  it('should include last item by default', function() {

    assert.deepStrictEqual(folders('a/b/c.d'), [
      'a', 'a/b', 'a/b/c.d'
    ]);
  });

  it('should ignore last item with argument', function() {

    assert.deepStrictEqual(folders('a/b/c/', true), [
      'a', 'a/b'
    ]);
  });

  it('should list absolute paths', function() {

    assert.deepStrictEqual(folders('/a/b/c/', true), [
      '/a', '/a/b'
    ]);
  });

  it('should list folders named with a dot', function() {

    assert.deepStrictEqual(folders('a/b.c/d.e/f'), [
      'a', 'a/b.c', 'a/b.c/d.e', 'a/b.c/d.e/f'
    ]);
  });
});

describe('openPath', function() {

  it('create folders recursively', function() {
    const file = 'a/b/c/d/e.f';
    openPath(file, true);
    fs.writeFileSync(file, '');
    fs.unlinkSync(file);
    for (const folder of folders(file, true).reverse()) {
      fs.rmdirSync(folder);
    }
  });

  it('Use the last folder of a path', function() {
    const folder = 'a/b/c/d/e.f/';
    const file = 'a/b/c/d/e.f/g.h';
    openPath(folder);
    fs.writeFileSync(file, '');
    fs.unlinkSync(file);
    for (const folder of folders(file, true).reverse()) {
      fs.rmdirSync(folder);
    }
  });
});
