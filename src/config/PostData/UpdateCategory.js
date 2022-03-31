import axios from 'axios';
import {IdeaServiceBaseUrl} from '../Environment.cfg';

const UpdateCategory = (id, parentId, name, updatedBy, type) => {
  return axios({
    crossDomain: true,
    method: 'put',
    url: `${IdeaServiceBaseUrl}/categorymanagement/update`,
    data: {
      id: id,
      parentId: parentId,
      name: name,
      updatedBy: updatedBy,
      type: type,
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

export default UpdateCategory;
