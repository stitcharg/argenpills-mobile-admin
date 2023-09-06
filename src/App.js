import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { PillList } from "./components/pills"
import { PillEdit } from './components/editpill';
import { PillAdd } from './components/addpill';

import authProvider from './components/authprovider';
import dashboard from './pages/dashboard';
import { fetchUtils } from 'react-admin';

import ReactGA from 'react-ga';

const URL = process.env.REACT_APP_ENDPOINT;
const CDN_IMAGES = process.env.REACT_APP_CDN_IMAGES;

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const { token } = JSON.parse(localStorage.getItem('auth'));
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = jsonServerProvider(URL, httpClient);

const myDataProvider = {
  ...dataProvider,
  create: (resource, params) => {
    if (resource !== 'items' && (!params.data.upl_image || !params.data.upl_lab_image)) {
      // fallback to the default implementation
      return dataProvider.create(resource, params);
    }

    //const fileExtension = fileName.split('.').pop();

    if (params.data.upl_image) {
      const rawFile = params.data.upl_image.rawFile;
      const fileName = rawFile.path;  //will be used to know the extension for the upload  
      const pill_image_raw = params.data.upl_image;

      if (!(pill_image_raw.rawFile instanceof File)) {
        return Promise.reject('Error: Not a file...'); // Didn't test this...
      }

      var dataWithImageProm = Promise.resolve(convertFileToBase64(pill_image_raw))
        .then((picture64) => ({
          src: picture64.replace(/data:image\/(png|jpg|jpeg);base64,/, ''),
          title: `${fileName}`
        }))
        .then(transformedpill_image_raw => {
          return {
            upl_image: transformedpill_image_raw
          }
        });

    }

    if (params.data.upl_lab_image) {
      //Lab image
      const rawFile = params.data.upl_lab_image.rawFile;
      const lab_image_raw = params.data.upl_lab_image;
      const fileName = rawFile.path;  //will be used to know the extension for the upload  

      if (!(lab_image_raw.rawFile instanceof File)) {
        return Promise.reject('Error: Not a file...'); // Didn't test this...
      }

      var dataWithLabProm = Promise.resolve(convertFileToBase64(lab_image_raw))
        .then((picture64) => ({
          src: picture64.replace(/data:image\/(png|jpg|jpeg);base64,/, ''),
          title: `${fileName}`
        }))
        .then(transformedpill_image_raw => {
          return {
            upl_lab: transformedpill_image_raw
          }
        });

    }

    return Promise.all([dataWithImageProm, dataWithLabProm]).then((results) => {
      const pillImage = results[0];
      const labImage = results[1];

      const existingData = {
        data: {
          ...params.data
        }
      }

      if (pillImage) {
        existingData.data.upl_image = pillImage.upl_image.src;
      }

      if (labImage) {
        existingData.data.upl_lab = labImage.upl_lab.src;
      }

      return Promise.resolve(dataProvider.create(resource, existingData));
    });

    //return Promise.reject("DONT SUBMIT");

  },
  update: (resource, params) => {
    if (resource !== 'items' && (!params.data.upl_image || !params.data.upl_lab_image)) {
      // fallback to the default implementation
      return dataProvider.update(resource, params);
    }

    //const fileExtension = fileName.split('.').pop();

    if (params.data.upl_image) {
      const rawFile = params.data.upl_image.rawFile;
      const fileName = rawFile.path;  //will be used to know the extension for the upload  
      const pill_image_raw = params.data.upl_image;

      if (!(pill_image_raw.rawFile instanceof File)) {
        return Promise.reject('Error: Not a file...'); // Didn't test this...
      }

      var dataWithImageProm = Promise.resolve(convertFileToBase64(pill_image_raw))
        .then((picture64) => ({
          src: picture64.replace(/data:image\/(png|jpg|jpeg);base64,/, ''),
          title: `${fileName}`
        }))
        .then(transformedpill_image_raw => {
          return {
            upl_image: transformedpill_image_raw
          }
        });
    }

    if (params.data.upl_lab_image) {
      //Lab image
      const rawFile = params.data.upl_lab_image.rawFile;
      const lab_image_raw = params.data.upl_lab_image;
      const fileName = rawFile.path;  //will be used to know the extension for the upload  

      if (!(lab_image_raw.rawFile instanceof File)) {
        return Promise.reject('Error: Not a file...'); // Didn't test this...
      }

      var dataWithLabProm = Promise.resolve(convertFileToBase64(lab_image_raw))
        .then((picture64) => ({
          src: picture64.replace(/data:image\/(png|jpg|jpeg);base64,/, ''),
          title: `${fileName}`
        }))
        .then(transformedpill_image_raw => {
          return {
            upl_lab: transformedpill_image_raw
          }
        });
    }

    return Promise.all([dataWithImageProm, dataWithLabProm]).then((results) => {

      const pillImage = results[0];
      const labImage = results[1];

      if (params.data.image)
        params.data.image = params.data.image.replace(CDN_IMAGES, '');
      if (params.data.lab_image)
        params.data.lab_image = params.data.lab_image.replace(CDN_IMAGES, '');

      const existingData = {
        ...params,
        data: {
          ...params.data
        }
      }

      if (pillImage) {
        existingData.data.upl_image = pillImage.upl_image.src;
      }

      if (labImage) {
        existingData.data.upl_lab = labImage.upl_lab.src;
      }

      //console.log(existingData);

      return Promise.resolve(dataProvider.update(resource, existingData));
    });

    //return Promise.reject("DONT SUBMIT");

  },
};

/**
* Convert a `File` object returned by the upload input into a base 64 string.
* That's not the most optimized way to store images in production, but it's
* enough to illustrate the idea of data provider decoration.
*/
const convertFileToBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(file.rawFile);
  });

function App() {

  if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize('UA-221362845-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  return (
    <Admin
      dashboard={dashboard}
      dataProvider={myDataProvider}
      authProvider={authProvider}
      title="Administracion"
    >
      <Resource name="items" list={PillList} edit={PillEdit} create={PillAdd} />
    </Admin>
  );
}

export default App;