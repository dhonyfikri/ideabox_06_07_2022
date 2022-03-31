import axios from 'axios';
import {IdeaServiceBaseUrl} from '../Environment.cfg';

const LikeIdea = (ideaId, createdBy) => {
  return axios({
    crossDomain: true,
    method: 'post',
    url: `${IdeaServiceBaseUrl}/addlike`,
    data: {
      ideaId: ideaId,
      createdBy: createdBy,
    },
    validateStatus: false,
  })
    .then((response, status) => {
      // console.log(response.data.status);
      if (response.data.status === 200) {
        return response.data.messages;
      } else {
        console.log('gagal');
      }
    })
    .catch(function (error) {
      console.log(error);
      // need handling error
    });
};

export default LikeIdea;
