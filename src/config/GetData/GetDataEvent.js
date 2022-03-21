import axios from 'axios';

const GetDataCategory = () => {
  const dataCategory1 = require('./Event Services.postman_collection.json');
  return axios
    .get('https://dev-events.digitalamoeba.id/getcategoryevent')
    .then(response => {
      // setUpdate(response.data.data);
      return response.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};

const GetDataEvent = () => {
  const dataCategory1 = require('./Event Services.postman_collection.json');
  return axios
    .get('https://dev-events.digitalamoeba.id/showevent')
    .then(response => {
      // setUpdate(response.data.data);
      return response.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
// const GetDataCategory = () => {
//   const dataCategory1 = require('./Event Services.postman_collection.json');
//   const data = axios
//     .get(dataCategory1.item[0].item[4].request.url.raw)
//     .then(response => {
//       // setUpdate(response.data.data);
//       console.log(response.data.data);
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   return data;
// };
export {GetDataEvent, GetDataCategory};
