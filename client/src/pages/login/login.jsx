import React from 'react';
import CSSModules from 'react-css-modules';

import css from './scss/login.scss';

/**
 * React app class
 */
@CSSModules(css)
export default class PageLogin extends React.Component {

  render() {
    return (
      <div className="layout-column flex">
        <div styleName="video-overlay" />
        <video autoPlay muted loop>
          <source src="public/vid.mp4" type="video/mp4" />
        </video>
        Login page
      </div>
    );
  }
}
