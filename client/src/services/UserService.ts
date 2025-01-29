import { AxiosResponse } from 'axios';
import $api from '../api';
import { IUser } from '../types/User';

export default class UserService {
  static getAllUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/users');
  }
}
