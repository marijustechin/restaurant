import axios from "axios";
import { API_URL } from ".";

const MENU_API = `${API_URL}/menu`;

export const apiGetAllMenuItems = async () => {
  try {
    const menuItems = await axios.get(MENU_API);

    return menuItems.data;
  } catch (e) {
    return { error: e };
  }
};
