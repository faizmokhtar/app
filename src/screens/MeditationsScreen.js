import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import { getCommonNavigationOptions } from '../navigation/common';
import * as patreonSelectors from '../state/ducks/patreon/selectors';
import styles from '../styles';

/**
 * List of available meditations, organized by category.
 */
const MeditationsScreen = ({ isPatron }) => (
  <View style={styles.container}>
    <Text>
      Placeholder meditations screen
    </Text>
    <Text>
      {
        isPatron
          ? 'As a patron, you can access the meditations.'
          : 'If you were a patron, you could access the meditations.'
      }
    </Text>
  </View>
);

MeditationsScreen.propTypes = {
  // true iff the user has connected Patreon
  isPatron: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isPatron: patreonSelectors.isPatron(state),
  };
}

MeditationsScreen.navigationOptions = ({ navigation }) => ({
  ...getCommonNavigationOptions(navigation),
  title: 'Meditations',
});

export default connect(mapStateToProps)(MeditationsScreen);