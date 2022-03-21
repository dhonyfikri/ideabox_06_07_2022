import axios from 'axios';

const AddAchievement = (userId, ideaId, pencapaian) => {
  return axios({
    crossDomain: true,
    method: 'post',
    url: 'https://dev-users.digitalamoeba.id/trackrecord/createachievement',
    data: {
      userId: userId,
      ideaId: ideaId,
      pencapaian: pencapaian,
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

export default AddAchievement;
