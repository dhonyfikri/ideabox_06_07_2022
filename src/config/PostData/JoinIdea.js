import axios from 'axios';

const JoinIdea = (ideaId, userId, notes) => {
  return axios({
    crossDomain: true,
    method: 'post',
    url: 'https://dev-ideas.digitalamoeba.id/joinidea',
    data: {
      ideaId: ideaId,
      userId: userId,
      notes: notes,
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

export default JoinIdea;
