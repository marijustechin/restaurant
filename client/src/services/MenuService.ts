import { AxiosResponse } from "axios";
import $api from "../api";
import { IMenuItem } from "../types/MenuItem";

export default class MenuService {
  // visi patiekalai - neapsaugotas
  static getAllMenus(query?: string): Promise<AxiosResponse<IMenuItem[]>> {
    if (query) {
      // uzklausa su parametrais
      return $api.get<IMenuItem[]>(`/menu${query}`);
    } else {
      // visi patiekalai
      return $api.get<IMenuItem[]>("/menu");
    }
  }

  // visi patiekalai - neapsaugotas
  static getMenuItemById(itemId: number): Promise<AxiosResponse<IMenuItem>> {
    return $api.get<IMenuItem>(`/menu/${itemId}`);
  }

  // tik admin
  static createMenu(
    name: string,
    description: string,
    image: string,
    category_id: number,
    price: number
  ): Promise<AxiosResponse<IMenuItem>> {
    return $api.post("/menu", { name, description, category_id, price, image });
  }

  // tik admin
  static updateMenuItem(
    id: number,
    name: string,
    description: string,
    image: string,
    category_id: number,
    price: number
  ): Promise<AxiosResponse<IMenuItem>> {
    return $api.put(`/menu/${id}`, {
      name,
      description,
      category_id,
      price,
      image,
    });
  }

  // tik admin
  static deleteMenuItem = (id: string): Promise<AxiosResponse> => {
    return $api.delete(`/menu/${id}`);
  };
}
