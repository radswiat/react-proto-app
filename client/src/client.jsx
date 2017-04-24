import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { themeConfig, themeColors } from './config';
import _ from 'lodash';
import routes from './routes';
import Store from './store/store';
import './styles/main.scss';

/**
 * React App
 * - set muiTheme
 * - create store
 * - create history
 * - render
 */
class App {

  static bootstrap() {
    return new App();
  }

  constructor() {
    injectTapEventPlugin();
    this.setMuiTheme();
    this.createStore();
    this.createHistory();
    this.awaitHotReload();
    this.render();
  }

  /**
   * Define material-ui theme
   */
  setMuiTheme() {
    this.muiTheme = getMuiTheme(_.merge(themeConfig.muiTheme, {
      palette: themeColors[themeColors.theme]
    }));
  }

  createStore() {
    this.store = Store.createStore();
  }

  createHistory() {
    this.history = createBrowserHistory();
  }

  awaitHotReload() {
    if (module.hot) {
      module.hot.accept('./routes', () => {
        this.render();
      });
    }
  }

  render() {
    render (
      <Provider store={this.store}>
        <MuiThemeProvider muiTheme={this.muiTheme}>
          {routes(this.history, this.store)}
        </MuiThemeProvider>
      </Provider>,
      document.getElementById('app')
    )
  }
}

let app = App.bootstrap();
