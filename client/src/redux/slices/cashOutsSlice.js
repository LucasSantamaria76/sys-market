import { createSlice } from '@reduxjs/toolkit';

export const cashOutsSlice = createSlice({
  name: 'cashOuts',
  initialState: {
    listCashOuts: [],
  },
  reducers: {
    setListCashOuts: (state, { payload }) => {
      state.listCashOuts = payload;
      return state;
    },
    addCashOuts: (state, { payload }) => {
      state.listCashOuts.push(payload);
      return state;
    },
  },
});

export const { addCashOuts, setListCashOuts } = cashOutsSlice.actions;
