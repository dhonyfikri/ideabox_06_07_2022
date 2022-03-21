import axios from 'axios';
import {useState} from 'react';
import {defaultAuthDataUser} from '../Auth.cfg';

const GetDataUser = () => {
  const dataUser = require('./User Services.postman_collection.json');
  const [dataUserState, setDataUserState] = useState(defaultAuthDataUser);
  axios
    .get(dataUser.item[0].item[1].request.url.raw)
    .then(response => {
      // setUpdate(response.data.data);
      setDataUserState(response.data.data);
    })
    .catch(err => console.log(err));
  return dataUserState;
};

export default GetDataUser;
