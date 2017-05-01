import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import ctx from 'classnames';
import CustomScroll from 'react-custom-scroll';
import { Link } from 'react-router-dom';

import IconButton from 'components/ui/icon-button/icon-button';
import css from './scss/page-navigation.scss';

@CSSModules(css)
export default class PageNavigation extends React.Component {

  static propTypes = {

  };

  static contextTypes: {
    router: PropTypes.object.isRequired
  };

  state = {
    compact: false
  };

  goTo = (url) => {
    console.warn('---- go to -----');
    console.log(this.context);
    // browserHistory.push(url);
    // this.context.router.push(url);
  };

  switchNavType = () => {
    let compact = this.state.compact;
    this.setState({
      compact: !compact
    });
  };

  render() {
    return (
      <div
        className={ctx(
          this.state.compact ? css['compact-container'] : css['extended-container'],
          'layout-column md-stretch'
        )}
      >
        <div styleName="header" className="md-toolbar md-toolbar-shadow md-accent-3">
          <div className="md-toolbar-tools">
            <Link to="/">
              <img src="public/logo.png" />
            </Link>
            <span styleName="logo-text" />
            <span className="flex" />
            <IconButton
              type="backburger"
              size="xl"
              onClick={this.switchNavType}
              light
            />
          </div>
        </div>
        <CustomScroll flex="1">
          <div styleName="content" className="layout-column flex md-accent-3 md-hue-1">
            <h3>Overview</h3>
            <ul>
              <li styleName="menu-element">
                <Link to="/">
                  <i className="mdi mdi-view-dashboard" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li styleName="menu-element">
                <Link to="/manage-categories">
                  <i className="mdi mdi-airplane-takeoff" />
                  <span>Categories management</span>
                </Link>
              </li>
            </ul>
          </div>
        </CustomScroll>
      </div>
    );
  }
}
