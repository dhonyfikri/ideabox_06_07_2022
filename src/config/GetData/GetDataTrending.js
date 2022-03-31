import axios from 'axios';
import {IdeaServiceBaseUrl} from '../Environment.cfg';
const GetDataTopComment = () => {
  return axios
    .get(`${IdeaServiceBaseUrl}/topcomment`)
    .then(response => {
      // setUpdate(response.data.data);
      return response.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
const GetDataTopLike = () => {
  return axios
    .get(`${IdeaServiceBaseUrl}/toplike`)
    .then(response => {
      // setUpdate(response.data.data);
      return response.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
const GetDataTrending = () => {
  return axios
    .get(`${IdeaServiceBaseUrl}/toptrending`)
    .then(response => {
      // setUpdate(response.data.data);
      return response.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export {GetDataTopComment, GetDataTopLike, GetDataTrending};
