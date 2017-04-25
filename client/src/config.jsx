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
  primaryColorDark:   '#455A64',
  primaryColor:       '#607D8B',
  primaryColorLight:  '#CFD8DC',
  primaryColorText:   '#FFFFFF',
  accentColor:        '#FFC107',
  primaryTextColor:   '#212121',
  secondaryTextColor: '#757575',
  dividerColor:       '#e4e4e4'
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
