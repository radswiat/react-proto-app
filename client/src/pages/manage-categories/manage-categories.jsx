import React from 'react';
import CSSModules from 'react-css-modules';

import css from './scss/manage-categories.scss';

/**
 * React app class
 */
@CSSModules(css)
export default class ManageCategories extends React.Component {

  render() {
    return (
      <div className="layout-column flex">
        Manage categories
      </div>
    );
  }
}
