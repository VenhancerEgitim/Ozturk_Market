import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {RootStackScreenProps} from '../types/navigation';
import { colors } from '../theme/colors';

type Props = RootStackScreenProps<'Splash'>;

const SplashScreen = ({navigation}: Props) => {
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
      <Text style={styles.subtitle}>online market</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.color.green,
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
  },
});

export default SplashScreen; 