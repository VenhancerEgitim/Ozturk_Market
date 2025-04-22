import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {Product} from './product';

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  Success: undefined;
  Main: {screen?: string};
  ProductList: {
    categoryId: number;
    categoryName: string;
    selectedFilters?: Array<{id: number; name: string; selected: boolean}>;
  };
  ProductDetail: {product: Product};
  Filter: {
    categoryId: number;
    categoryName: string;
  };
  Payment: undefined;
  Categories: undefined;
};

export type TabParamList = {
  Explore: undefined;
  Cart: undefined;
  Favorites: undefined;
  User: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

export type ScreenProps<T extends keyof RootStackParamList> = RootStackScreenProps<T>; 