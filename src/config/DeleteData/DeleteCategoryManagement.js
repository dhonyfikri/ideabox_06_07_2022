import axios from 'axios';
import {IdeaServiceBaseUrl} from '../Environment.cfg';

const DeleteCategoryManagement = id => {
  return axios({
    crossDomain: true,
    method: 'post',
    url: `${IdeaServiceBaseUrl}/categorymanagement/delete`,
    data: {
      id: id,
    },
    validateStatus: false,
  })
    .then((response, status) => {
      if (response.status === 200) {
        return response.status;
      } else {
        console.log('gagal');
      }
    })
    .catch(function (error) {
      console.log(error);
      // need handling error
    });
};

export default DeleteCategoryManagement;
