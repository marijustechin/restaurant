import { AxiosResponse } from "axios";
import $api from "../api";
import { IAuthResponse } from "../types/authResponse";

export default class AuthService {
  // Naudojant statinius metodus nereikia pirma sukurti klasės objekto
  // o galima tiesiogiai iškviesti klasės metodą

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
    const res = $api.post("/users", { first_name, email, password });
    return res;
  }

  static async logout(): Promise<void> {
    return $api.post("/users/logout");
  }
}
