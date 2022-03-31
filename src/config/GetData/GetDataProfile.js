import axios from 'axios';
import {UserServiceBaseUrl} from '../Environment.cfg';

const GetDataProfile = id => {
  return axios({
    crossDomain: true,
    method: 'post',
    url: `${UserServiceBaseUrl}/profile`,
    data: {
      id: id,
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

export default GetDataProfile;
