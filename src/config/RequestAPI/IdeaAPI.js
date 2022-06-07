import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {ApiGatewayBaseUrl} from '../Environment.cfg';

const GetIdeasAPI = token => {
  return new Promise(resolve => {
    axios
      .get(`${ApiGatewayBaseUrl}/ideas`, {
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
            message: 'Successfully fetching idea list',
            data: response.data.data,
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
            message: error.response.data?.messages,
          });
        } else if (error.response?.status === 400) {
          resolve({
            status: 'UNDEFINED_HEADER',
            message: error.response.data?.messages,
          });
        } else if (error.response?.status === 401) {
          resolve({
            status: 'UNAUTHORIZED',
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

const GetDetailIdeaAPI = (token, ideaId) => {
  return new Promise(resolve => {
    axios
      .get(`${ApiGatewayBaseUrl}/ideas/${ideaId}`, {
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
            message: 'Successfully fetching idea list',
            data: response.data.data,
          });
        } else {
          resolve({status: 'SOMETHING_WRONG', message: 'Something went wrong'});
        }
      })
      .catch(error => {
        // console.log(error.response?.data?.message);
        resolve({
          status: 'SERVER_ERROR',
          message: 'Failed to contact server',
        });
      });
  });
};

export {GetIdeasAPI, GetDetailIdeaAPI};
