import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';

import Dialog from 'components/func/dialog/dialog';
import RaisedButton from 'components/ui/raised-button/raised-button';
import TextField from 'components/ui/text-field/text-field';

export default class CategoryDialog extends React.Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired
  };

  render() {
    return (
      <div>
        <RaisedButton label="test" />,
        <Dialog
          title="Dialog With Actions"
          actions={[
            <RaisedButton label="CANCEL" />,
            <RaisedButton label="SAVE" primary />
          ]}
          // modal={false}
          open={this.props.isOpen}
          // onRequestClose={this.handleClose}
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
