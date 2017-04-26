import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function ConnectDecorator(userStoreDef, context) {
  console.error('----- decorator -------');
  let storeProps = [];

  let mapStateToProps = (store) => {
    console.error('-------- map state to props ----------');
    let userStore = userStoreDef(store);

    // export mapped props to redux
    let mappedProps = {};
    Object.keys(userStore).map((i) => {
      storeProps.push(i);
      mappedProps[i] = store[userStore[i].$in];
    });
    console.warn('props', mappedProps);
    return mappedProps;
  };
  //
  // let mapDispatchToProps = (dispatch) => {
  //
  // };

  return function (DecoratedComponent) {
    console.warn(DecoratedComponent);
    class Decorator extends React.Component {
      static propTypes = {
        dispatch: PropTypes.func.isRequired
      };

      isLoading = true;

      // getChildContext() {
      //   return context;
      // }
      render() {

        // if all props have data, render!
        console.error('------- render ---------');
        for (let storeProp of storeProps) {
          if (this.props[storeProp] && this.props[storeProp].length) {
            this.isLoading = false;
          }
        }

        return (
          <DecoratedComponent {...this.props} isLoading={this.isLoading} />
        );
      }
    }
    return connect(mapStateToProps)(Decorator);
  }
}
