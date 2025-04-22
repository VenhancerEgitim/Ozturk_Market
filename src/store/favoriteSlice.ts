import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../types/product';
import {RootState} from './store';

interface FavoriteState {
  items: Product[];
}

const initialState: FavoriteState = {
  items: [],
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const existingIndex = state.items.findIndex(
        item => item.id === action.payload.id,
      );
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const {toggleFavorite, clearFavorites} = favoriteSlice.actions;
export const selectFavoriteItems = (state: RootState) => state.favorites.items;
export const selectIsFavorite = (productId: number) => (state: RootState) => 
  state.favorites.items.some(item => item.id === productId);

export default favoriteSlice.reducer; 