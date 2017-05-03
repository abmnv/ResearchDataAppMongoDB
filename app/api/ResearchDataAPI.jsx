import axios from 'axios';

export const getFileBlob = (file) => {
  return axios.get(file.url, {responseType: 'blob'})
  .then((response) => {
    return response.data;
  }).catch((err) => {
    //console.log('Error:', err);
    throw new Error(err);
  });
}

export const getProjects = () => {
  return axios.get('/projects').then((response) => {
    return response.data;
  }).catch((err) => {
    throw new Error(err);
  });
}
