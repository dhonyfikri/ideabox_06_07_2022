import axios from 'axios';

const GetDataSkill = () => {
  return axios
    .get('https://dev-users.digitalamoeba.id/trackrecord/getskillset')
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export default GetDataSkill;
