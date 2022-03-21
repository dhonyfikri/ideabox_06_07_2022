import axios from 'axios';

const DeleteIdeaManagement = id => {
  return axios({
    crossDomain: true,
    method: 'post',
    url: 'https://dev-ideas.digitalamoeba.id/ideamanagement/deleteideas',
    data: {
      id: id,
    },
    validateStatus: false,
  })
    .then((response, status) => {
      if (response.status === 200) {
        return response.status;
      } else {
        console.log(response.status);
      }
    })
    .catch(function (error) {
      console.log(error);
      // need handling error
    });
};

export default DeleteIdeaManagement;
