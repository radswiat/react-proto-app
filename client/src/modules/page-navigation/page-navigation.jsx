import React from 'react';
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

  state = {
    compact: false
  };

  goTo = (url) => {
    this.context.router.push(url);
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
            <img src="public/logo.png"
                 onClick={
                   () => this.goTo('/home')
                 }
            />
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
              <li
                styleName="menu-element"
                onClick={() => this.goTo('/')}
              >
                <i className="mdi mdi-view-dashboard" />
                <span>Dashboard</span>
              </li>
              <li
                styleName="menu-element"
                onClick={() => this.goTo('/releases')}
              >
                <i className="mdi mdi-airplane-takeoff" />
                <span>Tests management</span>
              </li>
              <li
                styleName="menu-element"
                onClick={() => this.goTo('/releases')}
              >
                <i className="mdi mdi-airplane-takeoff" />
                <span>Modules management</span>
              </li>
              <li
                styleName="menu-element"
                onClick={() => this.goTo('/releases')}
              >
                <i className="mdi mdi-airplane-takeoff" />
                <span>Tests log</span>
              </li>
              <li
                styleName="menu-element"
                onClick={() => this.goTo('/releases')}
              >
                <i className="mdi mdi-airplane-takeoff" />
                <span>Schedules</span>
              </li>
            </ul>
          </div>
        </CustomScroll>
      </div>
    );
  }
}
