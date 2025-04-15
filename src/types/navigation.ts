import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// Uygulamamızdaki tüm ekranların listesi
export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  // Yeni ekranlar buraya eklenecek
  // örnek: Home: undefined;
  // örnek: ProductDetail: { productId: string };
};

// Her ekran için navigation prop tipi
export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Her ekranın props tipi için
export type ScreenProps = {
  navigation: NavigationProp;
}; 