import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, TextInput, ActivityIndicator} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {RootStackScreenProps} from '../types/navigation';
import {colors} from '../theme/colors';

type Props = RootStackScreenProps<'SignUp'>;

interface SignUpFormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Geçerli bir e-posta adresi giriniz')
    .required('E-posta adresi gerekli')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Geçerli bir e-posta adresi giriniz',
    ),
  password: Yup.string()
    .required('Şifre gerekli')
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .matches(/[A-Z]/, 'Şifre en az bir büyük harf içermelidir')
    .matches(/[a-z]/, 'Şifre en az bir küçük harf içermelidir')
    .matches(/[0-9]/, 'Şifre en az bir rakam içermelidir'),
});

const initialValues: SignUpFormValues = {
  email: '',
  password: '',
};

const SignUpScreen = ({navigation}: Props) => {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (values: SignUpFormValues) => {
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('https://reqres.in/api/register', {
        email: values.email,
        password: values.password,
      });

      if (response.data.token) {
        setError('');
        navigation.navigate('Login');
      }
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.error || 'Kayıt başarısız oldu');
      } else if (err.request) {
        setError('Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.');
      } else {
        setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/login-sign-carrot.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Kayıt Ol</Text>
        <Text style={styles.subtitle}>Bilgilerinizi girerek devam edin</Text>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}>
          {({handleChange, handleSubmit, values, errors, touched}) => (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>E-posta</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.email && errors.email && styles.inputError,
                  ]}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  placeholder="E-posta"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!isLoading}
                />
                {touched.email && errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Şifre</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      {flex: 1},
                      touched.password && errors.password && styles.inputError,
                    ]}
                    onChangeText={handleChange('password')}
                    value={values.password}
                    placeholder="Şifre"
                    secureTextEntry={!showPassword}
                    editable={!isLoading}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    disabled={isLoading}>
                    <Image
                      source={
                        showPassword
                          ? require('../assets/images/eye-slash.png')
                          : require('../assets/images/eye.png')
                      }
                      style={styles.eyeIcon}
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
              </View>

              {error ? <Text style={styles.error}>{error}</Text> : null}

              <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={() => handleSubmit()}
                disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonText}>Kayıt Ol</Text>
                )}
              </TouchableOpacity>

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Zaten hesabınız var mı? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Login')}
                  disabled={isLoading}>
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
    backgroundColor: colors.background.lightGreen,
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
    color: colors.color.gray,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border.borderButtonColor,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputError: {
    borderBottomColor: colors.color.red,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    width: 22,
    height: 22,
    tintColor: 'gray',
  },
  error: {
    color: colors.color.red,
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: colors.color.green,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: colors.color.pastelGreen,
  },
  buttonText: {
    color: colors.color.white,
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
    color: colors.color.green,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
