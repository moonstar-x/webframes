/* eslint-disable no-undef */
import axios from 'axios';

const endpoint = (route) => {
  const url = API_URL || `http://${window.location.href}/api`;
  return `${url}${route}`;
};

export const getSites = () => {
  return axios.get(endpoint('/sites'))
    .then((response) => response.data.data)
    .catch((error) => {
      throw error.response?.data.message || error.message;
    });
};

export const getOrder = () => {
  return axios.get(endpoint('/sites/order'))
    .then((response) => response.data.data)
    .catch((error) => {
      throw error.response?.data.message || error.message;
    });
};
