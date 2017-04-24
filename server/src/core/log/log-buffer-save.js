import { isDefined, saveFile, readFile } from 'core/utils';
import AnsiHtmlConvert from 'ansi-to-html';
import { clone } from 'lodash';
import moment from 'moment';
import path from 'path';

let ansiHtml = new AnsiHtmlConvert();

/**
 * Save log to file using buffer
 * - it means that log will be saved at a save request time unless there is a save in progress,
 *   it that case, it will wait till current save is finished
 */
class LogBufferSave {

  buffers = {};
  saveInProgressPromise = null;
  logPath = '../storage/logs';

  /**
   * Save
   * - save log to a file
   * @public
   * @param content
   * @param type
   */
  save(content, type = 'log') {
    if (!isDefined(this.buffers[type])) {
      this.buffers[type] = [];
    }
    this.buffers[type].push(content);
    this._pushSaveQue();
  }

  /**
   * Push a save que
   * - return if save in progress
   * - create a save promise, and loop through all buffers to save file
   * - remove saved items from buffer
   * @returns {Promise.<void>}
   * @private
   */
  async _pushSaveQue() {
    if ( this.saveInProgressPromise ) {
      return;
    }
    this.saveInProgressPromise = new Promise(async (resolve) => {
      for (let i in this.buffers) {
        let buffer = clone(this.buffers[i]);
        this.buffers[i] = [];
        await this._bufferToFile(i, buffer);
      }
      resolve();
    });
    await this.saveInProgressPromise;
    this.saveInProgressPromise = null;
  }

  /**
   * Save buffer to file
   * - set a path for the file log by dates
   * - include a template when creating a new log file
   * @param type
   * @param buffer
   * @returns {Promise.<*>}
   * @private
   */
  async _bufferToFile(type, buffer) {
    let content = ansiHtml.toHtml(buffer.join('<br />'));
    // by date,
    let now = moment();
    // generate filePath by the date in folder format like YYYY/MMMM/DD/file.html
    let filePath = path.resolve(this.logPath, now.format('YYYY'), now.format('MMMM'), now.format('DD'));
    // check if log file already exists
    // if not, include the template.html to a log file
    let file = await readFile(path.resolve(filePath, `${type}.html`));
    if (!file) {
      let html = await readFile(path.resolve(__dirname, 'template.html'));
      content = html + content;
    }
    return saveFile(filePath, `${type}.html`, (`<br />${content}`));
  }
}

export default new LogBufferSave();
