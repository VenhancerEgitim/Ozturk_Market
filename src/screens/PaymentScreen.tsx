import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput, Image, Alert, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {RootStackScreenProps} from '../types/navigation';
import CustomButton from '../components/CustomButton';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {colors} from '../theme/colors';

type Props = RootStackScreenProps<'Payment'>;

interface PaymentFormValues {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolder: string;
}

const validationSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required('Kart numarası gerekli')
    .matches(/^[\d\s]{19}$/, 'Geçerli bir kart numarası giriniz'),
  expiryDate: Yup.string()
    .required('Son kullanma tarihi gerekli')
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'GG/YY formatında giriniz'),
  cvv: Yup.string()
    .required('CVV gerekli')
    .matches(/^[0-9]{3}$/, 'Geçerli bir CVV giriniz'),
  cardHolder: Yup.string()
    .required('Kart sahibi adı gerekli')
    .min(5, 'En az 5 karakter giriniz')
    .matches(/^[A-ZĞÜŞİÖÇ\s]+$/, 'Sadece büyük harf kullanınız'),
});

const PaymentScreen = ({navigation}: Props) => {
  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || '';
    return formatted.slice(0, 19);
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handlePayment = (values: PaymentFormValues) => {
    Alert.alert(
      'Ödeme Başarılı',
      'Siparişiniz alındı. Teşekkür ederiz!',
      [
        {
          text: 'Tamam',
          onPress: () => {
            // @ts-ignore
            navigation.navigate('Main', {screen: 'Explore'});
          },
        },
      ],
    );
  };

  const initialValues: PaymentFormValues = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: '',
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}>
            <Image 
              source={require('../assets/images/back-button.png')} 
              style={styles.headerIcon} 
            />
          </TouchableOpacity>
          <Text style={styles.title}>Ödeme</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handlePayment}>
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <>
                <View style={styles.card}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Kart Numarası</Text>
                    <TextInput
                      style={[
                        styles.input,
                        touched.cardNumber && errors.cardNumber && styles.inputError,
                      ]}
                      placeholder="1234 5678 9012 3456"
                      value={values.cardNumber}
                      onChangeText={(text) => {
                        const formatted = formatCardNumber(text);
                        setFieldValue('cardNumber', formatted);
                      }}
                      keyboardType="numeric"
                      maxLength={19}
                    />
                    {touched.cardNumber && errors.cardNumber && (
                      <Text style={styles.errorText}>{errors.cardNumber}</Text>
                    )}
                  </View>

                  <View style={styles.row}>
                    <View style={[styles.inputGroup, {flex: 1, marginRight: 12}]}>
                      <Text style={styles.label}>Son Kullanma Tarihi</Text>
                      <TextInput
                        style={[
                          styles.input,
                          touched.expiryDate && errors.expiryDate && styles.inputError,
                        ]}
                        placeholder="MM/YY"
                        value={values.expiryDate}
                        onChangeText={(text) => {
                          const formatted = formatExpiryDate(text);
                          setFieldValue('expiryDate', formatted);
                        }}
                        keyboardType="numeric"
                        maxLength={5}
                      />
                      {touched.expiryDate && errors.expiryDate && (
                        <Text style={styles.errorText}>{errors.expiryDate}</Text>
                      )}
                    </View>
                    <View style={[styles.inputGroup, {flex: 1}]}>
                      <Text style={styles.label}>CVV</Text>
                      <TextInput
                        style={[
                          styles.input,
                          touched.cvv && errors.cvv && styles.inputError,
                        ]}
                        placeholder="123"
                        value={values.cvv}
                        onChangeText={handleChange('cvv')}
                        keyboardType="numeric"
                        maxLength={3}
                      />
                      {touched.cvv && errors.cvv && (
                        <Text style={styles.errorText}>{errors.cvv}</Text>
                      )}
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Kart Sahibi</Text>
                    <TextInput
                      style={[
                        styles.input,
                        touched.cardHolder && errors.cardHolder && styles.inputError,
                      ]}
                      placeholder="AD SOYAD"
                      value={values.cardHolder}
                      onChangeText={(text) => setFieldValue('cardHolder', text.toUpperCase())}
                      autoCapitalize="characters"
                    />
                    {touched.cardHolder && errors.cardHolder && (
                      <Text style={styles.errorText}>{errors.cardHolder}</Text>
                    )}
                  </View>
                </View>
                <View style={styles.footer}>
                  <CustomButton
                    title="Ödemeyi Tamamla"
                    onPress={handleSubmit}
                    variant="primary"
                    size="large"
                    style={{
                      paddingVertical: 16,
                      borderRadius: 12,
                    }}
                    textStyle={{
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}
                  />
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.backgroundWhite,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.borderButtonColor,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.color.black,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: colors.background.backgroundWhite,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: colors.color.gray,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border.borderButtonColor,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: colors.color.black,
  },
  inputError: {
    borderColor: colors.color.red,
  },
  errorText: {
    color: colors.color.red,
    fontSize: 12,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border.borderButtonColor,
    backgroundColor: colors.background.backgroundWhite,
  },
  payButton: {
    backgroundColor: colors.color.green,
  },
});

export default PaymentScreen;