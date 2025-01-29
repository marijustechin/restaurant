import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  role: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.id = 0;
      state.role = "";
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
