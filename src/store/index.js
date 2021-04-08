import {createStore} from 'vuex'
import {auth} from './auth.module';
import {store} from './store';

export default createStore({
  modules: {
    auth,
    store
  }
})
