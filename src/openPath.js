const fs = require('fs');
const folders = require('./folders');

function mkdir(folder) {
  return new Promise((resolve, reject) => {
    fs.mkdir(folder, error => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
}

async function openPath(pathToOpen, fileInPath, callback) {

  for (const folder of folders(pathToOpen, fileInPath)) {
    try {
      await mkdir(folder);
    } catch (error) {
      if (error.code !== 'EEXIST') {
        if (callback) {
          return callback(error);
        } else {
          throw error;
        }
      }
    }
  }

  callback && callback();
}

module.exports = exports = openPath;
