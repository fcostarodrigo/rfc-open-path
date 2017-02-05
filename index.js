const fs = require('fs');
const folders = require('rfc-folders');

function openPath(pathToOpen) {

  for (const folder of folders(pathToOpen)) {
    try {
      fs.mkdirSync(folder);
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }
  }
}

module.exports = openPath;
