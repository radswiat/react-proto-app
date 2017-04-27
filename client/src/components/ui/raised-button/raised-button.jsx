import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import { isDefined } from 'core/utils/utils';
import _RaisedButton from 'material-ui/RaisedButton';
import { themeColors } from 'config';
import { clone } from 'lodash';

import css from './scss/raised-button.scss';

@CSSModules(css)
export default class RaisedButton extends React.Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    primary: PropTypes.bool,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    disabledFunc: PropTypes.func
  };

  static defaultProps = {
    primary: false
  };

  /**
   * Handle disabled props by:
   * - disabled prop
   * - disabledFunc prop
   * Disabled prop have special format of:
   * [this.state.form, 'title', 'description']
   * - first argument is a state where to look for props to be defined
   * - when all of those props are defined, button is not disabled
   * @returns {*}
   */
  handleDisabled = () => {
    if (isDefined(this.props.disabled)) {
      return this.props.disabled;
    }
    if (isDefined(this.props.disabledFunc)) {
      let disabledProps = clone(this.props.disabledFunc);
      let context = disabledProps.shift();
      if (isDefined(context)) {
        let allPropsPopulated = true;
        for (let prop of disabledProps) {
          if (!isDefined(context[prop])) {
            allPropsPopulated = false;
          }
        }
        return !allPropsPopulated;
      }
      return true;
    }
  };

  render() {
    let disabled = this.handleDisabled();
    return (
      <_RaisedButton
        label={this.props.label}
        primary={this.props.primary}
        onClick={this.props.onClick}
        backgroundColor={themeColors.primaryColorLight}
        disabledBackgroundColor={themeColors.secondaryTextColor}
        disabledLabelColor={themeColors.primaryColorText}
        className={css.className}
        disabled={disabled}
      />
    );
  }
}
