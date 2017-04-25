import { debugConfig } from 'config';
import { isDefined } from 'core/utils/utils';
import { env } from 'config';

class Debug {

  PREF_CSS = 'background: orange; font-weight: bold; color: white; padding: 2px;';
  DATA_CSS = 'background: orange; font-weight: bold; color: white; padding: 2px;';

  TYPES = {
    SERVER_RESPONSE: {
      pref: 'REQUEST',
      css: 'background: green; font-weight: bold; color: white; padding: 2px;'
    },
    ERROR_CRITICAL: {
      pref: 'PHOENIX C',
      css: 'background: #fd3737; font-weight: bold; color: white; padding: 2px;'
    },
    ERROR: {
      pref: 'PHOENIX E',
      css: 'background: #ff8f8f; font-weight: bold; color: white; padding: 2px;'
    },
    ERROR_MINOR: {
      pref: 'PHOENIX ERROR MINOR',
      css: 'background: #ffd5d5; color: gray; padding: 0px 5px; font-size: 10px;'
    }
  };

  log(type, msg, data) {
    // do not print anything during the mocha tests
    if (env.MOCHA) {
      return;
    }
    if (!isDefined(debugConfig[type]) || !debugConfig[type]) {
      return;
    }

    let dataSuffix = '';
    if (data) {
      dataSuffix = '%c DATA:';
    }
    console.log(
      `%c ${this.TYPES[type].pref} %c ${msg} ${dataSuffix}`,
      this.PREF_CSS,
      this.TYPES[type].css,
      (data) ? this.DATA_CSS : ''
    );
    if (data) {
      console.log(data);
    }
  }

}

let debug = new Debug();
export default debug;
