import React from 'react';
import {View, StyleSheet, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {TabParamList, RootStackParamList} from '../types/navigation';
import CustomButton from '../components/CustomButton';
import {RootState} from '../store/store';
import {removeFromCart, updateQuantity} from '../store/cartSlice';
import {colors} from '../theme/colors';

type CartScreenProps = {
  navigation: {
    navigate: (screen: keyof RootStackParamList | keyof TabParamList, params?: any) => void;
    goBack: () => void;
  };
};

const CartScreen = ({navigation}: CartScreenProps) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const updateItemQuantity = (id: number, increment: boolean) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      const newQuantity = increment ? item.quantity + 1 : Math.max(0, item.quantity - 1);
      if (newQuantity === 0) {
        dispatch(removeFromCart(id));
      } else {
        dispatch(updateQuantity({id, quantity: newQuantity}));
      }
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sepetim</Text>
      </View>

      <ScrollView style={styles.content}>
        {cartItems.length === 0 ? (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>Sepetinizde ürün bulunmamaktadır</Text>
          </View>
        ) : (
          cartItems.map(item => (
            <View key={item.id} style={styles.cartItem}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProductDetail', {product: item})}
                style={styles.itemContent}>
                <Image source={{uri: item.images[0]}} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateItemQuantity(item.id, false)}>
                      <Image
                        source={require('../assets/images/minus.png')}
                        style={[styles.quantityIcon, {tintColor: colors.color.red}]}
                      />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateItemQuantity(item.id, true)}>
                      <Image
                        source={require('../assets/images/plus.png')}
                        style={[styles.quantityIcon, {tintColor: colors.color.green}]}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => dispatch(removeFromCart(item.id))}>
                  <Image
                    source={require('../assets/images/exit.png')}
                    style={[styles.removeIcon, {tintColor: colors.color.red}]}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Toplam</Text>
            <Text style={styles.totalPrice}>${total.toFixed(2)}</Text>
          </View>
          <CustomButton
            title="Ödemeye Geç"
            onPress={() => navigation.navigate('Payment')}
            variant="primary"
            size="large"
          />
        </View>
      )}
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
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyCartText: {
    fontSize: 16,
    color: colors.color.gray,
    textAlign: 'center',
  },
  cartItem: {
    backgroundColor: colors.background.backgroundWhite,
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
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
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
    marginRight: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.color.black,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.color.green,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 8,
    backgroundColor: colors.background.backgroundWhite,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.borderButtonColor,
  },
  quantityIcon: {
    width: 16,
    height: 16,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
    color: colors.color.black,
  },
  removeButton: {
    padding: 8,
  },
  removeIcon: {
    width: 24,
    height: 24,
  },
  footer: {
    padding: 16,
    backgroundColor: colors.background.backgroundWhite,
    borderTopWidth: 1,
    borderTopColor: colors.border.borderButtonColor,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: colors.color.gray,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.color.green,
  },
});

export default CartScreen;

