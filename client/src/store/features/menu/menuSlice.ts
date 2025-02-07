import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";
import MenuService from "../../../services/MenuService";
import { IMenuItem } from "../../../types/MenuItem";

interface IMenuState {
  menus: IMenuItem[];
  minPrice: number;
  maxPrice: number;
  perPage: number;
  categories: string[];
  status: string;
  error: string | undefined;
}

const initialState: IMenuState = {
  menus: [],
  minPrice: 0,
  maxPrice: 0,
  perPage: 9,
  categories: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: undefined,
};

export const getMenuItems = createAsyncThunk("menu/getMenuItems", async () => {
  try {
    const res = await MenuService.getAllMenus();

    return [...res.data];
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      console.log(e.response?.data.message);
      return null;
    }

    if (e instanceof Error) {
      console.log(e.message);
    }
  }
});

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getMenuItems.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMenuItems.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(getMenuItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const allMenus = (state: RootState) => state.menu.menus;

// export const { cia bus veiksmai } = menuSlice.actions;

export default menuSlice.reducer;
