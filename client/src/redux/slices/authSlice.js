import { createSlice } from '@reduxjs/toolkit';

const initialUser = {
  userName: '',
  token: '',
  isAuthenticated: false,
  role: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser,
  },
  reducers: {
    login: (state, { payload }) => {
      state.user = {
        ...payload,
        isAuthenticated: true,
      };
    },
    logout: (state) => {
      state.user = initialUser;
    },
  },
});

export const { login, logout } = authSlice.actions;
