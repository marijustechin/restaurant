import axios from "axios";

const MENU_API = "http://localhost:3003/api/v1/menu";

export const apiGetAllMenuItems = async () => {
  try {
    const menuItems = await axios.get(MENU_API);

    return menuItems.data;
  } catch (e) {
    return { error: e };
  }
};
