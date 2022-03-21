import axios from 'axios';

const GetDataProfile = id => {
  return axios({
    crossDomain: true,
    method: 'post',
    url: 'https://dev-users.digitalamoeba.id/profile',
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
