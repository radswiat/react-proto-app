import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';

import Dialog from 'components/func/dialog/dialog';
import RaisedButton from 'components/ui/raised-button/raised-button';
import TextField from 'components/ui/text-field/text-field';

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

  handleCancel = () => {
    this.setState({
      isOpen: false
    });
  };

  handleSave = () => {
    console.error('handle save');
    this.props.actionInsert({test: 'asdasd'});
  };

  render() {
    return (
      <div>
        <RaisedButton label="test" />,
        <Dialog
          title="Dialog With Actions"
          actions={[
            <RaisedButton label="CANCEL" onClick={this.handleCancel} />,
            <RaisedButton label="SAVE" primary onClick={this.handleSave} />
          ]}
          open={this.state.isOpen}
        >
          The actions in this window were passed in as an array of React objects.
          <Formsy.Form>
            <TextField labelFloat="test" labelHint="test2" name="test"/>
          </Formsy.Form>
        </Dialog>
      </div>
    );
  }
}
