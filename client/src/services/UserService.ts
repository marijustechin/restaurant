import { AxiosResponse } from "axios";
import $api from "../api";
import { IUser } from "../types/User";

export default class UserService {
  static getAllUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>("/users");
  }

  static updateUser(
    id: string,
    address: string,
    phone_number: string,
    first_name: string
  ): Promise<AxiosResponse> {
    return $api.put(`/users/${id}`, { first_name, address, phone_number });
  }
}
