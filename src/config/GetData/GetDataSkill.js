import axios from 'axios';
import {UserServiceBaseUrl} from '../Environment.cfg';

const GetDataSkill = () => {
  // let source = axios.CancelToken.source();
  // setTimeout(() => {
  //   source.cancel();
  // }, 5000);
  return axios
    .get(
      `${UserServiceBaseUrl}/trackrecord/getskillset`,
      // , {
      //   cancelToken: source.token,
      // }
    )
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export default GetDataSkill;
