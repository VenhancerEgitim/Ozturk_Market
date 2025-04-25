import React from 'react';
import {View, StyleSheet, Text, Image, ScrollView, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {RootStackScreenProps, RootStackParamList} from '../types/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootState} from '../store/store';
import {clearUser} from '../store/userSlice';
import {colors} from '../theme/colors';
import CustomButton from '../components/CustomButton';

const UserScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Çıkış yapmak istediğinizden emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Çıkış Yap',
          style: 'destructive',
          onPress: () => {
            dispatch(clearUser());
            navigation.replace('Login');
          },
        },
      ],
    );
  };

  if (!user) {
    navigation.replace('Login');
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profilim</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <Image
            source={require('../assets/images/user-avatar.png')}
            style={styles.avatar}
          />
          <Text style={styles.name}>{user.email.split('@')[0]}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          title="Çıkış Yap"
          onPress={handleLogout}
          variant="primary"
          size="large"
          style={{backgroundColor: colors.color.red}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.backgroundWhite,
    paddingTop: 40,
  },
  header: {
    padding: 16,
    backgroundColor: colors.background.backgroundWhite,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.borderButtonColor,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.color.black,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.borderButtonColor,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.color.black,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: colors.color.gray,
  },
  footer: {
    padding: 16,
  },
});

export default UserScreen;
