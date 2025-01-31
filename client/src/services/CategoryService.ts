import { AxiosResponse } from "axios";
import $api from "../api";
import { ICategory } from "../types/Category";

export default class CategoryService {
  static getAllCategories(): Promise<AxiosResponse<ICategory[]>> {
    return $api.get("/category");
  }

  static addCategory(category_name: string): Promise<AxiosResponse<ICategory>> {
    return $api.post("/category", { category_name });
  }

  static deleteCategory(catId: string): Promise<AxiosResponse> {
    return $api.delete(`/category/${catId}`);
  }

  static getCategoryById(catId: string): Promise<AxiosResponse<ICategory>> {
    return $api.get(`/category/${catId}`);
  }

  static updateCategory(
    category_name: string
  ): Promise<AxiosResponse<ICategory>> {
    return $api.put("/category", { category_name });
  }
}
