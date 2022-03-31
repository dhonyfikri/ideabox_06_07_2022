import axios from 'axios';
import {UserServiceBaseUrl} from '../Environment.cfg';

const GetDataTrackRecord = id => {
  return axios({
    crossDomain: true,
    method: 'post',
    url: `${UserServiceBaseUrl}/trackrecord`,
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

export default GetDataTrackRecord;
