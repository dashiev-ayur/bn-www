import axios from "axios";

class Singleton {

  private static instance: Singleton;
  private constructor() {}

  public static getInstance() {
    if (Singleton.instance === undefined) {
      Singleton.instance = new Singleton();
    }
    return this.instance;
  }
}

export default Singleton;