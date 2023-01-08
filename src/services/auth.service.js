import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          const data = response.data;
          data["accessToken"] = data['token'];
          delete data['token'];
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register({username,
    password,
    password_confirmation,
    first_name,
    last_name,
    patronymic,
    age,
    gender}
  ) {
    return axios.post(API_URL + "register", {
      username,
      password,
      password_confirmation,
      first_name,
      last_name,
      patronymic,
      age,
      gender
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
