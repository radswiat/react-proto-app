import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { merge } from 'lodash';
import routes from './routes';
import Store from './store/store';
import './styles/main.scss';
import { themeColors } from 'config';
import Color from 'color';

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

    // lets port material-ui colors to muiTheme colors
    let colors = {
      palette: {
        primary1Color: themeColors.accentColor,
        primary2Color: themeColors.primaryColor,
        primary3Color: themeColors.primaryColor,
        accent1Color: themeColors.accentColor,
        accent2Color: themeColors.accentColor,
        accent3Color: themeColors.accentColor,
        textColor: themeColors.primaryTextColor,
        alternateTextColor: themeColors.primaryTextColor,
        canvasColor: themeColors.primaryColorText,
        borderColor: themeColors.dividerColor,
        disabledColor: Color(themeColors.primaryColorDark).darken(0.3).toString(),
        pickerHeaderColor: themeColors.primaryColorDark,
        clockCircleColor: Color(themeColors.primaryColorDark).darken(0.07).toString(),
        shadowColor: themeColors.secondaryTextColor
      }
    };

    this.muiTheme = getMuiTheme(merge(colors, {
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
