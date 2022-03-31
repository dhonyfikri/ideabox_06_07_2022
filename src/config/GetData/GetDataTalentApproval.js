import axios from 'axios';
import {IdeaServiceBaseUrl} from '../Environment.cfg';

const GetDataTalentApproval = id => {
  return axios({
    crossDomain: true,
    method: 'post',
    url: `${IdeaServiceBaseUrl}/showapproval`,
    data: {
      userId: id,
    },
    validateStatus: false,
  })
    .then(function ({status, data}) {
      if (status === 200) {
        return data.data;
      }
    })
    .catch(function (error) {
      console.log(error);
      // need handling error
    });
};

export default GetDataTalentApproval;
