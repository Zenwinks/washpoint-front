import {api} from '../../http';
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_API_URL

class UserService {
  updateUser(user) {
    return api.post(API_URL + 'user', user, {headers: authHeader()});
  }

  updatePwd(data) {
    return api.post(API_URL + 'changePassword', data, {headers: authHeader()});
  }
}

export default new UserService();
