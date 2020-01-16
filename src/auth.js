import jwtDecode from "jwt-decode";

class Auth {
  constructor() {
    this.authenticated = false;
  }

  clearLocalStorage() {
    localStorage.removeItem("UserToken");
  }

  isAuthenticated() {
    const token = localStorage.UserToken;

    if (token) {
      let decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        this.authenticated = false;
      } else {
        this.authenticated = true;
      }
    } else {
      this.authenticated = false;
    }
    if (!this.authenticated) {
      this.clearLocalStorage();
    }
    return this.authenticated;
  }

  getFromLocalStorage(key) {
    let value = localStorage.getItem(key);
    return value;
  }
}

export default new Auth();
