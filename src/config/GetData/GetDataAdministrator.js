import axios from 'axios';
import {IdeaServiceBaseUrl} from '../Environment.cfg';

const GetDataCategoryManagement = () => {
  return axios
    .get(`${IdeaServiceBaseUrl}/CategoryManagement/index`)
    .then(response => {
      // setUpdate(response.data.data);
      return response.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
const GetDataIdeaManagement = () => {
  return axios
    .get(`${IdeaServiceBaseUrl}/ideamanagement/showideas`)
    .then(response => {
      // setUpdate(response.data.data);
      return response.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export {GetDataCategoryManagement, GetDataIdeaManagement};
