import React from 'react';
import PropTypes from 'prop-types';
import _Dialog from 'material-ui/Dialog';
import CSSModules from 'react-css-modules';

import css from './scss/dialog.scss';

@CSSModules(css)
export default class Dialog extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    actions: PropTypes.array.isRequired,
    open: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
    modal: PropTypes.bool
  };

  render() {
    return (
      <_Dialog
        title={this.props.title}
        actions={this.props.actions}
        modal={this.props.modal}
        open={this.props.open}
        bodyClassName={css.bodyClassName}
        actionsContainerClassName={css.actionsContainerClassName}
        className={css.className}
        contentClassName={css.contentClassName}
        overlayClassName={css.overlayClassName}
        titleClassName={css.titleClassName}
      >
        {this.props.children}
      </_Dialog>
    );
  }
}
