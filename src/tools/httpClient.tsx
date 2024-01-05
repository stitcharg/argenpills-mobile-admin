import { fetchUtils } from "react-admin";

const httpClient = async (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json; charset=utf-8' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

export default httpClient;