import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {RootStackScreenProps} from '../types/navigation';
import {Product} from '../types/product';
import ProductCard from '../components/ProductCard';
import {addToCart} from '../store/cartSlice';
import {colors} from '../theme/colors';

type Props = RootStackScreenProps<'ProductList'>;

const ProductListScreen = ({navigation, route}: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
  }, [route.params.categoryId]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const categoryId = route.params.categoryId;
      const selectedFilters = route.params.selectedFilters || [];
      const showAllProducts = selectedFilters.length === 0 || selectedFilters.some(filter => filter.name === 'Tümü');

      let apiEndpoints: string[] = [];
      
      switch (categoryId) {
        case 1: // Elektronik
          if (!showAllProducts) {
            selectedFilters.forEach(filter => {
              if (filter.name === 'Telefonlar') apiEndpoints.push('smartphones');
              if (filter.name === 'Laptoplar') apiEndpoints.push('laptops');
            });
          } else {
            apiEndpoints = ['smartphones', 'laptops'];
          }
          break;

        case 2: // Market
          apiEndpoints = ['groceries'];
          break;

        case 3: // Bakım Ürünleri
          if (!showAllProducts) {
            selectedFilters.forEach(filter => {
              if (filter.name === 'Parfümler') apiEndpoints.push('fragrances');
              if (filter.name === 'Cilt Bakımı') apiEndpoints.push('skincare');
            });
          } else {
            apiEndpoints = ['fragrances', 'skincare'];
          }
          break;

        case 4: // Mobilya ve Dekorasyon
          if (!showAllProducts) {
            selectedFilters.forEach(filter => {
              if (filter.name === 'Mobilya') apiEndpoints.push('furniture');
              if (filter.name === 'Ev Dekorasyon') apiEndpoints.push('home-decoration');
            });
          } else {
            apiEndpoints = ['furniture', 'home-decoration'];
          }
          break;

        case 5: // Üst Giyim
          if (!showAllProducts) {
            selectedFilters.forEach(filter => {
              if (filter.name === 'Kadın Giyim') {
                apiEndpoints.push('tops');
                apiEndpoints.push('womens-dresses');
              }
              if (filter.name === 'Erkek Giyim') apiEndpoints.push('mens-shirts');
            });
          } else {
            apiEndpoints = ['tops', 'womens-dresses', 'mens-shirts'];
          }
          break;

        case 6: // Alt Giyim
          if (!showAllProducts) {
            selectedFilters.forEach(filter => {
              if (filter.name === 'Kadın Ayakkabı') apiEndpoints.push('womens-shoes');
              if (filter.name === 'Erkek Ayakkabı') apiEndpoints.push('mens-shoes');
            });
          } else {
            apiEndpoints = ['womens-shoes', 'mens-shoes'];
          }
          break;

        default:
          apiEndpoints = ['products?limit=20'];
      }

      const promises = apiEndpoints.map(endpoint =>
        axios.get(`https://dummyjson.com/products/category/${endpoint}`)
      );

      const results = await Promise.all(promises);
      const allProducts = results.flatMap(result => result.data.products || []);
      
      const mappedProducts: Product[] = allProducts.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        description: item.description,
        images: Array.isArray(item.images) ? item.images : [item.images],
        category: {
          id: categoryId,
          name: route.params.categoryName
        }
      }));

      setProducts(mappedProducts);

    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Ürünler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
      Alert.alert(
        'Hata',
        'Ürünler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.',
        [{text: 'Tamam', onPress: () => navigation.goBack()}]
      );
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (categoryId: number): string => {
    const categoryMapping: { [key: number]: string } = {
      1: "smartphones",
      2: "laptops",
      3: "fragrances",
      4: "skincare",
      5: "groceries",
      6: "home-decoration",
      7: "furniture",
      8: "tops",
      9: "womens-dresses",
      10: "womens-shoes",
      11: "mens-shirts",
      12: "mens-shoes",
      13: "mens-watches",
      14: "womens-watches",
      15: "womens-bags",
      16: "womens-jewellery",
      17: "sunglasses",
      18: "automotive",
      19: "motorcycle",
      20: "lighting"
    };
    return categoryMapping[categoryId] || "smartphones";
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({
      ...product,
      quantity: 1,
    }));
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.headerButton} 
        onPress={() => navigation.goBack()}>
        <Image 
          source={require('../assets/images/back-button.png')} 
          style={styles.headerIcon} 
        />
      </TouchableOpacity>
      <Text style={styles.title}>{route.params?.categoryName || 'Ürünler'}</Text>
      <View style={styles.headerButtons}>
        <TouchableOpacity 
          style={[styles.headerButton, {marginRight: 8}]}
          onPress={() => {
            navigation.navigate('Main', { screen: 'Cart' });
          }}>
          <Image 
            source={require('../assets/images/cart.png')} 
            style={styles.headerIcon} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => navigation.navigate('Filter', {
            categoryId: route.params.categoryId,
            categoryName: route.params.categoryName
          })}>
          <Image 
            source={require('../assets/images/filter-button.png')} 
            style={styles.headerIcon} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <Image 
        source={require('../assets/images/search.png')} 
        style={styles.searchIcon} 
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Ürün Ara"
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#7C7C7C"
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={fetchProducts}>
          <Text style={styles.retryButtonText}>Tekrar Dene</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderSearchBar()}
      <FlatList
        data={filteredProducts}
        renderItem={({item}) => (
          <ProductCard
            title={item.title}
            price={item.price}
            image={item.images[0]}
            onPress={() => navigation.navigate('ProductDetail', {product: item})}
            onPressAdd={() => handleAddToCart(item)}
          />
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productList}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Bu kategoride ürün bulunamadı.</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.backgroundWhite,
    paddingTop: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',   
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: colors.color.red,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: colors.color.green,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: colors.color.white,
    fontSize: 16,
    fontWeight: 'bold',
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background.backgroundWhite,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.borderButtonColor,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerButton: {
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
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.color.black,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.border.borderButtonColor,
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 15,
    height: 45,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.color.black,
  },
  productList: {
    padding: 8,
  },
});

export default ProductListScreen;
