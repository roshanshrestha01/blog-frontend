import React from 'react';
import PropTypes from 'prop-types';
import {NotificationManager} from 'react-notifications';
import request from 'utils/request';
import config from '../../config';


class PostLike extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const {postSlug} = this.props;
    const requestURL = `${config.baseURL}/posts/${postSlug}/likes/`;
    const user = localStorage.getItem('user');
    const parseUser = JSON.parse(user);
    const {auth_token} = parseUser;
    const METHOD = 'POST';
    request(requestURL, {
      method: METHOD,
      headers: {
        Accept: 'application/json',
        Authorization: `Token ${auth_token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        let {hasLiked} = this.props
        hasLiked = !hasLiked
      })
      .catch((err) => {
        let error;
        try {
          error = err.response.json();
        } catch (er) {
          error = {errors: [{detail: `${er.name}: ${er.message}`}]};
        }
        NotificationManager.error(error.message);
      });
  };

  render() {
    const {
      isLoggedIn, likeCount, hasLiked
    } = this.props;
    return (
      <div>
        <p>{likeCount} Like</p>
        {isLoggedIn && (
          <div className="input-field mt-4">
            <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">{hasLiked ? 'Unlike' : 'like'}</button>
          </div>
        )
        }
      </div>
    );
  }
}

PostLike.propTypes = {
  postSlug: PropTypes.string,
  likeCount: PropTypes.any,
  hasLiked: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
};


export default PostLike;
