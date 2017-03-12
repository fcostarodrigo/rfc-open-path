const fs = require('fs');
const assert = require('assert');
const Promise = require('bluebird');
const folders = require('../src/folders');
const openPath = require('../src/openPath');

Promise.promisifyAll(fs);

function handler(done, callback, ...args) {
  return function (error, ...result) {
    if (error) {
      return done(error);
    }
    callback(...args, ...result);
  };
}

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

  it('create folders recursively', async function() {

    const file = 'a/b/c/d/e.f';

    await openPath(file, true);
    await fs.writeFileAsync(file, '');
    await fs.unlinkAsync(file);

    for (const folder of folders(file, true).reverse()) {
      await fs.rmdirAsync(folder);
    }

  });

  it('use the last folder of a path', async function() {

    const folder = 'a/b/c/d/e.f/';
    const file = 'a/b/c/d/e.f/g.h';

    await openPath(folder);
    await fs.writeFileAsync(file, '');
    await fs.unlinkAsync(file);

    for (const folder of folders(file, true).reverse()) {
      await fs.rmdirAsync(folder);
    }

  });

  it('fail if there are files named after folders', async function() {

    const file = 'a/b/c/d/e.f';

    await fs.writeFileAsync('a', '');

    try {
      await openPath(file, true);
    } catch (error) {
      assert(error.code === 'ENOTDIR');
    }

    await fs.unlinkAsync('a');

  });

  it('work with callbacks', function(done) {

    const folder = 'a/b/c/d/e.f/';
    const file = 'a/b/c/d/e.f/g.h';
    const foldersToDrop = folders(file, true);

    function dropFolders() {
      if (foldersToDrop.length) {
        fs.rmdir(foldersToDrop.pop(), handler(done, dropFolders));
      } else {
        done();
      }
    }

    openPath(folder, false, handler(done, () => {
      fs.writeFile(file, '', handler(done, () => {
        fs.unlink(file, handler(done, dropFolders));
      }));
    }));
  });

  it('pass errors to the callback', function(done) {

    const file = 'a/b/c/d/e.f';

    fs.writeFile('a', '', handler(done, () => {
      openPath(file, true, error => {
        if (error.code !== 'ENOTDIR') {
          return done(error);
        }
        fs.unlink('a', handler(done, done));
      });
    }));
  });
});
