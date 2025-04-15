import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

const SuccessScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/success.png')}
        style={styles.successIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2F5E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    width: 100,
    height: 100,
  },
});

export default SuccessScreen;
