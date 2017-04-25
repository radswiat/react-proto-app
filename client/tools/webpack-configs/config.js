export const babelConfig = {
  babelrc: false,
  presets: [
    ['es2015', { "modules": false }],
    'react',
    'stage-2'
  ],
  plugins: [
    ['module-resolver', {
      root: ['./src/'],
      alias: aliasConfig
    }],
    'transform-runtime',
    'transform-decorators-legacy',
    'jsx-control-statements',
    'transform-react-constant-elements',
    'transform-react-inline-elements',
    'transform-react-remove-prop-types'
  ]
};

export const aliasConfig = {
  config: './config',
  components: './components',
  modules: './modules',
  core: './core',
  store: './store',
  pages: './pages'
};

export const webpackConfig = {
  outputPath: './build/'
};
