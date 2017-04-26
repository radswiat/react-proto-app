import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import css from './scss/sub-content.scss';

@CSSModules(css)
export default class CategoryDialogPresenter extends React.Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return (
      <div styleName="container" className="layout-column">
        <div styleName="inner-container" className="md-padding">
          {this.props.children}
        </div>
      </div>
    );
  }
}
