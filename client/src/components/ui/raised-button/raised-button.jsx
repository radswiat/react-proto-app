import React from 'react';
import PropTypes from 'prop-types';
import _RaisedButton from 'material-ui/RaisedButton';

export default class RaisedButton extends React.Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    primary: PropTypes.bool
  };

  static defaultProps = {
    primary: false
  };

  render() {
    return (
      <_RaisedButton label={this.props.label} primary={this.props.primary} />
    );
  }
}
