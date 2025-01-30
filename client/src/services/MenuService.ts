import { AxiosResponse } from 'axios';
import { IUser } from '../types/User';
import $api from '../api';

export default class MenuService {
  static getAllMenus(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/users');
  }

  static createMenu(): Promise<AxiosResponse<IUser>> {
    return $api.post('/menu');
  }

  static editMenu(id: string): Promise<AxiosResponse<IUser>> {
    return $api.put(`/menu/${id}`);
  }
}
