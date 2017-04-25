import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import _RaisedButton from 'material-ui/RaisedButton';
import { themeColors } from 'config';

import css from './scss/raised-button.scss';

@CSSModules(css)
export default class RaisedButton extends React.Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    primary: PropTypes.bool,
    onClick: PropTypes.func
  };

  static defaultProps = {
    primary: false
  };

  render() {
    return (
      <_RaisedButton
        label={this.props.label}
        primary={this.props.primary}
        onClick={this.props.onClick}
        backgroundColor={themeColors.primaryColorLight}
        className={css.className}
      />
    );
  }
}
