import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    addItem: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1
        });
      }
    },

    removeItem: (state, action) => {
      const itemId = action.payload;

      state.items = state.items.filter(
        (item) => item.id !== itemId
      );
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const item = state.items.find(
        (item) => item.id === id
      );

      if (item) {
        if (quantity > 0) {
          item.quantity = quantity;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== id
          );
        }
      }
    }
  }
});

export const {
  addItem,
  removeItem,
  updateQuantity
} = CartSlice.actions;

export default CartSlice.reducer;
