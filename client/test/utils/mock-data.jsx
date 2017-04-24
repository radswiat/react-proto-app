import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

/**
 * Process single item
 * ( see method below )
 * @param item
 * @returns {*}
 */
function processItem(item) {
  // process _id
  if (item.hasOwnProperty('_id')) {
    item._id = item._id.$oid;
  }
  // process history
  if (item.hasOwnProperty('history')) {
    item.history.forEach((historyItem, key) => {
      item.history[key] = historyItem.$oid;
    });
  }
  return item;
}

/**
 * Process data
 * - we need to process data as some values exported by DB are diff from real DB
 * - example: _id, instead of string it is a object with $oid key
 * @param data
 * @returns {*}
 */
function processData(data) {
  if (data.hasOwnProperty('length')) {
    data.forEach((item, key) => {
      data[key] = processItem(item);
    });
  } else {
    data = processItem(data);
  }
  return data;
}

/**
 * Find by id
 * @param data
 * @param objectId
 * @returns {*}
 */
function findById(data, objectId) {
  let filtered = data.filter((item) => {
    return item._id.$oid === objectId;
  });
  if (!filtered.length) {
    console.log(chalk.red(`mock-data was unable to find: ${objectId}`));
    return {};
  }
  return processData(filtered[0]);
}

/**
 * Find by index
 * @param data
 * @param indexId
 * @returns {*}
 */
function findByIndex(data, indexId) {
  return processData(data[indexId]);
}

/**
 * Load mock data
 * @exports
 * @param rootType - type of the date: ex. documents
 * @param subType - sub type, refers to json file name
 * @param objectId - id of the object to return
 * @returns {*}
 */
export function mockDataById(rootType, subType, objectId) {
  let rootPath = path.resolve(process.cwd(), 'test/mock-data');
  let file = fs.readFileSync(path.resolve(rootPath, rootType, `${subType}.json`), 'utf8');
  let json = JSON.parse(file);
  return findById(json, objectId);
}

/**
 * Load mock data
 * @exports
 * @param rootType - type of the date: ex. documents
 * @param subType - sub type, refers to json file name
 * @param objectId - id of the object to return
 * @returns {*}
 */
export function mockDataByIndex(rootType, subType, indexId) {
  let rootPath = path.resolve(process.cwd(), 'test/mock-data');
  let file = fs.readFileSync(path.resolve(rootPath, rootType, `${subType}.json`), 'utf8');
  let json = JSON.parse(file);
  return findByIndex(json, indexId);
}

/**
 * Load mock data
 * @exports
 * @param rootType - type of the date: ex. documents
 * @param subType - sub type, refers to json file name
 * @param objectId - id of the object to return
 * @returns {*}
 */
export function mockData(rootType, subType) {
  let rootPath = path.resolve(process.cwd(), 'test/mock-data');
  let file = fs.readFileSync(path.resolve(rootPath, rootType, `${subType}.json`), 'utf8');
  let json = JSON.parse(file);
  return processData(json);
}


/**
 * Sockets data setup
 * @param action
 * @param data
 */
global.socketsData = {};
global.socketsAllData = null;

/**
 * Set sockets data
 * ( set data for specific action )
 * @param action
 * @param data
 */
export function setSocketsData(action, data) {
  global.socketsData[action] = data;
}

/**
 * Set all sockets data
 * ( no mather what action, this will be always a data to use )
 * @param data
 */
export function setAllSocketsData(data) {
  global.socketsAllData = data;
}

/**
 * Clear sockets data
 */
export function resetSocketsData() {
  global.socketsData = {};
}

export function resetAllSocketsData() {
  global.socketsAllData = null;
}
