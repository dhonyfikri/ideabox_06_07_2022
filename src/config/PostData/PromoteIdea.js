import axios from 'axios';

const PromoteIdea = (ideaId, notes) => {
  return axios({
    crossDomain: true,
    method: 'post',
    url: 'https://dev-ideas.digitalamoeba.id/requestsupport',
    data: {
      ideaId: ideaId,
      userId: 2,
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

export default PromoteIdea;
