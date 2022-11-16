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
    updateCashOuts: (state, { payload: { id, ...restOut } }) => {
      const out = state.listCashOuts.find((out) => out.id === id);
      const idx = state.listCashOuts.indexOf(out);
      state.listCashOuts[idx] = { ...out, ...restOut };
      return state;
    },
  },
});

export const { addCashOuts, setListCashOuts, updateCashOuts } = cashOutsSlice.actions;
