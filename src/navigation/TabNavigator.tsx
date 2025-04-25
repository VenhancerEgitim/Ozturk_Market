import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import CategoriesScreen from '../screens/CategoriesScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import UserScreen from '../screens/UserScreen';
import {TabParamList} from '../types/navigation';
import {colors} from '../theme/colors';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.color.green,
        tabBarInactiveTintColor: colors.color.gray,
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
      }}>
      <Tab.Screen
        name="Explore"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/explore-bar.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? colors.color.green : colors.color.lightGray,
              }}
            />
          ),
          tabBarLabel: 'Keşfet',
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/cart-bar.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? colors.color.green : colors.color.lightGray,
              }}
            />
          ),
          tabBarLabel: 'Sepet',
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/favorite-bar.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? colors.color.green : colors.color.lightGray,
              }}
            />
          ),
          tabBarLabel: 'Favoriler',
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/user-avatar.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? colors.color.green : colors.color.lightGray,
              }}
            />
          ),
          tabBarLabel: 'Profil',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator; 