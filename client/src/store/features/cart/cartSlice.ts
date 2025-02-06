import { createSlice } from "@reduxjs/toolkit";
import { IMenuItem } from "../../../types/MenuItem";

interface ICartItem {
  singleItem: IMenuItem;
  count: number;
  sum: number;
}

interface ICart {
  allItems: ICartItem[];
  totalCount: number;
  totalSum: number;
}

const initialState: ICart = {
  allItems: [],
  totalCount: 0,
  totalSum: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(status, action) {
      // ar yra toks patiekalas krepselyje
      const existingItem = status.allItems.find(
        (item) => item.singleItem.id === action.payload.id
      );

      // jei yra, atnaujinam count ir total
      if (existingItem) {
        const cartItem = {
          singleItem: action.payload,
          count: existingItem.count + 1,
          sum: existingItem.sum + action.payload.price,
        };

        const idx = status.allItems.findIndex(
          (menuItem) => menuItem.singleItem.id === cartItem.singleItem.id
        );

        status.allItems[idx].count++;
        status.allItems[idx].sum += cartItem.singleItem.price;

        status.totalCount++;
        status.totalSum += cartItem.sum;
      } else {
        // jei nera pridedam nauja
        const cartItem = {
          singleItem: action.payload,
          count: 1,
          sum: action.payload.price,
        };
        status.allItems.push(cartItem);
        status.totalCount++;
        status.totalSum += cartItem.sum;
      }
    },

    removeItem(status, action) {
      status.totalCount--;
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
