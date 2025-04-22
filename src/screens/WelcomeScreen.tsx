import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {RootStackScreenProps} from '../types/navigation';
import CustomButton from '../components/CustomButton';
import {colors} from '../theme/colors';

type Props = RootStackScreenProps<'Welcome'>;

const WelcomeScreen = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/welcome-background.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.content}>
        <Image
          source={require('../assets/images/splash-carrot.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Mağazamıza{'\n'}Hoş Geldiniz</Text>
        <Text style={styles.subtitle}>
          Bakkaldan alışverişinizi bir saat kadar kısa bir sürede yapın
        </Text>
        <CustomButton
          title="Başlayın"
          onPress={() => navigation.navigate('Login')}
          variant="primary"
          size="large"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    color: colors.color.white,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.color.white,
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default WelcomeScreen; 