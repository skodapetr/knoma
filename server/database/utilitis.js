const fileSystem = require("fs");

module.exports = {
  fileExists,
  fileNotExists,
  readJsonFromFile,
  writeJsonToFile,
  deleteFile,
  createDirectory,
};

async function fileExists(path) {
  return new Promise((accept) => {
    fileSystem.access(path, fileSystem.F_OK, (error) => {
      const exists = error === null;
      accept(exists);
    });
  });
}

/**
 * Check that a file exists. Use negation to make it easier to use in
 * conditions.
 */
async function fileNotExists(path) {
  return !(await fileExists(path));
}

async function readJsonFromFile(path) {
  return new Promise((accept, reject) => {
    fileSystem.readFile(path, "utf8", (error, data) => {
      if (error === null) {
        const content = JSON.parse(data);
        accept(content);
      } else {
        reject(error);
      }
    });
  });
}

async function writeJsonToFile(object, path) {
  const contentAsStr = JSON.stringify(object, null, 2);
  return new Promise((accept, reject) => {
    fileSystem.writeFile(path, contentAsStr, "utf8", (error) => {
      if (error === null) {
        accept();
      } else {
        reject(error);
      }
    });
  });
}

async function deleteFile(path) {
  return new Promise((accept, reject) => {
    fileSystem.unlink(path, (error) => {
      if (error === null) {
        accept();
      } else {
        reject(error);
      }
    });
  });
}

async function createDirectory(path) {
  return new Promise((accept, reject) => {
    fileSystem.mkdir(path, {recursive: true}, (error) => {
      if (error) {
        reject(error);
      } else {
        accept();
      }
    });
  });
}
