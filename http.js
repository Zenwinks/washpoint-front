import axios from 'axios'
import User from "./src/models/User";

let data = JSON.parse(localStorage.getItem('data')) || new User()

export const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Authorization: 'Bearer ' + (JSON.parse(localStorage.getItem('data')) ? JSON.parse(localStorage.getItem('data')).accessToken : data.accessToken)
  }
})

//AXIOS interceptors
/**
 * Intercepte toute les requète sortante et ajoute le heade rauthorization
 */
api.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization = 'Bearer ' + (JSON.parse(localStorage.getItem('data')) ? JSON.parse(localStorage.getItem('data')).accessToken : data.accessToken)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

/**
 * Intercepte toute les réponse et ajoute le token au localstorage
 */
api.interceptors.response.use(
  function (response) {
    try {
      // if (response.headers.authorization) {
      //   let cleanToken = response.headers.authorization.split('Bearer ')
      //   sessionStorage.removeItem('AUTH')
      //   sessionStorage.setItem('AUTH', cleanToken[1])
      // }
      return response
    } catch (error) {
      console.log(error)
    }
  },
  function (error) {
    console.log(error)
    // handle error
    if (error.response.status === 400) {
      if (error.response.headers.authorization) {
        let cleanToken = error.response.headers.authorization.split('Bearer ')
        sessionStorage.removeItem('AUTH')
        sessionStorage.setItem('AUTH', cleanToken[1])
      }
    }
    if (error.response && error.status === 401) {
      sessionStorage.removeItem('data')
      window.location.reload()
    }
    throw error
  }
)
