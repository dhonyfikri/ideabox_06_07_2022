import axios from 'axios';
import {IdeaServiceBaseUrl} from '../Environment.cfg';

const DeleteIdeaManagement = id => {
  return axios({
    crossDomain: true,
    method: 'post',
    url: `${IdeaServiceBaseUrl}/ideamanagement/deleteideas`,
    data: {
      id: id,
    },
    validateStatus: false,
  })
    .then((response, status) => {
      if (response.status === 200) {
        return response.status;
      } else {
        console.log(response.status);
      }
    })
    .catch(function (error) {
      console.log(error);
      // need handling error
    });
};

export default DeleteIdeaManagement;
