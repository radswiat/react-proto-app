import React from 'react';
import PropTypes from 'prop-types';
import PageNavigation from 'modules/page-navigation/page-navigation';

if (module.hot) {
  module.hot.accept();
}

/**
 * React Main app
 * @desc
 * App is a wrapper for the whole app,
 * its used for layout purpose at least for now,
 * but will be extended in the future.
 */
export default class App extends React.Component {

  /**
   * propTypes
   * @property {children} ReactElement
   */
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  /**
   * Render
   * @protected
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div className="layout-column flex">
        <div className="layout-row flex stretch">
          <PageNavigation />
          <div className="layout-column flex md-stretch page-content-main">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
