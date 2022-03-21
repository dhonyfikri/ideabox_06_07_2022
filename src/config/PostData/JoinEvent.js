import axios from 'axios';

const JoinEvent = (userId, ideaId, eventId, createdBy) => {
  return axios({
    crossDomain: true,
    method: 'post',
    url: 'https://dev-events.digitalamoeba.id/joinevent',
    data: {
      userId: userId,
      ideaId: ideaId,
      eventId: eventId,
      createdBy: createdBy,
    },
    validateStatus: false,
  })
    .then((response, status) => {
      // console.log(response.data.status);
      if (response.data.status === 200) {
        return response.data.status;
      } else {
        console.log('gagal');
      }
    })
    .catch(function (error) {
      console.log(error);
      // need handling error
    });
};

export default JoinEvent;
