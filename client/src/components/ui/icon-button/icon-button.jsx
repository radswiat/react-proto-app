import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';
import CSSModules from 'react-css-modules';

import css from './scss/icon-button.scss';

/**
 * IconButton
 * Icon component that combines angular-material icons with mdi
 */
@CSSModules(css)
export default class IconButton extends React.Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    // size of the icon
    // supported:
    // xxl, xl, l
    size: PropTypes.string,
    light: PropTypes.bool,
    tooltip: PropTypes.string,
    tooltipKey: PropTypes.string,
    onClick: PropTypes.func,
    isListItem: PropTypes.bool,
    isListItemRight: PropTypes.bool,
    isMultiLineListItem: PropTypes.bool,
    isMultiLineListItemRight: PropTypes.bool,
    outerStyle: PropTypes.object,
    disableButtonRendering: PropTypes.bool,
    color: PropTypes.string,
    index: PropTypes.number,
    // dragula handle?
    handle: PropTypes.bool
  };

  render() {
    let uuid = this.props.tooltip + this.props.tooltipKey + this.props.type,
      index = this.props.index || 1,
      indexClass = '';

    if (!this.props.outerStyle) {
      this.props.outerStyle = {};
    }

    if (this.props.isMultiLineListItem || this.props.isListItem) {
      indexClass = `index-left-${index}`;
    } else {
      indexClass = `index-right-${index}`;
    }

    let iconTemplate = () => {
      return (
        <i
          className={
            cx([
              'mdi',
              `mdi-${this.props.type}`,
              this.props.handle ? 'dragula-handle' : '',
              this.props.color ? `mdi-color-${this.props.color}` : '',
              this.props.size ? `mdi-size-${this.props.size}` : '',
              this.props.light ? 'mdi-light' : ''
            ])
          }
          data-tip={this.props.tooltip}
          data-for={uuid}
          onClick={this.props.onClick} >
          <div className="md-ripple-container"></div>
        </i>
      );
    };

    // render just an icon, without a button,
    // usefull when u need to render icon inside a material ui button ( IB )
    if (this.props.disableButtonRendering) {
      return iconTemplate();
    }

    return (
      <button
        style={this.props.outerStyle}
        className={cx([
          'md-icon-button',
          'md-accent',
          'md-button',
          'md-ink-ripple',
          css[indexClass],
          this.props.isMultiLineListItem ? css['multiline-list-item'] : '',
          this.props.isListItem ? css['list-item'] : '',
          this.props.isListItemRight ? css['list-item-right'] : '',
          this.props.isMultiLineListItemRight ? css['multiline-list-item-right'] : ''
        ])}
      >
        {iconTemplate()}
        <If condition={this.props.tooltip} >
          <ReactTooltip id={uuid} className="react-tooltip-custom" />
        </If>
      </button>
    );
  }
}
