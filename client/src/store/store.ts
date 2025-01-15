import { makeAutoObservable } from "mobx";
import { IUser } from "../types/types";
import AuthService from "../services/AuthService";

export default class Store {
  user = {} as IUser;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(authorized: boolean) {
    this.isAuth = authorized;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  async registration(first_name: string, email: string, password: string) {
    try {
      const res = await AuthService.registration(first_name, email, password);
      localStorage.setItem("token", res.data.accessToken);
      this.setAuth(true);
      this.setUser(res.data.user);
    } catch (e: unknown) {
      console.log(e);
    }
  }

  async login(email: string, password: string) {
    try {
      const res = await AuthService.login(email, password);
      localStorage.setItem("token", res.data.accessToken);
      this.setAuth(true);
      this.setUser(res.data.user);
      console.log(this.isAuth);
    } catch (e: unknown) {
      console.log(e);
    }
  }
}
