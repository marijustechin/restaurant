import { AxiosResponse } from "axios";
import $api from "../api";
import { IAuthResponse } from "../types/types";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post(`/users/login`, { email, password });
  }

  static async registration(
    first_name: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post("/users", { first_name, email, password });
  }

  static async logout(): Promise<void> {
    return $api.post("/users/logout");
  }
}
