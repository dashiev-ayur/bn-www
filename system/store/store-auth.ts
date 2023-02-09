import { makeAutoObservable } from 'mobx';
import { RootStore } from '.';
import { api } from '../api';
import { IAuthDTO } from '../typing';

export class AuthStore {
  public rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  auth: IAuthDTO | null = null;
  isAuth = false;

  setAuth(auth: IAuthDTO | null) {
    if (auth) {
      localStorage.setItem('auth', JSON.stringify(auth));
      this.auth = auth;
      this.isAuth = true;
    } else {
      localStorage.setItem('auth', '');
      this.auth = null;
      this.isAuth = false;
    }
  }

  getAuth(): IAuthDTO | null {
    const s = localStorage.getItem('auth');
    return s ? JSON.parse(s) : null;
  }

  async logout() {
    try {
      const auth = this.getAuth();
      if (auth?.refresh_token) {
        console.log('logout !');
        await api.logout(auth.refresh_token);
      }
    } catch (err) {
      console.log('Error logout !', err);

    } finally {
      console.log('logout...fin');
      this.setAuth(null);
    }
  }

  async login(login: string, password: string) {
    try {
      const result = await api.auth({ login, password });
      this.setAuth(result.data);
      return result;
    } catch (err) {
      this.setAuth(null);
      throw err;
    }
  }

  async refresh() {
    try {
      const auth = this.getAuth();
      if (!auth?.refresh_token) {
        throw new Error('Empty refresh_token !');
      }
      const result = await api.refresh(auth.refresh_token);
      if (result.data) {
        this.setAuth(result.data);
      }
    } catch (err) {
      this.setAuth(null);
    }
  }

  async test() {
    try {
      const auth = this.getAuth();
      const result = await api.testAccessToken(auth?.access_token || '');
      this.setAuth(auth);
      return result.data;
    } catch (err) {
      this.setAuth(null);
      throw err;
    }
  }
}
