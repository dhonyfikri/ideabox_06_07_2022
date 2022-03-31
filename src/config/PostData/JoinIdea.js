import axios from 'axios';
import {IdeaServiceBaseUrl} from '../Environment.cfg';

const JoinIdea = (ideaId, userId, notes) => {
  return axios({
    crossDomain: true,
    method: 'post',
    url: `${IdeaServiceBaseUrl}/joinidea`,
    data: {
      ideaId: ideaId,
      userId: userId,
      notes: notes,
    },
    validateStatus: false,
  })
    .then((response, status) => {
      // console.log(response.data.status);
      return response.data.status;
    })
    .catch(function (error) {
      console.log(error);
      // need handling error
    });
};

export default JoinIdea;
