import axios from 'axios';
const GetDataIdea = () => {
  return axios
    .get('https://dev-ideas.digitalamoeba.id/showideas')
    .then(response => {
      // setUpdate(response.data.data);
      return response.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};

const GetDetailIdea = id => {
  return axios({
    crossDomain: true,
    method: 'post',
    url: 'https://dev-ideas.digitalamoeba.id/showideas/getidea/',
    data: {
      ideaId: id,
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
export {GetDataIdea, GetDetailIdea};
