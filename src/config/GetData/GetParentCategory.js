import axios from 'axios';
import {IdeaServiceBaseUrl} from '../Environment.cfg';

const GetParentCategory = type => {
  return axios({
    crossDomain: true,
    method: 'post',
    url: `${IdeaServiceBaseUrl}/categorymanagement/getparentcategories`,
    data: {
      type: type,
    },
    validateStatus: false,
  })
    .then(function ({status, data}) {
      if (status === 200) {
        return data.data;
      }
    })
    .catch(function (error) {
      console.log(error);
      // need handling error
    });
};

export default GetParentCategory;
