import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {ScreenProps} from '../types/navigation';

const WelcomeScreen = ({navigation}: ScreenProps) => {
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Başlayın</Text>
        </TouchableOpacity>
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
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4CAF50',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen; 