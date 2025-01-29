import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 0,
  first_name: '',
  email: '',
  role: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.first_name = action.payload.first_name;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.id = 0;
      state.first_name = '';
      state.email = '';
      state.role = '';
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
