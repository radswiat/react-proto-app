import chalk from 'chalk';

class Debug {

  TYPES = {
    REQUEST: {
      prefix: chalk.yellow.bold('REQUEST: '),
      color: 'green'
    }
  };

  log(type, msg) {
    console.log(`${this.TYPES[type].prefix} ${chalk[this.TYPES[type].color](msg)}`);
  }

}

let debug = new Debug();
export default debug;
