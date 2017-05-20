import webpackConfig from './webpack-configs/webpack.dev';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';
import http from 'http';
import path from 'path';

async function start() {
  let app = express();

  let compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: false,
    quiet: false,
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    inline: true,
    stats: {
      colors: true
    }
  }));
  app.use(webpackHotMiddleware(compiler));

  // server
  let server = http.Server(app);
  server.listen(9090);
  console.log('listen on 9090');
}

export default start;
