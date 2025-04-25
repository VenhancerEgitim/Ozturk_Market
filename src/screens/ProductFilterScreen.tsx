import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import {RootStackScreenProps} from '../types/navigation';
import CustomButton from '../components/CustomButton';
import {colors} from '../theme/colors';

type Props = RootStackScreenProps<'Filter'>;

interface Filter {
  id: number;
  name: string;
  selected: boolean;
}

const ProductFilterScreen = ({navigation, route}: Props) => {
  const [filters, setFilters] = useState<Filter[]>([]);

  useEffect(() => {
    const categoryId = route.params?.categoryId;
    let categoryFilters: Filter[] = [];

    switch (categoryId) {
      case 1: // Elektronik
        categoryFilters = [
          {id: 0, name: 'Tümü', selected: true},
          {id: 1, name: 'Telefonlar', selected: false},
          {id: 2, name: 'Laptoplar', selected: false},
        ];
        break;
      case 2: // Market
        categoryFilters = [
          {id: 0, name: 'Tümü', selected: true},
        ];
        break;
      case 3: // Bakım Ürünleri
        categoryFilters = [
          {id: 0, name: 'Tümü', selected: true},
          {id: 1, name: 'Parfümler', selected: false},
          {id: 2, name: 'Cilt Bakımı', selected: false},
        ];
        break;
      case 4: // Mobilya ve Dekorasyon
        categoryFilters = [
          {id: 0, name: 'Tümü', selected: true},
          {id: 1, name: 'Mobilya', selected: false},
          {id: 2, name: 'Ev Dekorasyon', selected: false},
        ];
        break;
      case 5: // Üst Giyim
        categoryFilters = [
          {id: 0, name: 'Tümü', selected: true},
          {id: 1, name: 'Kadın Giyim', selected: false},
          {id: 2, name: 'Erkek Giyim', selected: false},
        ];
        break;
      case 6: // Alt Giyim
        categoryFilters = [
          {id: 0, name: 'Tümü', selected: true},
          {id: 1, name: 'Kadın Ayakkabı', selected: false},
          {id: 2, name: 'Erkek Ayakkabı', selected: false},
        ];
        break;
      default:
        categoryFilters = [
          {id: 0, name: 'Tümü', selected: true},
        ];
    }

    setFilters(categoryFilters);
  }, [route.params?.categoryId]);

  const toggleFilter = (id: number) => {
    setFilters(prev => {
      if (id === 0) {
        return prev.map(filter => ({
          ...filter,
          selected: filter.id === 0
        }));
      }

      const updatedFilters = prev.map(filter => {
        if (filter.id === id) {
          return { ...filter, selected: !filter.selected };
        }
        if (filter.id === 0) { 
          return { ...filter, selected: false };
        }
        return filter;
      });

      const hasSelectedFilters = updatedFilters.some(f => f.selected && f.id !== 0);
      if (!hasSelectedFilters) {
        return updatedFilters.map(filter => ({
          ...filter,
          selected: filter.id === 0
        }));
      }

      return updatedFilters;
    });
  };

  const applyFilters = () => {
    const selectedFilters = filters.filter(filter => filter.selected);
    navigation.navigate('ProductList', {
      categoryId: route.params?.categoryId || 1,
      categoryName: route.params?.categoryName || 'Tüm Ürünler',
      selectedFilters: selectedFilters,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}>
          <Image 
            source={require('../assets/images/exit.png')} 
            style={styles.backIcon} 
          />
        </TouchableOpacity>
        <Text style={styles.title}>Filtreler</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>{route.params?.categoryName || 'Kategori'}</Text>
        <View style={styles.filtersList}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter.id}
              style={styles.filterRow}
              onPress={() => toggleFilter(filter.id)}>
              <Text style={[
                styles.filterText,
                filter.selected && styles.filterTextSelected
              ]}>{filter.name}</Text>
              <View style={[
                styles.checkbox,
                filter.selected && styles.checkboxSelected
              ]}>
                {filter.selected && (
                  <Image
                    source={require('../assets/images/check.png')}
                    style={styles.checkIcon}
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <CustomButton
          title="Filtreleri Uygula"
          onPress={applyFilters}
          variant="primary"
          size="large"
          style={{
            paddingVertical: 16,
            borderRadius: 12,
          }}
          textStyle={{
            fontSize: 18,
            fontWeight: 'bold',
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.backgroundWhite,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.borderButtonColor,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  placeholder: {
    width: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.color.black,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.color.black,
    marginBottom: 16,
  },
  filtersList: {
    gap: 16,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  filterText: {
    fontSize: 16,
    color: colors.color.black,
  },
  filterTextSelected: {
    color: colors.color.green,
    fontWeight: '600',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border.borderButtonColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.color.green,
    borderColor: colors.color.green,
  },
  checkIcon: {
    width: 14,
    height: 14,
    tintColor: colors.color.white,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border.borderButtonColor,
    backgroundColor: colors.background.backgroundWhite,
  },
});

export default ProductFilterScreen;