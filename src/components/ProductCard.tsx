import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {colors} from '../theme/colors';
import CustomButton from './CustomButton';

type CardVariant = 'default' | 'cart' | 'favorite' | 'detail';

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  onPress: () => void;
  onPressAdd?: () => void;
  onPressRemove?: () => void;
  quantity?: number;
  variant?: CardVariant;
  isFavorite?: boolean;
  onPressFavorite?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  image,
  onPress,
  onPressAdd = () => {},
  onPressRemove = () => {},
  quantity = 1,
  variant = 'default',
  isFavorite = false,
  onPressFavorite = () => {},
}) => {
  const renderContent = () => {
    switch (variant) {
      case 'cart':
        return (
          <View style={styles.cartContent}>
            <Image source={{uri: image}} style={styles.cartImage} />
            <View style={styles.cartInfo}>
              <Text style={styles.cartTitle} numberOfLines={2}>{title}</Text>
              <Text style={styles.cartPrice}>${price.toFixed(2)}</Text>
              <View style={styles.quantityContainer}>
                <CustomButton
                  icon={require('../assets/images/minus.png')}
                  onPress={onPressRemove}
                  variant="icon"
                  size="small"
                />
                <Text style={styles.quantityText}>{quantity}</Text>
                <CustomButton
                  icon={require('../assets/images/plus.png')}
                  onPress={onPressAdd}
                  variant="icon"
                  size="small"
                />
              </View>
            </View>
          </View>
        );
      case 'favorite':
        return (
          <View style={styles.favoriteContent}>
            <Image source={{uri: image}} style={styles.favoriteImage} />
            <View style={styles.favoriteInfo}>
              <Text style={styles.favoriteTitle} numberOfLines={2}>{title}</Text>
              <Text style={styles.favoritePrice}>${price.toFixed(2)}</Text>
              <View style={styles.favoriteActions}>
                <CustomButton
                  icon={require('../assets/images/plus.png')}
                  onPress={onPressAdd}
                  variant="icon"
                  size="small"
                />
                <CustomButton
                  icon={require('../assets/images/detail-favorite.png')}
                  onPress={onPressFavorite}
                  variant="icon"
                  size="small"
                />
              </View>
            </View>
          </View>
        );
      case 'detail':
        return (
          <View style={styles.detailContent}>
            <Image source={{uri: image}} style={styles.detailImage} />
            <View style={styles.detailInfo}>
              <Text style={styles.detailTitle}>{title}</Text>
              <Text style={styles.detailPrice}>${price.toFixed(2)}</Text>
              <View style={styles.detailActions}>
                <CustomButton
                  icon={require('../assets/images/detail-favorite.png')}
                  onPress={onPressFavorite}
                  variant="icon"
                  size="small"
                />
              </View>
            </View>
          </View>
        );
      default:
        return (
          <View style={styles.defaultContent}>
            <Image source={{uri: image}} style={styles.defaultImage} />
            <View style={styles.defaultInfo}>
              <Text style={styles.defaultTitle} numberOfLines={2}>{title}</Text>
              <View style={styles.defaultBottom}>
                <Text style={styles.defaultPrice}>${price.toFixed(2)}</Text>
                <TouchableOpacity 
                  style={styles.addToCartButton}
                  onPress={onPressAdd}>
                  <Image 
                    source={require('../assets/images/plus.png')} 
                    style={{width: 20, height: 20, tintColor: colors.color.white}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, styles[variant]]} 
      onPress={onPress}
      activeOpacity={0.8}>
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.backgroundWhite,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: colors.border.borderButtonColor,
  },
  default: {
    flex: 1,
    margin: 8,
  },
  cart: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 8,
  },
  favorite: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 8,
  },
  detail: {
    width: '100%',
  },
  defaultContent: {
    flex: 1,
  },
  cartContent: {
    flexDirection: 'row',
    flex: 1,
  },
  favoriteContent: {
    flexDirection: 'row',
    flex: 1,
  },
  detailContent: {
    width: '100%',
  },
  defaultImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  cartImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  favoriteImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  detailImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  defaultInfo: {
    padding: 12,
    height: 90,
    justifyContent: 'space-between',
  },
  cartInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  favoriteInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  detailInfo: {
    padding: 16,
  },
  defaultTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.color.black,
    marginBottom: 8,
  },
  cartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.color.black,
  },
  favoriteTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.color.black,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.color.black,
    marginBottom: 8,
  },
  defaultPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.color.black,
  },
  cartPrice: {
    fontSize: 14,
    color: colors.color.green,
    marginTop: 5,
  },
  favoritePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.color.green,
  },
  detailPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.color.green,
    marginBottom: 16,
  },
  defaultBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityText: {
    fontSize: 14,
    color: colors.color.black,
    marginHorizontal: 10,
  },
  favoriteActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  addToCartButton: {
    backgroundColor: colors.color.green,
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductCard; 