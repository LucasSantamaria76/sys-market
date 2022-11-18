import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  item: {
    barcode: '',
    description: '',
    quantity: 1,
  },
};

export const saleSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      const idxProducts = state.items?.findIndex((item) => item.barcode === payload.barcode);
      if (idxProducts >= 0) {
        const quantity = state.items[idxProducts].quantity + Number(payload.quantity);
        const subTotal = quantity * Number(payload.price);
        state.items[idxProducts] = { ...state.items[idxProducts], quantity, subTotal };
        return;
      }
      state.items.push(payload);
    },
    ModifyQuantity: (state, { payload }) => {
      const idxProd = state.items?.findIndex((item) => item.barcode === payload.barcode);
      const quantity = Number(payload.quantity);
      const subTotal = quantity * Number(payload.price);
      state.items[idxProd] = { ...state.items[idxProd], quantity, subTotal };
    },
    deleteItem: (state, { payload }) => {
      state.items = state.items.filter((item) => item.barcode !== payload);
    },
    clearSale: (state) => {
      return initialState;
    },
  },
});

export const { addItem, clearSale, deleteItem, ModifyQuantity } = saleSlice.actions;
