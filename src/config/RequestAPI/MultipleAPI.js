import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {ApiGatewayBaseUrl} from '../Environment.cfg';

const GetAllCategory = (type, tokenForCategory) => {
  return axios.get(`${ApiGatewayBaseUrl}/categories?type=${type}`, {
    headers: {
      Authorization: `Bearer ${tokenForCategory}`,
      Tenant: `https://${
        jwtDecode(tokenForCategory).data.tenantSubdomain
      }.ideaboxapp.com`,
    },
  });
};

const GetUserById = (userId, tokenForUser) => {
  return axios.get(`${ApiGatewayBaseUrl}/users/profile/${userId}`, {
    headers: {
      Authorization: `Bearer ${tokenForUser}`,
      Tenant: `https://${
        jwtDecode(tokenForUser).data.tenantSubdomain
      }.ideaboxapp.com`,
      Origin: `https://${
        jwtDecode(tokenForUser).data.tenantSubdomain
      }.ideaboxapp.com`,
    },
  });
};

const GetAllUsers = tokenForAllUser => {
  return axios.get(`${ApiGatewayBaseUrl}/users`, {
    headers: {
      Authorization: `Bearer ${tokenForAllUser}`,
      Tenant: `https://${
        jwtDecode(tokenForAllUser).data.tenantSubdomain
      }.ideaboxapp.com`,
      Origin: `https://${
        jwtDecode(tokenForAllUser).data.tenantSubdomain
      }.ideaboxapp.com`,
    },
  });
};

const GetNecessaryCreateIdeaAPI = (token, type = 'idea', userId) => {
  return new Promise(resolve => {
    axios
      .all([
        GetAllCategory(type, token),
        GetUserById(userId, token),
        GetAllUsers(token),
      ])
      .then(
        axios.spread((...responses) => {
          resolve({
            status: 'SUCCESS',
            data: {
              categoryData: responses[0]?.data.data,
              userData: responses[1]?.data.data[0],
              allUserData: responses[2]?.data.data,
            },
            message: 'Success',
          });
        }),
      )
      .catch(error => {
        resolve({
          status: 'SERVER_ERROR',
          message: 'Failed to contact server',
        });
      });
  });
};

const EditProfileDataAPI = (token, userId, newProfileData) => {
  return axios.put(
    `${ApiGatewayBaseUrl}/users/profile/${userId}`,
    {
      name: newProfileData.name,
      email: newProfileData.email,
      nik: newProfileData.nik,
      noTelp: newProfileData.noTelp,
      tglLahir: newProfileData.tglLahir,
      perkerjaan: newProfileData.pekerjaan,
      perusahaan: 'Telkom',
      teamStructure: newProfileData.teamStructure,
      unitId: 2,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Tenant: `https://${
          jwtDecode(token).data.tenantSubdomain
        }.ideaboxapp.app`,
        Origin: `https://${
          jwtDecode(token).data.tenantSubdomain
        }.ideaboxapp.app`,
      },
    },
  );
};

const EditProfilePictureAPI = (token, imageData) => {
  var formData = new FormData();
  var img = {
    uri: imageData.uri,
    name: imageData.name,
    type: imageData.mime,
  };
  formData.append('picture', img);
  return axios.post(`${ApiGatewayBaseUrl}/users/picture`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Tenant: `https://${jwtDecode(token).data.tenantSubdomain}.ideaboxapp.app`,
    },
  });
};

const EditProfileWithPictureAPI = (
  token,
  userId,
  newProfileData,
  imageData,
) => {
  return new Promise(resolve => {
    axios
      .all([
        EditProfileDataAPI(token, userId, newProfileData),
        EditProfilePictureAPI(token, imageData),
      ])
      .then(
        axios.spread((...responses) => {
          resolve({
            status: 'SUCCESS',
            message: 'Success',
          });
        }),
      )
      .catch(error => {
        resolve({
          status: 'SERVER_ERROR',
          message: 'Failed to contact server',
        });
      });
  });
};

export {GetNecessaryCreateIdeaAPI, EditProfileWithPictureAPI};
