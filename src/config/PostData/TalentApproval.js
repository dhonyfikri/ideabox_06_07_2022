import axios from 'axios';
import {IdeaServiceBaseUrl} from '../Environment.cfg';

const PostTalentApproval = (userId, status, id) => {
  return axios({
    crossDomain: true,
    method: 'post',
    url: `${IdeaServiceBaseUrl}/TalentApproval/talentApproval`,
    data: {
      userId: userId,
      status: status,
      id: id,
    },
    validateStatus: false,
  })
    .then((response, status) => {
      // console.log(response.data.status);
      if (response.data.status === 200) {
        return response.data.status;
      } else {
        console.log('gagal');
      }
    })
    .catch(function (error) {
      console.log(error);
      // need handling error
    });
};

export default PostTalentApproval;
