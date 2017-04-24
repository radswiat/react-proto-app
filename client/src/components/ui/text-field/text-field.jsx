import React from 'react';
import { HOC } from 'formsy-react';
import _TextField from 'material-ui/TextField';
// import 'components/validators/validators';
import { isDefined } from 'core/utils/utils';

/**
 * TextField
 * Is a decorated react-material TextField,
 * extended by validators support
 */
export class TextField extends React.Component {

  static propTypes = {
    // initial text-field value
    value: React.PropTypes.any,
    // material: The hint content to display.
    labelHint: React.PropTypes.string.isRequired,
    // material: The content to use for the floating label element.
    labelFloat: React.PropTypes.string.isRequired,
    // material: Name applied to the input.
    name: React.PropTypes.string.isRequired,
    // material: If true, the field receives the property width 100%.
    fullWidth: React.PropTypes.bool,
    // inform parent about input change
    // this is NOT preferred way due to bug: input looses focus when typing
    onChange: React.PropTypes.func,
    // inform parent about input change
    // this IS preferred way
    onBlur: React.PropTypes.func,
    // formsy props
    showRequired: React.PropTypes.func,
    showError: React.PropTypes.func,
    getErrorMessage: React.PropTypes.func,
    setValue: React.PropTypes.func,
    getValue: React.PropTypes.func
  };

  componentWillMount() {
    if (isDefined(this.props.value)) {
      this.props.setValue(this.props.value);
    }
  }

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  onChangeValue = (event, payload) => {
    this.props.setValue(payload);
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event, this.props.name, payload);
    }
  };

  onBlur = (event) => {
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(event, this.props.name, this.props.getValue());
    }
  };

  render() {
    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    const errorMessage = this.props.getErrorMessage();
    return (
      <_TextField
        hintText={this.props.labelHint}
        floatingLabelText={this.props.labelFloat}
        name={this.props.name}
        // this line has to stay as it is
        // it allows to bind between HOC and text-field
        value={this.props.getValue.call(this)}
        onBlur={this.onBlur}
        onChange={this.onChangeValue}
        fullWidth={this.props.fullWidth}
        autoFocus={this.props.autoFocus}
        errorText={errorMessage}
      />
    );
  }
}

export default HOC(TextField);
