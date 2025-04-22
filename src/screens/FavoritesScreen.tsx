import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {TabParamList, RootStackParamList} from '../types/navigation';
import {RootState} from '../store/store';
import {toggleFavorite} from '../store/favoriteSlice';
import {addToCart} from '../store/cartSlice';
import {colors} from '../theme/colors';

type FavoritesScreenProps = {
  navigation: {
    navigate: (screen: keyof RootStackParamList | keyof TabParamList, params?: any) => void;
    goBack: () => void;
  };
};

const FavoritesScreen = ({navigation}: FavoritesScreenProps) => {
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch();

  const handleRemoveFromFavorites = (product: any) => {
    dispatch(toggleFavorite(product));
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({
      ...product,
      quantity: 1,
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorilerim</Text>
      </View>

      <ScrollView style={styles.content}>
        {favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Henüz favori ürününüz yok</Text>
          </View>
        ) : (
          favorites.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.favoriteItem}
              onPress={() => navigation.navigate('ProductDetail', {product: item})}>
              <Image source={{uri: item.images[0]}} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => handleAddToCart(item)}>
                    <Image
                      source={require('../assets/images/plus.png')}
                      style={[styles.actionIcon, {tintColor: colors.color.white}]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => handleRemoveFromFavorites(item)}>
                    <Image
                      source={require('../assets/images/detail-favorite.png')}
                      style={[styles.actionIcon, {tintColor: colors.color.red}]}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
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
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: colors.color.gray,
    textAlign: 'center',
  },
  favoriteItem: {
    flexDirection: 'row',
    backgroundColor: colors.background.backgroundWhite,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border.borderButtonColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.color.black,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.color.green,
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addButton: {
    backgroundColor: colors.color.green,
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.backgroundWhite,
    borderWidth: 1,
    borderColor: colors.border.borderButtonColor,
  },
  actionIcon: {
    width: 20,
    height: 20,
  },
});

export default FavoritesScreen; 