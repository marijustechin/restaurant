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

// ar yra krepselis localStorage?
const cartFromStorage = localStorage.getItem("resCart");

const initialState: ICart = cartFromStorage
  ? JSON.parse(cartFromStorage)
  : { allItems: [], totalCount: 0, totalSum: 0 };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(status, action) {
      // ar yra toks patiekalas krepselyje
      const existingItem = status.allItems.find(
        (item) => item.singleItem.id === action.payload.id
      );

      let cartItem: ICartItem;
      // jei yra, atnaujinam count ir total
      if (existingItem) {
        cartItem = {
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
        status.totalSum += cartItem.singleItem.price;
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
      // cia reiketu krepseli irasyti i local storate
      localStorage.setItem("resCart", JSON.stringify(status));
    },

    removeItem(status, action) {
      // surandam masyve reikalinga patiekala
      const existingItem = status.allItems.find(
        (item) => item.singleItem.id === action.payload.id
      );

      if (existingItem) {
        // pakeiciam reiksmes
        status.totalCount--;
        status.totalSum -= existingItem.singleItem.price;
        if (existingItem.count > 1) {
          const idx = status.allItems.findIndex(
            (menuItem) => menuItem.singleItem.id === existingItem.singleItem.id
          );
          status.allItems[idx].count--;
          status.allItems[idx].sum -= existingItem.singleItem.price;
        } else {
          const newStatus = status.allItems.filter(
            (item) => item.singleItem.id !== existingItem.singleItem.id
          );
          // pasalinam is masyvo visa patiekalo objekta
          status.allItems = [...newStatus];
        }
      }
      // cia reiketu krepseli irasyti i local storate
      localStorage.setItem("resCart", JSON.stringify(status));
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
