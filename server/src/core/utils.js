import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import unzip from 'unzip-stream';
import walk from 'walk';
import log from 'core/log/log';
import mkdirp from 'mkdirp';

export function isDefined(val) {
  return typeof val === 'undefined' ? false : true;
}

export function _try(name, cb) {
  try {
    cb();
    log.status(name, true);
  } catch (err) {
    log.status(name, false);
  }
}

export async function saveFile(filePath, fileName, content, overwrite = false){
  let file = path.resolve(filePath, fileName);

  // retrieve current file content if no overwrite flag
  if (!overwrite) {
    let currentContent = await readFile(file);
    if (currentContent) {
      content = currentContent + content;
    }
  }

  // save the file
  return new Promise((resolve, reject) => {
    // make a dir if not exists
    mkdirp.sync(filePath);
    // write to file
    fs.writeFile(file, content, (err) => {
      if(err) {
        reject(err);
        return;
      }
      resolve(file);
    });
  });
}

export async function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(filePath), 'utf8', function (err,data) {
      if (err) {
        resolve(null);
        return;
      }
      resolve(data);
    });
  })
}

export function serialize(obj) {
  let str = '';
  for (let key in obj) {
    if (str != '') {
      str += '&';
    }
    str += key + '=' + encodeURIComponent(obj[key]);
  }
  return str;
}

export function wait(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

export function ensureDirAsync(dir) {
  return new Promise((resolve, reject) => {
    fs.ensureDir(dir, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

export function emptyDirAsync(dir) {
  return new Promise((resolve, reject) => {
    fs.emptyDir(dir, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

export function readFileAsync(file, data, param) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, param, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

export function writeFileAsync(file, data, param) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, param, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(file, data);
    });
  });
}

/**
 * Get type of passed value
 * @param  {*} obj      Value to check
 * @return {String}     Data type of value
 */
export function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

/**
 * Unzip folder and write contents to destination
 * @param  {String} folder Path of zip
 * @param  {String} dest   Path to write contents
 * @return {Promise}
 */
export function unzipFolder(folder, dest) {
  return new Promise((resolve, reject) => {
    // Open zip and write contents to disk
    fs.createReadStream(folder)
      .pipe(unzip.Parse())
      .on('entry', (entry) => {
        const fileName = path.basename(entry.path),
          fileType = entry.type,
          outputDest = path.resolve(dest, fileName),
          normalizedDest = path.normalize(outputDest);

        // We don't care about folders or hidden files
        if (fileType !== 'File' ||
          fileName.includes('__MACOSX') ||
          fileName.startsWith('._'))
        {
          return entry.autodrain();
        }

        entry.pipe(fs.createWriteStream(normalizedDest));
      })
      .on('error', (err) => {
        console.log(err);
        reject(err);
      })
      .on('end', () => {
        resolve();
      });
  });
}

/**
 * Get data from a directory of files
 * @param {any} dir Directory to crawl
 * @param {string} type File format to get data from
 * @returns {promise}
 */
export function getDataFromDir(dir, type = '.json') {
  return new Promise((resolve, reject) => {
    let dataStore = {},
      walker = walk.walk(dir, {
        followLinks: false
      });

    walker.on('file', async (root, fileStat, next) => {
      const fileLocation = path.resolve(root, fileStat.name),
        normalizedLocation = path.normalize(fileLocation),
        fileType = path.extname(normalizedLocation),
        fileName = path.basename(normalizedLocation, fileType);

      // Skip hidden files
      if (fileName.startsWith('._')) {
        return next();
      }

      if (fileType === type) {
        try {
          const readData = await readFileAsync(normalizedLocation, 'utf8');
          dataStore[fileName] = JSON.parse(readData);
        } catch (err) {
          console.log(`Could not parse file ${fileName}`);
        }

        next();
      }
    });

    walker.on('errors', reject);

    walker.on('end', () => {
      resolve(dataStore);
    });
  });
}
