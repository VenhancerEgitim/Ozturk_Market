import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {ScreenProps} from '../types/navigation';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Geçersiz e-posta').required('E-posta gerekli'),
  password: Yup.string()
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .required('Şifre gerekli'),
});

const SignUpScreen = ({navigation}: ScreenProps) => {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (values: {email: string; password: string}) => {
    try {
      const response = await axios.post('https://reqres.in/api/register', {
        email: values.email,
        password: values.password,
      });
      if (response.data.token) {
        setError('');
        navigation.navigate('Login');
      }
    } catch (err) {
      setError('Kayıt başarısız oldu');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/login-sign-carrot.png')} style={styles.logo} />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Kayıt Ol</Text>
        <Text style={styles.subtitle}>Bilgilerinizi girerek devam edin</Text>

        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}>
          {({handleChange, handleSubmit, values, errors, touched}) => (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>E-posta</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  placeholder="E-posta"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {touched.email && errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Şifre</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    style={[styles.input, {flex: 1}]}
                    onChangeText={handleChange('password')}
                    value={values.password}
                    placeholder="Şifre"
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Image
                      source={showPassword ? require('../assets/images/eye-slash.png') : require('../assets/images/eye.png')}
                      style={{width: 22, height: 22, tintColor: 'gray'}}
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
              </View>

              {error ? <Text style={styles.error}>{error}</Text> : null}

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Kayıt Ol</Text>
              </TouchableOpacity>

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Zaten hesabınız var mı? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.loginButton}>Giriş Yap</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: -20,
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  subtitle: {
    color: 'gray',
    marginBottom: 30,
    textAlign: 'left',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: 'gray',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 10,
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: 'gray',
  },
  loginButton: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
