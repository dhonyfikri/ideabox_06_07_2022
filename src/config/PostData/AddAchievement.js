import axios from 'axios';
import {UserServiceBaseUrl} from '../Environment.cfg';

const AddAchievement = (userId, ideaId, pencapaian) => {
  return axios({
    crossDomain: true,
    method: 'post',
    url: `${UserServiceBaseUrl}/trackrecord/createachievement`,
    data: {
      userId: userId,
      ideaId: ideaId,
      pencapaian: pencapaian,
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

export default AddAchievement;
