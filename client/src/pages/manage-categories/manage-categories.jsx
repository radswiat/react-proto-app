import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import css from './scss/manage-categories.scss';

/**
 * React app class
 */
export class ManageCategories extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      Trainer: PropTypes.object
    }).isRequired
  };

  static qgl = gql`
    {
      getCategoryById(categoryId: 5) {
        title,
        description,
        parent
      }
    }
  `;

  render() {
    return (
      <div className="layout-column flex">
        Manage categories
      </div>
    );
  }
}


// console.error(' ----- graphql query -----');
// console.warn(TrainerQuery);
//
export default graphql(ManageCategories.qgl)(ManageCategories);
