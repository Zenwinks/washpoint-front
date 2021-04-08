import {api} from '../../http';
import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('data', JSON.stringify(response.data))
        }
        return response.data;
      });
  }

  logout() {
    return api
      .get('logout')
      .then(() => {
        localStorage.removeItem('data');
      });
  }

  register(user) {
    return axios.post(API_URL + 'register', {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password
    });
  }

  registerConfirmation(token) {
    return axios.post(API_URL + 'validate-account', {
      token: token
    });
  }
}

export default new AuthService();
