import { createSlice } from '@reduxjs/toolkit';

const initialPurchase = {
  provider: 0,
  products: [],
  total: 0,
  cashPayment: true,
};

export const purchasesSlice = createSlice({
  name: 'purchases',
  initialState: {
    purchase: initialPurchase,
  },
  reducers: {
    setProvider: (state, { payload }) => {
      state.purchase.provider = payload;
      return state;
    },
    addProductPurchase: (state, { payload }) => {
      const idxPurchase = state.purchase.products.findIndex((item) => item.barcode === payload.barcode);
      idxPurchase >= 0
        ? (state.purchase.products[idxPurchase].quantity += payload.quantity)
        : state.purchase.products.push(payload);
      state.purchase.total += payload.cost * payload.quantity;
      return state;
    },
    removeProductPurchase: (state, { payload: { barcode, cost, quantity } }) => {
      state.purchase.products = state.purchase.products.filter((item) => item.barcode !== barcode);
      state.purchase.total -= cost * quantity;
      return state;
    },
    resetPurchase: (state) => {
      state.purchase = initialPurchase;
      return state;
    },
    setCashPayment: (state, { payload }) => {
      state.purchase.cashPayment = payload;
      return state;
    },
  },
});

export const { addProductPurchase, removeProductPurchase, resetPurchase, setCashPayment, setProvider } =
  purchasesSlice.actions;
