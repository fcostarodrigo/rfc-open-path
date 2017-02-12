const fs = require('fs');
const folders = require('./folders');

function openPath(pathToOpen, fileInPath) {

  for (const folder of folders(pathToOpen, fileInPath)) {
    try {
      fs.mkdirSync(folder);
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }
  }
}

module.exports = exports = openPath;
