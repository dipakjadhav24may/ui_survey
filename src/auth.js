import { setStorage, getStorage } from "./utils/helpermethods";

class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(cb, userType, Route) {
    this.authenticated = true;
    setStorage("authenticated", this.authenticated);
    setStorage("userType", userType);
    const REACT_APP_BUILD_VERSION = process.env.REACT_APP_BUILD_VERSION;
    localStorage.setItem("version", REACT_APP_BUILD_VERSION);
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    this.clearLocalStorage();
    cb();
  }

  clearLocalStorage() {
    localStorage.removeItem("authenticated");
    localStorage.removeItem("authenticated_expiresIn");
  }

  isAuthenticated() {
    this.authenticated =
      getStorage("authenticated") !== null
        ? getStorage("authenticated")
        : false;
    if (!this.authenticated) {
      this.clearLocalStorage();
    }
    // this.authenticated = true;

    return this.authenticated;
  }

  getFromLocalStorage(key) {
    let value = localStorage.getItem(key);
    return value;
  }
}

export default new Auth();
