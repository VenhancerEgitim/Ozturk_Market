import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../types/product';
import {RootState} from './store';

interface CartItem extends Product {
  quantity: number; // ürün miktarı
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [], // sepetteki ürünler
  total: 0,  // sepetin ttutarı
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => { // sepete ürün eklememe
      const {id} = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({...action.payload, quantity: 1});
      }
      
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    removeFromCart: (state, action: PayloadAction<number>) => { // sepetten ürün çıkarma
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    updateQuantity: (state, action: PayloadAction<{id: number; quantity: number}>) => { 
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      }
    },
    clearCart: (state) => { // sepeti temizleme
      state.items = [];
      state.total = 0;
    },
  },
});

export const {addToCart, removeFromCart, updateQuantity, clearCart} = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) => state.cart.total;
export const selectCartItemCount = (state: RootState) => 
  state.cart.items.reduce((count: number, item: CartItem) => count + item.quantity, 0);

export default cartSlice.reducer; 