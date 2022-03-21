import axios from 'axios';

const GetDataCategoryManagement = () => {
  return axios
    .get('https://dev-ideas.digitalamoeba.id/CategoryManagement/index')
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
    .get('https://dev-ideas.digitalamoeba.id/ideamanagement/showideas')
    .then(response => {
      // setUpdate(response.data.data);
      return response.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export {GetDataCategoryManagement, GetDataIdeaManagement};
