import { AuthStore } from "./store-auth";

export class RootStore {
  public auth:AuthStore;
  constructor() {
      this.auth = new AuthStore(this);
  }
}
export const store = new RootStore();
