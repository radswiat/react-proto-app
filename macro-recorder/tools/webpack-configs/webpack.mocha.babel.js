import path from 'path';
import { themeColors } from '../../src/config.jsx';
import config from './config';
import webpack from 'webpack';

/**
 * Extend config alias
 */
config.MODULE_RESOLVER_ALIAS.utils = './test/utils';

/**
 * Babel config for:
 * - jsx babel loader
 * - eslint loader
 */
let babelrc = {
  babelrc: false,
  presets: [
    'es2015',
    'react',
    'stage-2'
  ],
  plugins: [
    ['module-resolver', {
      root: ['./src/'],
      alias: config.MODULE_RESOLVER_ALIAS
    }],
    ['istanbul', {
      exclude: [
        '**/*.spec.jsx'
      ]
    }],
    'transform-runtime',
    'transform-decorators-legacy',
    'jsx-control-statements',
    'transform-react-constant-elements',
    'transform-react-inline-elements',
    'transform-react-remove-prop-types'
  ]
};

const WebpackConfig = {
  devtool: 'inline-source-map',
  target: 'node',
  context: __dirname,
  resolve: {
    extensions: ['', '.jsx', '.js', '.html', '.png', '.svg', '.jpg', '.jpeg', '.png']
  },
  sassVars: {
    vars: {
      theme: themeColors[themeColors.theme]
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'istanbul-instrumenter-loader',
        query: babelrc
      }
    ],
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [
          path.resolve('src'),
          path.resolve('test/utils')
        ],
        query: babelrc
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [
          path.resolve('src')
        ],
        query: babelrc
      },
      {
        test: /\.scss$/,
        loaders: [
          'isomorphic-style-loader?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]',
          'sass?sourceMap',
          '@epegzz/sass-vars-loader'
        ]
      },
      {
        test: /\.css$/,
        loader: 'isomorphic-style-loader!css'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|ttf|svg|woff|woff2|ttf)(\?.*$|$)/,
        loader: 'url-loader'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ]
  },
  externals: {
    jsdom: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  plugins: [
    // we don't want to see any warnings during the tests
    // this will just hide react warnings, not errors
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
      ENV_MOCHA: true
    })
  ]
};

export default WebpackConfig;
