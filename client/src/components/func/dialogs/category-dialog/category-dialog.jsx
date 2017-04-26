import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import store from 'store/store';
import { connect } from 'core/live-store/live-store';

import insertCategory from 'store/actions/categories/insert-category';
import Presenter from './category-dialog.presenter';

export class CategoryDialog extends React.Component {

  static propTypes = {
    isLoading: PropTypes.bool,
    isOpen: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isReqired
  };

  componentWillMount() {
    this.setState({
      isOpen: this.props.isOpen
    });
    console.error('==============================');
    console.log(this.props);
  }

  actionInsert = (data) => {
    console.error('action insert');
    this.props.dispatch(insertCategory(data));
  };

  render() {
    return (
      <div>
        <Choose>
          <When condition={this.props.isLoading}>
            Loading!
          </When>
          <Otherwise>
            Not loading:)
          </Otherwise>
        </Choose>
        <Presenter
          isOpen
          actionInsert={this.actionInsert}
        />
      </div>
    );
  }
}

export default connect(
  /* istanbul ignore next */
  (store) => ({
    categories: {
      $in: 'categories',
      $where: null
    }
  })
)(CategoryDialog);
