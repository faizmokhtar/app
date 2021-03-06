import React from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, Dimensions, Platform } from 'react-native';
import {
  StackNavigator,
  TabNavigator,
} from 'react-navigation';
import expo, { LinearGradient } from 'expo';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import PatreonScreen from '../screens/PatreonScreen';
import PodcastsScreen from '../screens/PodcastsScreen';
import MeditationsScreen from '../screens/MeditationsScreen';
import DrawerContent from '../navigation/DrawerContent';

const { DrawerLayout } = expo.DangerZone.GestureHandler;

const Tabs = TabNavigator({
  Home: { screen: HomeScreen },
  Podcasts: { screen: PodcastsScreen },
  Meditations: { screen: MeditationsScreen },
}, {
  ...TabNavigator.Presets.iOSBottomTabs,
  tabBarOptions: {
    activeTintColor: '#F95A57',
    inactiveTintColor: '#D2D2D2',
    style: {
      borderTopWidth: 0,
      padding: 5,

      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOpacity: 0.11,
          shadowOffset: { width: 0, height: -3 },
          shadowRadius: 21,
        },
        android: {
          elevation: 100,
          zIndex: 100,
        },
      }),
    },
    labelStyle: {
      fontWeight: '600',
    },
  },
});

// hack to get the header to appear (it doesn't with a TabNavigator)
const MainWithHeader = StackNavigator({
  MainWithHeader: { screen: Tabs },
});

const PatreonWithHeader = StackNavigator({
  PatreonWithHeader: { screen: PatreonScreen },
});

const Modals = StackNavigator(
  {
    Main: { screen: MainWithHeader },
    Patreon: { screen: PatreonWithHeader },
    Logout: { screen: LoginScreen },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

/**
 * Navigator for the main "logged-in" user flow.
 */
class MainNavigator extends React.Component {
  static router = Modals.router;

  constructor() {
    super();
    // XXX: handle device rotation or multitasking resize?
    this.listening = false;
    this.windowDimensions = Dimensions.get('window');
    this.state = {
      drawer: null,
    };
  }

  getAnimatedStyles() {
    if (Platform.OS === 'android') {
      // don't animate on Android, because we're doing the
      // default drawer-in-front styling... for now.
      return {};
    }

    const margin = this.state.progressValue
      ? this.state.progressValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, this.windowDimensions.height * 0.05],
      })
      : 0;
    return {
      paddingVertical: margin,
    };
  }

  render() {
    return (
      <LinearGradient style={styles.gradient} colors={['#FFFFFF00', '#F95A570C']}>
        <DrawerLayout
          ref={drawer => (!this.state.drawer && this.setState({ drawer }))}
          renderNavigationView={(progressValue) => {
            if (!this.state.progressValue) {
              // XXX: gross hack, I know, but I don't see another way
              // to get the progressValue to the render() method.
              // https://github.com/kmagiera/react-native-gesture-handler/issues/155
              setTimeout(() => this.setState({ progressValue }), 100);
            }
            return <DrawerContent drawer={this.state.drawer} />;
          }}
          drawerWidth={this.windowDimensions.width * 0.75}
          {
            ...Platform.select({
              ios: {
                drawerType: 'back',
                overlayColor: '#00000000',
              },
              android: {},
            })
          }
          useNativeAnimations={false}
        >
          <Animated.View style={[styles.container, this.getAnimatedStyles()]}>
            <Modals
              screenProps={{ drawer: this.state.drawer }}
              navigation={this.props.navigation}
            />
          </Animated.View>
        </DrawerLayout>
      </LinearGradient>
    );
  }
}

MainNavigator.propTypes = {
  // react-navigation internal navigation state object
  navigation: PropTypes.shape({}).isRequired,
};

export default MainNavigator;
