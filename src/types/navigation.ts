import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  Success: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type ScreenProps = {
  navigation: NavigationProp;
}; 