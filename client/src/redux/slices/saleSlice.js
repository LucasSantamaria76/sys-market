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
      const prodExists = state.items?.find((item) => item.barcode === payload.barcode);
      if (!!prodExists?.barcode) {
        const idx = state.items.indexOf(prodExists);
        const quantity = state.items[idx].quantity + Number(payload.quantity);
        const subTotal = quantity * Number(payload.price);
        state.items[idx] = { ...state.items[idx], quantity, subTotal };
        return;
      }
      state.items.push(payload);
    },
    ModifyQuantity: (state, { payload }) => {
      const prod = state.items?.find((item) => item.barcode === payload.barcode);
      const idx = state.items.indexOf(prod);
      const quantity = Number(payload.quantity);
      const subTotal = quantity * Number(prod.price);
      state.items[idx] = { ...state.items[idx], quantity, subTotal };
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
