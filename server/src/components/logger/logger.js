import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import mkdirp from 'mkdirp';
import moment from 'moment';
import config from '../../config';

class Logger {
  save(logName, msg) {
    try {
      // log filename
      let fileName = moment().format('DD_MM_YYYY');
      let fileDir = path.resolve(config.SYSTEM_PATHS.logs);
      let filePath = path.resolve(config.SYSTEM_PATHS.logs, `${logName}-${fileName}.txt`);

      mkdirp.sync(fileDir);

      // if file log not exists?
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, `Phoenix Log: ${moment().format('DD MM YYYY' + '\r\n')}`);
      }

      let contents = fs.readFileSync(filePath, 'utf8');
      contents += msg;
      fs.writeFileSync(filePath, contents);
    } catch (err) {
      console.log(chalk.red('Logger: error:'));
      console.log(err);
    }
  }

  log(logName, msg) {
    let time = moment().format('HH:mm:ss');
    this.save(logName, `${time} ${msg} \r\n`);
  }
}

let logger = new Logger();
export default logger;
