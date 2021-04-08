export default function authHeader() {
  let data = JSON.parse(localStorage.getItem('data'));

  if (data && data.accessToken) {
    return {Authorization: 'Bearer ' + data.accessToken};
  } else {
    return {};
  }
}
