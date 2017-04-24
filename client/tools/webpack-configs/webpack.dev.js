import path from 'path';
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
import { themeColors } from '../../src/config';
import config from './config';

/**
 * TODO: add description
 * @type {string}
 */
let BASE_PATH = './';

/**
 * TODO: add description
 * @type {string}
 */
let PUBLIC_PATH = '';

/**
 * Babel config for:
 * - jsx babel loader
 * - eslint loader
 */
let babelrc = {
  babelrc: false,
  presets: [
    ['es2015', { "modules": false }],
    'react',
    'stage-2'
  ],
  plugins: [
    ['module-resolver', {
      root: ['./src/'],
      alias: config.MODULE_RESOLVER_ALIAS
    }],
    'transform-runtime',
    'transform-decorators-legacy',
    'jsx-control-statements',
    'transform-react-constant-elements',
    'transform-react-inline-elements',
    'transform-react-remove-prop-types',
    // 'react-css-modules'
  ]
};

const WebpackConfig = {
  devtool: 'eval',
  context: __dirname,
  entry: {
    index: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      // 'webpack/hot/dev-server',
      path.resolve(BASE_PATH, 'src/client.jsx')
    ]
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(process.cwd(), config.OUTPUT_PATH),
    publicPath: `/${PUBLIC_PATH}`
  },
  resolve: {
    extensions: ['.jsx', '.js', '.html', '.png', '.svg', '.jpg', '.jpeg', '.png']
  },
  module: {
    rules: [
      // {   // eslint feature
      //   enforce: 'pre',
      //   test: /\.jsx$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: 'eslint-loader',
      //       options: {
      //         failOnWarning: false,
      //         failOnError: false
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.jsx$/,
        // loader: 'babel-loader',
        use: [
          {
            loader: 'babel-loader',
            options: babelrc
          }
        ],
        include: [
          path.resolve('src')
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]_[local]_[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: '@epegzz/sass-vars-loader',
            options: {
              vars: themeColors
            }
          }
        ]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css'
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
      { context: path.resolve(BASE_PATH, 'src/public'), from: '**/*', to: 'public' },
      { context: path.resolve(BASE_PATH, 'src/'), from: 'index.html', to: 'index.html' }
    ]),
    new webpack.DefinePlugin({
      DEV_BUILD: true,
      ENV_MOCHA: false
    }),
    new webpack.IgnorePlugin(/(locale)/, /node_modules.+(momentjs)/)
  ]
};

export default WebpackConfig;
