import axios from 'axios';

const LikeIdea = (ideaId, createdBy) => {
  return axios({
    crossDomain: true,
    method: 'post',
    url: 'https://dev-ideas.digitalamoeba.id/addlike',
    data: {
      ideaId: ideaId,
      createdBy: createdBy,
    },
    validateStatus: false,
  })
    .then((response, status) => {
      // console.log(response.data.status);
      if (response.data.status === 200) {
        return response.data.messages;
      } else {
        console.log('gagal');
      }
    })
    .catch(function (error) {
      console.log(error);
      // need handling error
    });
};

export default LikeIdea;
