import React, { PropTypes } from 'react';
import { HOC } from 'formsy-react';
import Select from 'react-select';
import CSSModules from 'react-css-modules';

import css from './scss/select-field.scss';

@CSSModules(css)
export class SelectField extends React.Component {

  static propTypes = {
    name: PropTypes.string.required,
    onChange: PropTypes.func.required,
    value: PropTypes.string,
    multi: PropTypes.bool,
    simpleValue: PropTypes.bool,
    noResultsText: PropTypes.string,
    placeholder: PropTypes.string
  };

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue = (payload) => {
    this.props.setValue(payload);
    this.props.onChange(payload, this.props.name);
  };

  render() {
    return (
      <div>
        <Select
          className={css.container}
          name={this.props.name}
          placeholder={this.props.placeholder}
          noResultsText={this.props.noResultsText}
          value={this.props.value}
          onChange={this.changeValue}
          options={this.props.options}
          autoBlur={false}
          multi={this.props.multi}
          simpleValue={this.props.simpleValue}
        />
      </div>
    );
  }
}

export default HOC(SelectField);
