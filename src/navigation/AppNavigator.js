// Bootstrapped from the example app at https://reactnavigation.org/docs/guides/redux

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { SwitchNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';

import LoginScreen from '../screens/LoginScreen';
import MainNavigator from './MainNavigator';

export const RawNavigator = SwitchNavigator({
  Login: { screen: LoginScreen },
  Main: { screen: MainNavigator },
});

// react-navigation stuff
// Note: createReactNavigationReduxMiddleware must be run before
// createReduxBoundAddListener, which is why we create the middleware
// here instead of in store.js
export const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);
const addListener = createReduxBoundAddListener('root');

/**
 * Root navigator for the app.
 *
 * Per the documentation here: https://reactnavigation.org/docs/guides/redux
 * - We hook up react-navigation to store its state in the redux store
 * - We handle the Android back button explicitly
 */
class AppNavigator extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress() {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }

  render() {
    const { dispatch, nav } = this.props;
    const navigation = addNavigationHelpers({
      dispatch,
      state: nav,
      addListener,
    });

    return <RawNavigator navigation={navigation} />;
  }
}

AppNavigator.propTypes = {
  // redux dispatch function
  dispatch: PropTypes.func.isRequired,

  // react-navigation internal navigation state object
  nav: PropTypes.shape({}).isRequired,
};

function mapStateToProps(state) {
  return {
    nav: state.navigation,
  };
}

export default connect(mapStateToProps)(AppNavigator);
