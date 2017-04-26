import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';

import { bindPayloadFormValue } from 'core/utils/utils';
import { SubContent } from 'components/ui/containers/containers';
import Dialog from 'components/func/dialog/dialog';
import RaisedButton from 'components/ui/raised-button/raised-button';
import TextField from 'components/ui/text-field/text-field';
import SelectField from 'components/ui/select-field/select-field';

export default class CategoryDialogPresenter extends React.Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    actionInsert: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.setState({
      isOpen: this.props.isOpen
    });
  }

  handleTextChange = (event, id, payload) => {
    bindPayloadFormValue.apply(this, [this.state.form, id, payload]);
  };

  handleCancel = () => {
    this.setState({
      isOpen: false
    });
  };

  handleSave = () => {
    console.error('handle save');
    this.props.actionInsert({test: 'asdasd'});
  };

  handleParentCategorySelect = (selectedParentCategory) => {
    this.setState({
      selectedParentCategory
    });
  };

  render() {
    return (
      <div>
        <RaisedButton label="test" />,
        <Dialog
          title="Create category"
          actions={[
            <RaisedButton label="CANCEL" onClick={this.handleCancel} />,
            <RaisedButton label="SAVE" primary onClick={this.handleSave} />
          ]}
          open={this.state.isOpen}
        >
          <Formsy.Form>
            <div className="layout-column">
              <TextField
                labelFloat="Title"
                name="title"
                onBlur={this.handleTextChange}
              />
              <TextField
                labelFloat="Description"
                name="description"
                onBlur={this.handleTextChange}
              />
            </div>
            <SubContent>
              <h3>Optional</h3>
              <SelectField
                name="children"
                onChange={this.handleParentCategorySelect}
                value={this.state.selectedParentCategory}
                placeholder="Parent category"
                options={[
                  {
                    label: 'Cat1',
                    value: '1'
                  },
                  {
                    label: 'Cat2',
                    value: '2'
                  }
                ]}
              />
            </SubContent>
          </Formsy.Form>
        </Dialog>
      </div>
    );
  }
}
