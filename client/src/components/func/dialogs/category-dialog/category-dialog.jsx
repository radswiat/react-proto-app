import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import insertCategory from 'store/actions/categories/insert-category';
import Presenter from './category-dialog.presenter';

export class CategoryDialog extends React.Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isReqired
  };

  componentWillMount() {
    this.setState({
      isOpen: this.props.isOpen
    });
  }

  actionInsert = (data) => {
    console.error('action insert');
    this.props.dispatch(insertCategory(data));
  };

  render() {
    return (
      <Presenter
        isOpen
        actionInsert={this.actionInsert}
      />
    );
  }
}

export default connect(
  /* istanbul ignore next */
  (store) => ({})
)(CategoryDialog);
