import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';

const SuccessScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/success.png')}
        style={styles.successIcon}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Categories')}>
        <Text style={styles.buttonText}>Alışverişe Başla</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#4CAF50',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SuccessScreen;
