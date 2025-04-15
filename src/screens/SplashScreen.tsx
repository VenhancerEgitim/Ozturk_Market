import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {ScreenProps} from '../types/navigation';

const SplashScreen = ({navigation}: ScreenProps) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash-carrot.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>nectar</Text>
      <Text style={styles.subtitle}>online groceriet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 48,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.7,
  },
});

export default SplashScreen; 