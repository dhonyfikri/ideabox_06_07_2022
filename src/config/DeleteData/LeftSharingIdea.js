import axios from 'axios';
import {IdeaServiceBaseUrl} from '../Environment.cfg';

const LeftSharingIdea = (userId, id) => {
  return axios({
    crossDomain: true,
    method: 'post',
    url: `${IdeaServiceBaseUrl}/leavesharingidea`,
    data: {
      userId: userId,
      id: id,
    },
    validateStatus: false,
  })
    .then((response, status) => {
      console.log('ini respone status', response.data.status);
      return response.data.status;
      //   if (response.status === 200) {
      //     return response.status;
      //   } else {
      //     console.log('gagal');
      //   }
    })
    .catch(function (error) {
      console.log(error);
      // need handling error
    });
};

export default LeftSharingIdea;
