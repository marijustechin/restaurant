import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    inc: (state) => {
      state.count += 1;
    },
    dec: (state) => {
      state.count -= 1;
    },
  },
});

export const { inc, dec } = cartSlice.actions;

export default cartSlice.reducer;
