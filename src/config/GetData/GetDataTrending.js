import axios from 'axios';
const GetDataTopComment = () => {
  return axios
    .get('https://dev-ideas.digitalamoeba.id/topcomment')
    .then(response => {
      // setUpdate(response.data.data);
      return response.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
const GetDataTopLike = () => {
  return axios
    .get('https://dev-ideas.digitalamoeba.id/toplike')
    .then(response => {
      // setUpdate(response.data.data);
      return response.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
const GetDataTrending = () => {
  return axios
    .get('https://dev-ideas.digitalamoeba.id/toptrending')
    .then(response => {
      // setUpdate(response.data.data);
      return response.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export {GetDataTopComment, GetDataTopLike, GetDataTrending};
