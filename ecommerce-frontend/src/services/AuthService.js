import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.username) {
            const userData = {
                ...response.data,
                password: password
            };
          localStorage.setItem("user", JSON.stringify(userData));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, password, role) {
    return axios.post(API_URL + "register", {
      username,
      password,
      role
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

const authService = new AuthService();
export default authService;