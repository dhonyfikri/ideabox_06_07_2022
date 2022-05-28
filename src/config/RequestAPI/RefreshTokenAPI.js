import axios from 'axios';
import {ApiGatewayBaseUrl} from '../Environment.cfg';

const RefreshTokenAPI = refreshToken => {
  return new Promise(resolve => {
    axios({
      crossDomain: true,
      method: 'post',
      url: `${ApiGatewayBaseUrl}/auth/refresh`,
      data: {
        refreshToken: refreshToken,
      },
    })
      .then(response => {
        // console.log(response.data);
        if (response.data.status === 200) {
          resolve({
            status: 'SUCCESS',
            message: 'You successfully refresh login',
            data: response.data.data,
          });
        } else {
          resolve({status: 'SOMETHING_WRONG', message: 'Something went wrong'});
        }
      })
      .catch(error => {
        // console.log(error.response.data);
        resolve({
          status: 'CAN_NOT_REFRESH',
          message: 'Failed to refresh token',
        });
      });
  });
};

export {RefreshTokenAPI};
