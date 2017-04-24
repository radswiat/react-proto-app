const config = {
  // Build output path
  // - based on process path ( from where u run npm )
  OUTPUT_PATH: './build/',
  MODULE_RESOLVER_ALIAS: {
    config: './config',
    components: './components',
    modules: './modules',
    core: './core',
    store: './store',
    pages: './pages'
  },
  AUTOPREFIXER_BROWSERS: [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 31',
    'Explorer >= 9',
    'iOS >= 7',
    'Opera >= 12',
    'Safari >= 7.1'
  ]
};

export default config;
