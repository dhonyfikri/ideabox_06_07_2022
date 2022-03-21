import axios from 'axios';

const DeleteCategoryManagement = id => {
  return axios({
    crossDomain: true,
    method: 'post',
    url: 'https://dev-ideas.digitalamoeba.id/categorymanagement/delete',
    data: {
      id: id,
    },
    validateStatus: false,
  })
    .then((response, status) => {
      if (response.status === 200) {
        return response.status;
      } else {
        console.log('gagal');
      }
    })
    .catch(function (error) {
      console.log(error);
      // need handling error
    });
};

export default DeleteCategoryManagement;
