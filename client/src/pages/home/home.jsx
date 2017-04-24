import React from 'react';
import CategoryDialog from 'components/func/dialogs/category-dialog/category-dialog';

/**
 * React app class
 */
export default class PageHome extends React.Component {

  render() {
    return (
      <div className="layout-column flex">
        <section>
          <h2>Create new category</h2>
          <button>Create</button>
        </section>
        <CategoryDialog isOpen />
      </div>
    );
  }
}
