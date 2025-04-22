import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {ScreenProps} from '../types/navigation';
import CustomButton from '../components/CustomButton';
import {colors} from '../theme/colors';

const SuccessScreen = ({navigation}: ScreenProps<'Success'>) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assets/images/success.png')}
          style={styles.successIcon}
        />
        <Text style={styles.title}>Başarılı!</Text>
        <Text style={styles.subtitle}>Hesabınız başarıyla oluşturuldu.</Text>
      </View>

      <View style={styles.footer}>
        <CustomButton
          title="Alışverişe Başla"
          onPress={() => navigation.navigate('Main', {screen: 'Explore'})}
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
    backgroundColor: colors.background.lightGreen,
    paddingTop: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  successIcon: {
    width: 200,
    height: 200,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F1F1F',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
  },
  footer: {
    padding: 16,
    marginBottom: 16,
  },
});

export default SuccessScreen;
