import axios from 'axios';
import {UserServiceBaseUrl} from '../Environment.cfg';

const GetDataCfu = () => {
  return axios
    .get(`${UserServiceBaseUrl}/trackrecord/getcfufu`)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};
const GetDataCategoryUnit = cfuid => {
  return axios({
    crossDomain: true,
    method: 'post',
    url: `${UserServiceBaseUrl}/trackrecord/getcategoryunit`,
    data: {
      cfufuId: cfuid,
    },
    validateStatus: false,
  })
    .then(response => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      // need handling error
    });
};
const GetDataUnit = categoryid => {
  return axios({
    crossDomain: true,
    method: 'post',
    url: `${UserServiceBaseUrl}/trackrecord/getunit`,
    data: {
      categoryUnitId: categoryid,
    },
    validateStatus: false,
  })
    .then(response => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      // need handling error
    });
};
export {GetDataCategoryUnit, GetDataCfu, GetDataUnit};
