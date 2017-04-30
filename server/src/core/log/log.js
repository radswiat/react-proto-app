import chalk from 'chalk';
import ansiStrip from 'strip-ansi';
import LogBufferSave from './log-buffer-save';
import moment from 'moment';

class Log {

  static options = {
    logLineLength: 68,
    logPath: './log'
  };

  static fillSpace(...strings) {
    let count = strings.reduce((s, n) => {
      if (s) {
        if (typeof s === 'string') {
          s = ansiStrip(s).length;
        }
      }
      if (n) {
        if (typeof n === 'string') {
          n = ansiStrip(n).length;
        }
      }
      return s + n;
    }, 0);

    let string = '';
    for (let i = (Log.options.logLineLength - count ); i > 0; i-- ) {
      string += '.';
    }
    return string;
  }

  _getTimestamp() {
    let now = moment();
    return chalk.gray(`${now.format('HH:ss:mm')}  `);
  }

  constructor() {
    this.options = Log.options;
  }

  clear() {
    process.stdout.write('\u001B[2J\u001B[0;0f');
    process.stdout.write('\u001b[2J\u001b[0;0H');
    process.stdout.write('\x1B[2J\x1B[0f\u001b[0;0H');
    console.log('\x1Bc');
    process.stdout.write('\x1Bc');
  }

  log(msg) {
    console.log(chalk.bgBlack.cyan.bold(`${msg}${Log.fillSpace(msg)}`));
  }

  status(msg, status, statusMsg) {
    let ts = this._getTimestamp();
    let s = status ? chalk.green.bold(`[${statusMsg || 'OK'}]`) : chalk.red.bold(`[${statusMsg || 'ERR'}]`);
    let logContent = (
      ts +
      chalk.bgBlack.cyan.bold(
        `${msg}${Log.fillSpace(msg,s,ts)}${s}`
      )
    );
    console.log(logContent);
    LogBufferSave.save(logContent);
  }

  info(msg, info) {
    let ts = this._getTimestamp();
    let logContent = (
      ts +
      chalk.bgBlack.cyan.bold(
        `${msg}${Log.fillSpace(msg,ts,`[${info}]`)}${chalk.cyan.bold(`[${info}]`)}`
      )
    );
    console.log(logContent);
    LogBufferSave.save(logContent);
  }

  error(name, err) {
    let ts = this._getTimestamp();
    let logContent = (
      ts +
      chalk.bgBlack.red.bold(name) + ' ' +
      chalk.bgBlack.bgRed.black(err.message) + '\r\n' +
      chalk.bgBlack.red.bold(err.stack)
    );
    console.log(logContent);
    LogBufferSave.save(logContent);
  }

  welcome() {
    this.clear();
    let wlog = (msg) => {
      let logContent = chalk.bgBlack.cyan.bold(msg);
      console.log(logContent);
      LogBufferSave.save(logContent.replace(/\s/g, '&nbsp;'));
    };
    wlog('#                                                                  #');
    wlog('                             NIGHTWATCH                             ');
    wlog('                                                                    ');
    wlog('      *                                                            *');
    wlog('                              aaaaaaaaaaaaaaaa               *      ');
    wlog('                          aaaaaaaaaaaaaaaaaaaaaaaa                  ');
    wlog('                       aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa               ');
    wlog('                     aaaaaaaaaaaaaaaaa           aaaaaa             ');
    wlog('                   aaaaaaaaaaaaaaaa                  aaaa           ');
    wlog('                  aaaaaaaaaaaaa aa                      aa          ');
    wlog(' *               aaaaaaaa      aa                         a         ');
    wlog('                 aaaaaaa aa aaaa                                    ');
    wlog('           *    aaaaaaaaa     aaa                                   ');
    wlog('                aaaaaaaaaaa aaaaaaa                               * ');
    wlog('                aaaaaaa    aaaaaaaaaa                               ');
    wlog('                aaaaaa a aaaaaa aaaaaa                              ');
    wlog('                 aaaaaaa  aaaaaaa                                   ');
    wlog('                 aaaaaaaa                                 a         ');
    wlog('                  aaaaaaaaaa                            aa          ');
    wlog('                   aaaaaaaaaaaaaaaa                  aaaa           ');
    wlog('                     aaaaaaaaaaaaaaaaa           aaaaaa        *    ');
    wlog('       *               aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa               ');
    wlog('                          aaaaaaaaaaaaaaaaaaaaaaaa                  ');
    wlog('                       *      aaaaaaaaaaaaaaaa                      ');
    wlog('#                                                                  #');
    wlog(`#                     Nightwatch starting up....                    `);
    wlog('#                                                                  #');
  }

}

export default new Log();
