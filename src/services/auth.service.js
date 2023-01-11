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

  register({role,username,
    password,
    password_confirmation,
    first_name,
    last_name,
    patronymic,
    age,
    gender }
  ) {
    return axios.post(API_URL + "register", {
      username,
      password,
      password_confirmation,
      first_name,
      last_name,
      patronymic,
      age,
      gender,
      role
    });
  }

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user){
      const jwtData = user.accessToken.split('.')[1]
      const decodedJwtJsonData = window.atob(jwtData)
      const decodedJwtData = JSON.parse(decodedJwtJsonData)
      user['roles'] = decodedJwtData.roles;
      user['id'] = decodedJwtData.uid;
      user['post_id'] = decodedJwtData.post;

    }

    return user;
  }
}

export default new AuthService();
