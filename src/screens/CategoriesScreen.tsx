import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import {colors} from '../theme/colors';

type TabParamList = {
  Explore: undefined;
  Cart: undefined;
  Favorites: undefined;
};

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Explore'>,
  NativeStackScreenProps<RootStackParamList>
>;

const categories = [
  {
    id: 1,
    name: 'Elektronik',
    image: require('../assets/images/elektronik.png'),
    backgroundColor: colors.category.electronics,
  },
  {
    id: 2,
    name: 'Market',
    image: require('../assets/images/market.png'),
    backgroundColor: colors.category.market,
  },
  {
    id: 3,
    name: 'Bakım Ürünleri',
    image: require('../assets/images/kozmetik.png'),
    backgroundColor: colors.category.personalCare,
  },
  {
    id: 4,
    name: 'Mobilya ve Dekorasyon',
    image: require('../assets/images/mobilya.png'),
    backgroundColor: colors.category.furniture,
  },
  {
    id: 5,
    name: 'Üst Giyim',
    image: require('../assets/images/kiyafet.png'),
    backgroundColor: colors.category.upperClothing,
  },
  {
    id: 6,
    name: 'Alt Giyim',
    image: require('../assets/images/ayakkabi.png'),
    backgroundColor: colors.category.lowerClothing,
  },
];

const CategoriesScreen = ({navigation}: Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Kategoriler</Text>
      </View>

      <View style={styles.searchContainer}>
        <Image
          source={require('../assets/images/search.png')}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Kategori Ara"
          placeholderTextColor="#7C7C7C"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {filteredCategories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, {backgroundColor: category.backgroundColor}]}
              onPress={() =>
                navigation.navigate('ProductList', {
                  categoryId: category.id,
                  categoryName: category.name,
                })
              }>
              <Image source={category.image} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
    paddingTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
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
  scrollContent: {
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryImage: {
    width: '100%',
    height: '60%',
    resizeMode: 'contain',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.color.black,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default CategoriesScreen;
