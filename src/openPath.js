const fs = require("fs");
const util = require("util");
const folders = require("./folders");

const mkdir = util.promisify(fs.mkdir);

const openPath = async (pathToOpen, fileInPath, callback) => {
  for (const folder of folders(pathToOpen, fileInPath)) {
    try {
      await mkdir(folder);
    } catch (error) {
      if (error.code === "EEXIST") continue;
      if (callback) return callback(error);
      throw error;
    }
  }

  if (callback) callback();

  return undefined;
};

module.exports = openPath;
