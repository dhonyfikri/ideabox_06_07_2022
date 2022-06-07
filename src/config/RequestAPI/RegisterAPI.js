import axios from 'axios';
import {ApiGatewayBaseUrl} from '../Environment.cfg';

const RegisterAPI = (
  name,
  phone,
  email,
  password,
  confirmPassword,
  profession,
) => {
  return new Promise(resolve => {
    axios({
      crossDomain: true,
      method: 'post',
      url: `${ApiGatewayBaseUrl}/auth/register`,
      data: {
        name: name,
        noTelp: phone,
        email: email,
        password: password,
        passwordConfirm: confirmPassword,
        pekerjaan: profession,
      },
    })
      .then(response => {
        if (response.data.status === 200) {
          if (
            response.data.messages.toLowerCase() ===
            'email should not be gmail or yahoo'
          ) {
            resolve({
              status: 'INVALID_DOMAIN',
              message: response.data.messages,
            });
          } else {
            resolve({
              status: 'SUCCESS',
              message: 'Please check email for verification',
            });
          }
        } else {
          resolve({status: 'SOMETHING_WRONG', message: 'Something went wrong'});
        }
      })
      .catch(error => {
        // console.log(error.response.data);
        if (error.response?.status === 422) {
          resolve({
            status: 'FIELD_ERROR',
            message:
              error.response.data?.data?.email +
              error.response.data?.data?.passwordConfirm,
          });
        } else {
          resolve({
            status: 'SERVER_ERROR',
            message: 'Failed to contact server',
          });
        }
      });
  });
};

export {RegisterAPI};
