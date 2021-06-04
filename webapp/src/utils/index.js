/* eslint-disable no-undef */

export const imageToDataURI = (image) => {
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.onerror = (err) => {
      reject(err);
    };
  });
};

export const changePageTitle = (extra) => {
  document.title = extra ? `Webframes | ${extra}` : 'Webframes';
};
