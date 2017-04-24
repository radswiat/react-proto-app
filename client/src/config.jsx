/* global ENV_MOCHA */

export const env = {
  MOCHA: typeof ENV_MOCHA !== 'undefined' ? ENV_MOCHA : false
};

// nav header: 1A6B94
// nav body : #37474F
// page body: #d0d0d0

/**
 * Theme Colors,
 * with every change, webpack restart is required!
 */
export const themeColors = {
    primary1Color: '#1A6B94', // approved
    primary2Color: '#01609A',
    primary3Color: '#B7DAFF',

    // default accent values
    textColor: '#717171',
    textAltColor: '#FFFFFF',
    textAltSecColor: '#DDDDDD',
    textHColor: '#717171',
    textHAltColor: '#FFFFFF',
    hoverColor: '#027DB3',
    backgroundColor: '#303030',
    background2Color: '#f5f5f5',
    borderColor: '#DCDCDC',

    // accent 1
    accent1Color: '#37474F',
    accent1Hue1Color: '#FF4081',
    accent1Hue2Color: '#FFCDD7',
    accent1Hue3Color: '#FFFFFF',
    // accent values
    accent1TextColor: '#717171',
    accent1TextAltColor: '#FFFFFF',
    accent1TextHColor: '#717171',
    accent1TextHAltColor: '#FFFFFF',
    accent1HoverColor: '#027DB3',
    accent1BackgroundColor: '#FFF',
    accent1Background2Color: '#f5f5f5',
    accent1BorderColor: '#DCDCDC',

    // accent 2
    accent2Color: '#ffab00', // approved
    accent2Hue1Color: '#d6d6d6',
    accent2Hue2Color: '#BCBCBC',
    accent2Hue3Color: '#FFFFFF',
    // accent values
    accent2TextColor: '#bdbec2',
    accent2TextAltColor: '#BCBCBC',
    accent2TextHColor: '#686b68',
    accent2TextHAltColor: '#FFFFFF',
    accent2HoverColor: '#027DB3',
    accent2BackgroundColor: '#FFF',
    accent2Background2Color: '#f5f5f5',
    accent2BorderColor: '#595959',

    // accent 3
    accent3Color: '#322748', // '#383C48',
    accent3Hue1Color: '#251F31', // '#2D323E',
    accent3Hue2Color: '#1d172a',
    accent3Hue3Color: '#E6E6E8',
    // accent values
    accent3TextColor: '#bdbec2',
    accent3TextAltColor: '#BCBCBC',
    accent3TextHColor: '#686b68',
    accent3TextHAltColor: '#FFFFFF',
    accent3HoverColor: '#027DB3',
    accent3BackgroundColor: '#FFF',
    accent3Background2Color: '#f5f5f5',
    accent3BorderColor: '#595959',

    // material ui values
    alternateTextColor: '#FFFFFF',
    canvasColor: '#FFFFFF',
    disabledColor: '#BDBDBD',
    pickerHeaderColor: '#FAEDC7',

    // panels
    panelAccentDefault: '#027DB3',
    panelAccentManagement: '#673ab7',
    panelAccentError: '#b33302'
};

/**
 * I think this is now deprecated and can be removed ?
 * TODO: remove
 * @deprecated
 */
export const themeConfig = {
  theme: 'themeDefault',
  sideNavWidth: '240px',
  muiTheme: {}
};

/**
 * Debug configuration
 * @type {{
 * debugger: {skipFormValidation: boolean},
 * SERVER_RESPONSE: boolean,
 * ERROR_CRITICAL: boolean,
 * ERROR: boolean,
 * ERROR_MINOR: boolean
 * }}
 */
export const debugConfig = {
  debugger: {
    skipFormValidation: false
  },
  SERVER_RESPONSE: true,
  ERROR_CRITICAL: true,
  ERROR: true,
  ERROR_MINOR: true
};

/**
 * Routes config
 * @type {{
 * home: string, login: string,
 * documentView: string,
 * documentViewInsert: string,
 * documentViewEdit: string,
 * documentsManagement: string,
 * documentsManagementCreate: string,
 * documentsManagementEdit: string,
 * collectionView: string,
 * collectionViewInsert: string,
 * collectionViewEdit: string,
 * collectionsManagement: string,
 * collectionsManagementCreate: string,
 * collectionsManagementEdit: string,
 * globalCategories: string,
 * globalCategoriesCreate: string,
 * globalCategoriesEdit: string
 * }}
 */
export const routesConfig = {
  home: '/',
  login: '/login'
};

/**
 * Routes resolver config
 */
export const routesResolver = {
  getHome: () => {
    return routesConfig.home;
  },
  getLogin: () => {
    return routesConfig.login;
  }
};
