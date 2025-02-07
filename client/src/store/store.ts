import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import userReducer from "./features/user/userSlice";
import menuReducer from "./features/menu/menuSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    menu: menuReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = ReturnType<AppStore["dispatch"]>;
