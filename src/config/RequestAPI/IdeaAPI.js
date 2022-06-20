import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { ApiGatewayBaseUrl } from '../Environment.cfg';

const GetIdeasAPI = token => {
  return new Promise(resolve => {
    // axios({
    //   crossDomain: true,
    //   method: 'get',
    //   url: `${ApiGatewayBaseUrl}/ideas?offset=0&limit=10`,
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     Tenant: 'htpps://digitalamoeba.ideabox.app',
    //   },
    // })
    axios
      .get(`${ApiGatewayBaseUrl}/ideas`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Tenant: `https://${jwtDecode(token).data.tenantSubdomain
            }.ideaboxapp.app`,
        },
        params: {
          offset: 0,
          limit: 10,
        },
      })
      .then(response => {
        console.log(response.data);
        if (response.data.status === 200) {
          console.log('ok');
          resolve({
            status: 'SUCCESS',
            message: 'Successfully fetching idea list',
            data: response.data.data,
          });
          console.log('ok2');
        } else {
          resolve({ status: 'SOMETHING_WRONG', message: 'Something went wrong' });
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
          Tenant: `https://${jwtDecode(token).data.tenantSubdomain
            }.ideaboxapp.app`,
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
          resolve({ status: 'SOMETHING_WRONG', message: 'Something went wrong' });
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

const CreateIdeaAPI = (token, ideaDataToSubmit) => {
  return new Promise(resolve => {
    var formData = new FormData();
    var img = {
      uri: ideaDataToSubmit.ideaDescription?.cover?.uri,
      name: ideaDataToSubmit.ideaDescription?.cover?.name,
      type: ideaDataToSubmit.ideaDescription?.cover?.mime,
    };
    formData.append('title', ideaDataToSubmit.ideaDescription.title);
    formData.append(
      'description',
      ideaDataToSubmit.ideaDescription.description,
    );
    formData.append('category', ideaDataToSubmit.ideaDescription.category);
    formData.append('cover', img);
    formData.append('allowJoin', ideaDataToSubmit.ideaDescription.allowToJoin);
    formData.append('why', ideaDataToSubmit.storyBehind.why);
    formData.append('what', ideaDataToSubmit.storyBehind.what);
    formData.append('how', ideaDataToSubmit.storyBehind.how);
    formData.append(
      'uniqueValues',
      JSON.stringify(ideaDataToSubmit.leanCanvas.uniqueValue),
    );
    formData.append(
      'customers',
      JSON.stringify(ideaDataToSubmit.leanCanvas.customer),
    );
    formData.append(
      'problems',
      JSON.stringify(ideaDataToSubmit.leanCanvas.problem),
    );
    formData.append(
      'earlyAdopters',
      JSON.stringify(ideaDataToSubmit.leanCanvas.earlyAdopter),
    );
    formData.append(
      'existingSolutions',
      JSON.stringify(ideaDataToSubmit.leanCanvas.existingSolution),
    );
    formData.append(
      'proposedSolutions',
      JSON.stringify(ideaDataToSubmit.leanCanvas.proposedSolution),
    );
    formData.append(
      'inviteUsers',
      JSON.stringify(ideaDataToSubmit.inviteUsers),
    );
    formData.append(
      'additionalFileLinkAttachment',
      JSON.stringify(ideaDataToSubmit.additionalFileLinkAttachment),
    );
    axios
      .post(`${ApiGatewayBaseUrl}/ideas`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Tenant: `https://${jwtDecode(token).data.tenantSubdomain
            }.ideaboxapp.app`,
        },
      })
      .then(response => {
        // console.log(response.data.data);
        if (response.data.status === 200) {
          resolve({
            status: 'SUCCESS',
            message: response.data.status.message,
          });
        } else {
          resolve({ status: 'SOMETHING_WRONG', message: 'Something went wrong' });
        }
      })
      .catch(error => {
        // console.log(error.response?.data);
        if (error.response?.status === 401) {
          resolve({
            status: 'UNAUTHORIZED',
            message: error.response.data?.message,
          });
        } else if (error.response?.status === 422) {
          resolve({
            status: 'VALIDATION_ERROR',
            message: error.response.data?.message,
          });
        } else if (error.response?.status === 500) {
          resolve({
            status: 'BACKEND_ERROR',
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

const EditIdeaAPI = (token, ideaId, ideaDataToSubmit) => {
  return new Promise(resolve => {
    var formData = new FormData();
    var img = {
      uri: ideaDataToSubmit.ideaDescription?.cover?.uri,
      name: ideaDataToSubmit.ideaDescription?.cover?.name,
      type: ideaDataToSubmit.ideaDescription?.cover?.mime,
    };
    formData.append('title', ideaDataToSubmit.ideaDescription.title);
    formData.append(
      'description',
      ideaDataToSubmit.ideaDescription.description,
    );
    formData.append('category', ideaDataToSubmit.ideaDescription.category);
    formData.append('cover', img);
    formData.append('allowJoin', ideaDataToSubmit.ideaDescription.allowToJoin);
    formData.append('why', ideaDataToSubmit.storyBehind.why);
    formData.append('what', ideaDataToSubmit.storyBehind.what);
    formData.append('how', ideaDataToSubmit.storyBehind.how);
    formData.append(
      'uniqueValues',
      JSON.stringify(ideaDataToSubmit.leanCanvas.uniqueValue),
    );
    formData.append(
      'customers',
      JSON.stringify(ideaDataToSubmit.leanCanvas.customer),
    );
    formData.append(
      'problems',
      JSON.stringify(ideaDataToSubmit.leanCanvas.problem),
    );
    formData.append(
      'earlyAdopters',
      JSON.stringify(ideaDataToSubmit.leanCanvas.earlyAdopter),
    );
    formData.append(
      'existingSolutions',
      JSON.stringify(ideaDataToSubmit.leanCanvas.existingSolution),
    );
    formData.append(
      'proposedSolutions',
      JSON.stringify(ideaDataToSubmit.leanCanvas.proposedSolution),
    );
    formData.append(
      'inviteUsers',
      JSON.stringify(ideaDataToSubmit.inviteUsers),
    );
    formData.append(
      'additionalFileLinkAttachment',
      JSON.stringify(ideaDataToSubmit.additionalFileLinkAttachment),
    );
    formData.append('_method', 'PUT');
    axios
      .post(`${ApiGatewayBaseUrl}/ideas/${ideaId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Tenant: `https://${jwtDecode(token).data.tenantSubdomain
            }.ideaboxapp.app`,
        },
      })
      .then(response => {
        // console.log(response.data.data);
        if (response.data.status === 200) {
          resolve({
            status: 'SUCCESS',
            message: response.data.status.message,
          });
        } else {
          resolve({ status: 'SOMETHING_WRONG', message: 'Something went wrong' });
        }
      })
      .catch(error => {
        // console.log(error.response?.data);
        if (error.response?.status === 401) {
          resolve({
            status: 'UNAUTHORIZED',
            message: error.response.data?.message,
          });
        } else if (error.response?.status === 422) {
          resolve({
            status: 'VALIDATION_ERROR',
            message: error.response.data?.message,
          });
        } else if (error.response?.status === 500) {
          resolve({
            status: 'BACKEND_ERROR',
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

const DeleteIdeasAPI = (token, ideaId) => {
  return new Promise(resolve => {
    axios
      .delete(`${ApiGatewayBaseUrl}/ideas`, {
        data: { id: ideaId },
        headers: {
          Authorization: `Bearer ${token}`,
          Tenant: `https://${jwtDecode(token).data.tenantSubdomain
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
          resolve({ status: 'SOMETHING_WRONG', message: 'Something went wrong' });
        }
      })
      .catch(error => {
        // console.log(error.response?.data?.message);
        if (error.response?.status === 500) {
          resolve({
            status: 'ERROR',
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

export {
  GetIdeasAPI,
  GetDetailIdeaAPI,
  CreateIdeaAPI,
  EditIdeaAPI,
  DeleteIdeasAPI,
};
