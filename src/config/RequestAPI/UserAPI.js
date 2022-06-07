import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {ApiGatewayBaseUrl} from '../Environment.cfg';

const GetUserById = (userToken, userId) => {
  return new Promise(resolve => {
    axios
      .get(`${ApiGatewayBaseUrl}/users/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${userToken.authToken}`,
          Tenant: `https://${
            jwtDecode(userToken.authToken).data.tenantSubdomain
          }.ideaboxapp.com`,
        },
      })
      .then(response => {
        // console.log(response.data.data);
        if (response.data.status === 200) {
          resolve({
            status: 'SUCCESS',
            message: 'You have successfully get user data',
            data: response.data.data,
          });
        } else {
          resolve({status: 'SOMETHING_WRONG', message: 'Something went wrong'});
        }
      })
      .catch(error => {
        // console.log(error.response?.data?.message);
        if (error.response?.status === 401) {
          resolve({
            status: 'FAILED',
            message: error.response.data?.messages,
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

const EditAboutAPI = (userToken, about) => {
  return new Promise(resolve => {
    axios
      .patch(
        `${ApiGatewayBaseUrl}/users/about`,
        {bio: about},
        {
          headers: {
            Authorization: `Bearer ${userToken.authToken}`,
            Tenant: `https://${
              jwtDecode(userToken.authToken).data.tenantSubdomain
            }.ideaboxapp.com`,
          },
        },
      )
      .then(response => {
        // console.log(response.data.data);
        if (response.data.status === 200) {
          resolve({
            status: 'SUCCESS',
            message: 'You have edited your about',
          });
        } else {
          resolve({status: 'SOMETHING_WRONG', message: 'Something went wrong'});
        }
      })
      .catch(error => {
        // console.log(error.response?.data?.message);
        if (error.response?.status === 400) {
          resolve({
            status: 'FAILED',
            message: error.response.data?.messages,
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

export {GetUserById, EditAboutAPI};
