import axios from 'axios';

const GetDataCfu = () => {
  return axios
    .get('https://dev-users.digitalamoeba.id/trackrecord/getcfufu')
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
    url: 'https://dev-users.digitalamoeba.id/trackrecord/getcategoryunit',
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
    url: 'https://dev-users.digitalamoeba.id/trackrecord/getunit',
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
