import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {ApiGatewayBaseUrl} from '../Environment.cfg';

const GetAllCategoriesAPI = (token, type = 'idea') => {
  return new Promise(resolve => {
    axios
      .get(`${ApiGatewayBaseUrl}/categories?type=${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Tenant: `https://${
            jwtDecode(token).data.tenantSubdomain
          }.ideaboxapp.com`,
        },
      })
      .then(response => {
        // console.log(response.data.data);
        if (response.data.status === 200) {
          resolve({
            status: 'SUCCESS',
            data: response.data.data,
            message: 'Success',
          });
        } else {
          resolve({status: 'SOMETHING_WRONG', message: 'Something went wrong'});
        }
      })
      .catch(error => {
        // console.log(error.response?.data?.message);
        if (error.response?.status === 404) {
          resolve({
            status: 'NOT_FOUND',
            message: error.response.data?.message,
          });
        } else if (error.response?.status === 400) {
          resolve({
            status: 'UNDEFINED_HEADER',
            message: error.response.data?.message,
          });
        } else if (error.response?.status === 401) {
          resolve({
            status: 'UNAUTHORIZED',
            message: error.response.data?.message,
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

export {GetAllCategoriesAPI};
