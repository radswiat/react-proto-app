import webpackConfig from './webpack-configs/webpack.dev';
import webpack from 'webpack';

async function start() {
  let compiler = webpack(webpackConfig);
  compiler.run((err, stats) => {
    console.log(stats);
  });
}

export default start;
