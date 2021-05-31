import axios from 'axios';
import { imageToDataURI } from '../utils';

const AVATARS_URL = 'https://ui-avatars.com/api';

const endpoint = (options) => {
  return `${AVATARS_URL}/?${new URLSearchParams(options).toString()}`;
};

export const getImageWithInitials = (name, { background, size } = { background: 'random', size: 128 }) => {
  return axios.get(endpoint({ name, background, size }), { responseType: 'blob' })
    .then((response) => {
      return response.data;
    })
    .then((blob) => {
      return imageToDataURI(blob);
    })
    .catch((error) => {
      throw error.message;
    });
};
