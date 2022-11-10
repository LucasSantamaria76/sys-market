import { createSlice } from '@reduxjs/toolkit';
import { deleteUserAPI } from '../../functions/functionsUser';

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
      const user = state.users.find((user) => user.id === payload.id);
      const idx = state.users.indexOf(user);
      state.users[idx] = { ...payload };

      return state;
    },

    deleteUser: (state, { payload: { id, token } }) => {
      const user = state.users.find((user) => user.id === id);
      if (user) {
        const isAdministrator = user.role === 'ADMIN';
        const Administrators = state.users.filter((user) => user.role === 'ADMIN');
        if (!isAdministrator || Administrators.length > 1) {
          deleteUserAPI(id, token);
          state.users = state.users.filter((user) => user.id !== id);
          return;
        }
      }
      return state;
    },
  },
});

export const { addNewUser, deleteUser, setUsers, updateUser } = usersSlice.actions;
