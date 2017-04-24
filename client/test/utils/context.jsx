// set up Material ui for testing
import _ from 'lodash';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { themeConfig, themeColors } from '../../src/config';

/**
 * List of all contexts,
 * they can be merged together when calling context
 * @example:
 * context(['default', 'material']) -> will gives you context of default and material
 * @type {{material: (())}}
 * @private
 */
const _contextsList = {
  /**
   * Export context for material ui
   * @returns {{muiTheme}}
   */
  material: () => {
    const muiTheme = getMuiTheme(_.merge(themeConfig.muiTheme, {
      palette: themeColors[themeColors.theme]
    }));
    return {
      muiTheme
    };
  }
};

/**
 * Export context extended by options
 * @param options
 * @returns {{}}
 */
export default function getContext(options) {
  let _context = {};
  if (options && options.length) {
    for (let optionContext in options) {
      _context = _.merge(_context, _contextsList[options[optionContext]]());
    }
  }
  return _context;
}


