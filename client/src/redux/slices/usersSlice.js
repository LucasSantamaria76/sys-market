import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
  },
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = [...payload];
    },
    addNewUser: (state, { payload }) => {
      state.users = [...state.users, payload];
      return state;
    },
    updateUser: (state, { payload }) => {
      const idx = state.users.findIndex((user) => user.id === payload.id);
      state.users[idx] = payload;
      return state;
    },

    deleteUser: (state, { payload }) => {
      state.users = state.users.filter((user) => user.id !== payload);
      return state;
    },
  },
});

export const { addNewUser, deleteUser, setUsers, updateUser } = usersSlice.actions;
