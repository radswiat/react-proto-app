import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './styles/main.scss';
import $ from 'jquery';

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
    this.awaitHotReload();
    this.render();
  }

  awaitHotReload() {
    // if (module.hot) {
    //   module.hot.accept('./routes', () => {
    //     this.render();
    //   });
    // }
  }

  render() {
    render(
      <div>
        <h3>Nightwatch - Macro Recorder</h3>
        Record any macro!
      </div>,
      document.getElementById('__MACRO_RECORDER_CONTAINER')
    );
  }
}

App.bootstrap();

// dom detector
let prevElement = null;
$('body').on('mousemove', (event) => {
  let x = event.clientX, y = event.clientY;
  let elementMouseIsOver = document.elementFromPoint(x, y);

  if (prevElement) {
    $(prevElement).css({
      transition: 'none',
      outline: 'none',
      'outline-offset': '0px'
    });
  }

  prevElement = elementMouseIsOver;
  $(elementMouseIsOver).css({
    transition: 'outline 0.55s linear',
    outline: 'rgb(8, 253, 49) inset 3px',
    'outline-offset': '0px'
  });
});
