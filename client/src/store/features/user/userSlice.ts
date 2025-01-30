import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { IUser } from "../../../types/User";

const token = localStorage.getItem("resToken");

let userData: IUser = {
  id: "0",
  first_name: "",
  email: "",
  role: "",
  address: "",
  phone_number: "",
};

if (token) {
  userData = jwtDecode(token);
}

// const initialState = () => {
//   if (userData) {
//     return {
//       id: userData.id,
//       first_name: userData.first_name,
//       email: userData.email,
//       role: userData.role,
//       address: userData.address,
//       phone_number: userData.phone_number,
//     };
//   }
// };

const initialState = {
  id: userData.id,
  first_name: userData.first_name,
  email: userData.email,
  role: userData.role,
  address: userData.address,
  phone_number: userData.phone_number,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.first_name = action.payload.first_name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.address = action.payload.address;
      state.phone_number = action.payload.phone_number;
    },
    logout: (state) => {
      state.id = "0";
      state.first_name = "";
      state.email = "";
      state.role = "";
      state.address = "";
      state.phone_number = "";
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
