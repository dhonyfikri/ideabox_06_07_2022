import axios from 'axios';
import {UserServiceBaseUrl} from '../Environment.cfg';

const loginLDAP = (username, password) => {
  return new Promise((resolve, reject) => {
    axios({
      crossDomain: true,
      method: 'post',
      url: `${UserServiceBaseUrl}/authorize/ldap`,
      data: {
        ldap: {
          username: username,
          password: password,
        },
      },
      validateStatus: false,
    })
      .then(function ({status, data}) {
        if (status === 200) {
          resolve({rejectFromServer: false, data: data});
        } else {
          resolve({rejectFromServer: true, code: status});
        }
      })
      .catch(err => reject('error: ' + err));
  });
};

export {loginLDAP};
