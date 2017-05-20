import http from 'http';
import htmlParser from 'htmlparser2';
import webdriver from 'selenium-webdriver';
import 'chromedriver';
import express from 'express';
const router = express.Router();
const Stream = require('stream').Transform;
import chalk from 'chalk';

export default class MacroInjector {
  constructor(app) {
    this.html = '';
    this.app = app;
    this.loadWebpage({
      browser: 'chrome',
      url: 'http://www.productsandservices.bt.com/products/'
    });
    this.serve();
    this.overwriteRequests({
      domain: 'http://www.productsandservices.bt.com/'
    });
  }

  /**
   * Serve website
   */
  serve() {
    this.app.get('/macro', (req, res) => {
      res.header('Content-Type', 'text/html');
      res.send(this.injectMacroRecorder(this.html));
    });
  }

  /**
   * Load webpage
   * @returns {Promise.<void>}
   */
  async loadWebpage({ browser, url }) {
    // start webdriver
    let driver = new webdriver.Builder()
      .forBrowser(browser)
      .build();

    // load page into web-driver
    driver.get(url);
    // get html element
    let element = driver.findElement(webdriver.By.tagName('html'));
    // get html content
    let contents = await driver.executeScript('return arguments[0].innerHTML;', element);
    // parse
    this.html = contents;
  }

  injectMacroRecorder(html) {
    html = html.replace(/(<\/body>)/, '<div id="__MACRO_RECORDER_CONTAINER"></div><script type="text/javascript" src="./macro-recorder/index-bundle.js"></script></body>');
    return html;
  }

  /**
   * Overwrite resources requests
   * @param domain
   */
  overwriteRequests({ domain }) {
    this.app.get('*', (req, res, next) => {
      console.log(chalk.bgBlue.white.bold('-------- http * request --------'));
      console.log(req.url);
      let contentType = null;
      let externalDomain = false;
      let url = null;

      // if content is undefined ?????
      if (/(\/undefined\/)/.test(req.url)) {
        externalDomain = true;
        req.url = req.url.replace(/(\/undefined\/\/)/, '');
      }

      if (!externalDomain) {
        url = `${domain}${req.url}`;
      } else {
        url = `http://${req.url}`;
      }

      console.log(url);

      if (/(\.js)$/.test(url)) {
        console.log(chalk.bgYellow.black.bold('type: js'));
        contentType = 'application/javascript';
      } else

      if (/(\.css)$/.test(url)) {
        console.log(chalk.bgYellow.black.bold('type: css'));
        contentType = 'text/css';
      } else

      if (/(\.png)$/.test(url)) {
        console.log(chalk.bgYellow.black.bold('type: png'));
        contentType = 'image/png';
      } else

      if (/(\.jp?eg)$/.test(url)) {
        console.log(chalk.bgYellow.black.bold('type: jpg'));
        contentType = 'image/jpeg';
      } else {
        console.log(chalk.bgYellow.black.bold('type: js'));
        contentType = 'application/javascript';
      }

      http.request(url, (response) => {
        let data = new Stream();

        response.on('data', (chunk) => {
          data.push(chunk);
        });

        response.on('end', () => {
          res.header('Content-Type', contentType);
          res.send(data.read());
        });
      }).end();
    });
  }
}
