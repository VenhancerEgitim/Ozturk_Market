import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ScreenProps} from '../types/navigation';
import CustomButton from '../components/CustomButton';
import {addToCart} from '../store/cartSlice';
import {toggleFavorite} from '../store/favoriteSlice';
import {RootState} from '../store/store';
import {colors} from '../theme/colors';

const ProductDetailScreen = ({navigation, route}: ScreenProps<'ProductDetail'>) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const product = route.params.product;
  
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some(item => item.id === product.id);

  const handleQuantityChange = (increment: boolean) => {
    setQuantity(prev => (increment ? prev + 1 : Math.max(1, prev - 1)));
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      ...product,
      quantity,
    }));
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product));
  };

  if (!product) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: product.images[0]}}
            style={styles.productImage}
            resizeMode="cover"
          />
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              style={styles.iconButton}
            >
              <Image 
                source={require('../assets/images/back-button.png')} 
                style={styles.headerIcon} 
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Image 
                source={require('../assets/images/share.png')} 
                style={styles.headerIcon} 
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{product.title}</Text>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={handleToggleFavorite}
            >
              <Image 
                source={require('../assets/images/detail-favorite.png')} 
                style={[
                  styles.headerIcon,
                  isFavorite && styles.activeFavorite
                ]} 
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={[styles.quantityButton, styles.minusButton]}
              onPress={() => handleQuantityChange(false)}
            >
              <Image 
                source={require('../assets/images/minus.png')} 
                style={styles.quantityIcon} 
              />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity
              style={[styles.quantityButton, styles.plusButton]}
              onPress={() => handleQuantityChange(true)}
            >
              <Image 
                source={require('../assets/images/plus.png')} 
                style={styles.quantityIcon} 
              />
            </TouchableOpacity>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Ürün Açıklaması</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          title="Sepete Ekle"
          onPress={handleAddToCart}
          style={styles.addToCartButton}
          textStyle={styles.addToCartButtonText}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.backgroundWhite,
    paddingTop: 40,
  },
  imageContainer: {
    aspectRatio: 1,
    width: '100%',
    position: 'relative',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.background.backgroundWhite,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  activeFavorite: {
    tintColor: colors.color.red,
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.color.black,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.color.green,
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    justifyContent: 'center',
    gap: 16,
  },
  quantityButton: {
    padding: 5,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  minusButton: {
    backgroundColor: colors.color.red,
  },
  plusButton: {
    backgroundColor: colors.color.green,
  },
  quantityIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: colors.color.white,
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.color.black,
  },
  descriptionContainer: {
    marginTop: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.color.black,
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    color: colors.color.gray,
    lineHeight: 24,
    marginBottom: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: colors.background.backgroundWhite,
    borderTopWidth: 1,
    borderTopColor: colors.border.borderButtonColor,
  },
  addToCartButton: {
    backgroundColor: colors.color.green,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: colors.color.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;
