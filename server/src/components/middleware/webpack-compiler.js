import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import log from 'core/log/log';
import chalk from 'chalk';
import notify from '../../core/notify';
import gutil from 'gutil';

export default class devMiddleware {
  static apply(app, webpackConfig) {

    // // Uncomment for a debugging purpose
    // // using below compiler will allow you to see the output in src/build/
    // try {
    //   let compiler = webpack(webpackConfig);
    //   compiler.run((err, stats) => {
    //     gutil.log('[webpack:build]', stats.toString({
    //       chunks: false, // Makes the build much quieter
    //       colors: true
    //     }));
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
    try {
      let compiler = webpack(webpackConfig);
      app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        quiet: true,
        publicPath: webpackConfig.output.publicPath,
        hot: true,
        inline: true,
        stats: {
          colors: true
        },
        reporter: (res) => {
          let errors = res.stats.compilation.errors;
          if (errors.length) {
            log.status('Webpack build', false);
            notify('Webpack', '[ERRORS]');
            errors.forEach((error) => {
              console.log(chalk.red.bold(error.message));
            });
          } else {
            log.status('Webpack build', true);
            notify('Webpack', '[OK]');
          }
        }
      }));
      app.use(webpackHotMiddleware(compiler));
    } catch (err) {
      log.status('Webpack configuration', false);
      console.log(err);
    }
  }
}
