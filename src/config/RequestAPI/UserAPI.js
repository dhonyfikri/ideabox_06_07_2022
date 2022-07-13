import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {ApiGatewayBaseUrl} from '../Environment.cfg';

const GetUserById = (userToken, userId) => {
  return new Promise(resolve => {
    axios
      .get(
        `${ApiGatewayBaseUrl}/users/profile/${userId}`,
        {
          id: jwtDecode(userToken?.authToken).data.id,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken.authToken}`,
            Tenant: `https://${
              jwtDecode(userToken?.authToken).data.tenantSubdomain
            }.ideaboxapp.app`,
          },
        },
      )
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

const GetUserByEmail = (userToken, userEmail) => {
  return new Promise(resolve => {
    axios
      .get(`${ApiGatewayBaseUrl}/talent?email=${userEmail}`, {
        headers: {
          Authorization: `Bearer ${userToken.authToken}`,
          Tenant: `https://${
            jwtDecode(userToken?.authToken).data.tenantSubdomain
          }.ideaboxapp.app`,
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

const EditBackgroundAPI = (token, imageData) => {
  return new Promise(resolve => {
    var formData = new FormData();
    var img = {
      uri: imageData.uri,
      name: imageData.name,
      type: imageData.mime,
    };
    formData.append('background', img);
    axios
      .post(`${ApiGatewayBaseUrl}/users/background`, formData, {
        headers: {
          Authorization: `Bearer ${token.authToken}`,
          Tenant: `https://${
            jwtDecode(token.authToken).data.tenantSubdomain
          }.ideaboxapp.app`,
        },
      })
      .then(response => {
        // console.log(response.data.data);
        if (response.data.status === 200) {
          resolve({
            status: 'SUCCESS',
            message: response.data.message,
          });
        } else {
          resolve({status: 'SOMETHING_WRONG', message: 'Something went wrong'});
        }
      })
      .catch(error => {
        // console.log(error.response?.data);
        resolve({
          status: 'SERVER_ERROR',
          message: 'Failed to contact server',
        });
      });
  });
};

const EditProfileDataAPI = (userToken, userId, newProfileData) => {
  return new Promise(resolve => {
    axios
      .put(
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
            Authorization: `Bearer ${userToken.authToken}`,
            Tenant: `https://${
              jwtDecode(userToken.authToken).data.tenantSubdomain
            }.ideaboxapp.app`,
            Origin: `https://${
              jwtDecode(userToken.authToken).data.tenantSubdomain
            }.ideaboxapp.app`,
          },
        },
      )
      .then(response => {
        // console.log(response.data.data);
        if (response.data.status === 200) {
          resolve({
            status: 'SUCCESS',
            message: response.data.messages,
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
            }.ideaboxapp.app`,
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

const GetSkillSetAPI = userToken => {
  return new Promise(resolve => {
    axios
      .get(`${ApiGatewayBaseUrl}/skillset`, {
        headers: {
          Authorization: `Bearer ${userToken.authToken}`,
          Tenant: `https://${
            jwtDecode(userToken.authToken).data.tenantSubdomain
          }.ideaboxapp.app`,
        },
      })
      .then(response => {
        // console.log(response.data.data);
        if (response.data.status === 200) {
          resolve({
            status: 'SUCCESS',
            message: response.data.messages,
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

const GetMySkillSetAPI = userToken => {
  return new Promise(resolve => {
    axios
      .get(`${ApiGatewayBaseUrl}/users/skillset`, {
        headers: {
          Authorization: `Bearer ${userToken.authToken}`,
          Tenant: `https://${
            jwtDecode(userToken.authToken).data.tenantSubdomain
          }.ideaboxapp.app`,
        },
      })
      .then(response => {
        // console.log(response.data.data);
        if (response.data.status === 200) {
          resolve({
            status: 'SUCCESS',
            message: response.data.messages,
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

const AddMySkillSetAPI = (userToken, listId) => {
  return new Promise(resolve => {
    axios
      .post(
        `${ApiGatewayBaseUrl}/users/skillset`,
        {skillsets: listId},
        {
          headers: {
            Authorization: `Bearer ${userToken.authToken}`,
            Tenant: `https://${
              jwtDecode(userToken.authToken).data.tenantSubdomain
            }.ideaboxapp.app`,
          },
        },
      )
      .then(response => {
        // console.log(response.data.data);
        if (response.data.status === 200) {
          resolve({
            status: 'SUCCESS',
            message: response.data.messages,
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

const EditMySkillSetAPI = (userToken, listId) => {
  return new Promise(resolve => {
    axios
      .put(
        `${ApiGatewayBaseUrl}/users/skillset`,
        {skillsets: listId},
        {
          headers: {
            Authorization: `Bearer ${userToken.authToken}`,
            Tenant: `https://${
              jwtDecode(userToken.authToken).data.tenantSubdomain
            }.ideaboxapp.app`,
          },
        },
      )
      .then(response => {
        // console.log(response.data.data);
        if (response.data.status === 200) {
          resolve({
            status: 'SUCCESS',
            message: response.data.messages,
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

export {
  GetUserById,
  GetUserByEmail,
  EditAboutAPI,
  GetSkillSetAPI,
  GetMySkillSetAPI,
  AddMySkillSetAPI,
  EditMySkillSetAPI,
  EditBackgroundAPI,
  EditProfileDataAPI,
};
