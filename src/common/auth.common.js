
class Auth {
  /**
   * Authenticate a user. Save a accessToken and refreshToken string in Local Storage
   *
   * @param {string} accessToken
   * @param {string} refreshToken
   */
  static authenticateUser(accessToken, refreshToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return localStorage.getItem("accessToken") !== null;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    localStorage.removeItem("accessToken");
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken() {
    return localStorage.getItem("accessToken");
  }
}

export default Auth;
