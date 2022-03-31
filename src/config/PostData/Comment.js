import axios from 'axios';
import {IdeaServiceBaseUrl} from '../Environment.cfg';

const CommentIdea = (ideaId, comment, commentId, createdBy) => {
  return axios({
    crossDomain: true,
    method: 'post',
    url: `${IdeaServiceBaseUrl}/addcomment`,
    data: {
      ideaId: ideaId,
      comment: comment,
      commentId: commentId,
      createdBy: createdBy,
    },
    validateStatus: false,
  })
    .then((response, status) => {
      // console.log(response.data.status);
      if (response.data.status === 200) {
        return response.data.status;
      } else {
        console.log('gagal');
      }
    })
    .catch(function (error) {
      console.log(error);
      // need handling error
    });
};

export default CommentIdea;
