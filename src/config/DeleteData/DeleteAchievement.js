import axios from 'axios';

const DeleteAchievement = (id, userId) => {
  return axios({
    crossDomain: true,
    method: 'post',
    url: 'https://dev-users.digitalamoeba.id/trackrecord/deleteachievement',
    data: {
      achievementId: id,
      userId: userId,
    },
    validateStatus: false,
  })
    .then((response, status) => {
      return response.status;
    })
    .catch(function (error) {
      console.log(error);
      // need handling error
    });
};

export default DeleteAchievement;
