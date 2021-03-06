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

export const processFrameURL = (url) => {
  const isWildcardPresent = url.match(/(https?:\/\/\*)/gi);

  if (!isWildcardPresent) {
    return url;
  }

  const protocolIndex = url.indexOf('://');
  const protocol = url.substring(0, protocolIndex + 3);
  const portIndex = url.lastIndexOf(':');
  const port = portIndex > -1 && portIndex !== protocolIndex ? url.substring(portIndex) : '';

  return `${protocol}${window.location.hostname}${port}`;
};
