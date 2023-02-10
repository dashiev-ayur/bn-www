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

  private setAuth(auth: IAuthDTO | null) {
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

  public getAuth(): IAuthDTO | null {
    const s = localStorage.getItem('auth');
    return s ? JSON.parse(s) : null;
  }

  public async logout() {
    try {
      const auth = this.getAuth();
      if (auth?.refresh_token) {
        await api.logout(auth.refresh_token);
      }
    } catch (err) {
      throw err;
    } finally {
      this.setAuth(null);
    }
  }

  public async login(login: string, password: string) {
    try {
      const result = await api.auth({ login, password });
      this.setAuth(result.data);
      return result;
    } catch (err) {
      this.setAuth(null);
      throw err;
    }
  }

  public async refresh() {
    try {
      const auth = this.getAuth();
      if (!auth) throw new Error('Empty auth !');
      const result = await api.refresh(auth.refresh_token);
      this.setAuth(result.data);
      return result.data;
    } catch (err) {
      this.setAuth(null);
      throw err;
    }
  }

  async test() {
    try {
      const auth = this.getAuth();
      if(!auth) throw new Error('Empty auth !');
      const result = await api.testAccessToken(auth?.access_token || '');
      return result.data;
    } catch (err) {
      this.setAuth(null);
      throw err;
    }
  }
}
