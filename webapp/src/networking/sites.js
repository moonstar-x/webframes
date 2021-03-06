/* eslint-disable no-undef */
import axios from 'axios';

const endpoint = (route) => {
  const url = API_URL || `${window.location.origin}/api`;
  return `${url}${route}`;
};

export const getSites = () => {
  return axios.get(endpoint('/sites'))
    .then((response) => response.data.data)
    .catch((error) => {
      throw error.response?.data.error || error.response?.data.message || error.message;
    });
};

export const postSite = (site) => {
  return axios.post(endpoint('/sites'), site)
    .then((response) => response.data.data)
    .catch((error) => {
      throw error.response?.data.error || error.response?.data.message || error.message;
    });
};

export const deleteSite = (id) => {
  return axios.delete(`${endpoint('/sites')}/${id}`)
    .then((response) => response.data.data)
    .catch((error) => {
      throw error.response?.data.error || error.response?.data.message || error.message;
    });
};

export const patchSite = (id, newSite) => {
  return axios.patch(`${endpoint('/sites')}/${id}`, newSite)
    .then((response) => response.data.data)
    .catch((error) => {
      throw error.response?.data.error || error.response?.data.message || error.message;
    });
};

export const getOrder = () => {
  return axios.get(endpoint('/sites/order'))
    .then((response) => response.data.data)
    .catch((error) => {
      throw error.response?.data.error || error.response?.data.message || error.message;
    });
};

export const putOrder = (newOrder) => {
  return axios.put(endpoint('/sites/order'), newOrder)
    .then((response) => response.data.data)
    .catch((error) => {
      throw error.response?.data.error || error.response?.data.message || error.message;
    });
};
