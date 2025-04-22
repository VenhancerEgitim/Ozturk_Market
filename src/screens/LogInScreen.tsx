import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {RootStackScreenProps} from '../types/navigation';
import {setUser} from '../store/userSlice';
import {colors} from '../theme/colors';

type Props = RootStackScreenProps<'Login'>;

interface LoginFormValues {
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
    .min(6, 'Şifre en az 6 karakter olmalıdır'),
});

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

const LoginScreen = ({navigation}: Props) => {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (values: LoginFormValues) => {
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email: values.email,
        password: values.password,
      });

      if (response.data.token) {
        dispatch(setUser({
          email: values.email,
          token: response.data.token,
        }));
        navigation.navigate('Success');
      }
    } catch (err: any) {
      if (err.response) {
        // API'den gelen hata mesajı
        setError(err.response.data.error || 'Giriş başarısız oldu');
      } else if (err.request) {
        // Bağlantı hatası
        setError('Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.');
      } else {
        // Diğer hatalar
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
        <Text style={styles.title}>Giriş Yap</Text>
        <Text style={styles.subtitle}>E-posta ve şifrenizi girin</Text>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}>
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
                style={styles.forgotPassword}
                onPress={() => {}}
                disabled={isLoading}>
                <Text style={styles.forgotPasswordText}>Şifremi Unuttum?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={() => handleSubmit()}
                disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonText}>Giriş Yap</Text>
                )}
              </TouchableOpacity>

              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Hesabınız yok mu? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignUp')}
                  disabled={isLoading}>
                  <Text style={styles.signupButton}>Kayıt Ol</Text>
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
    color: colors.color.gray,
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
    tintColor: colors.color.gray,
  },
  error: {
    color: colors.color.red,
    fontSize: 12,
    marginTop: 5,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: colors.color.gray,
  },
  button: {
    backgroundColor: colors.color.green,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: colors.color.pastelGreen,
  },
  buttonText: {
    color: colors.color.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: colors.color.gray,
  },
  signupButton: {
    color: colors.color.green,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
