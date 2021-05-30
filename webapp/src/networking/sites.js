/* eslint-disable no-undef */
import axios from 'axios';

const endpoint = (route) => {
  const url = API_URL || `http://${window.location.hostname}/api`;
  return `${url}${route}`;
};

export const getSites = () => {
  return axios.get(endpoint('/sites'))
    .then((response) => response.data.data)
    .catch((response) => {
      throw response.error;
    });
};
