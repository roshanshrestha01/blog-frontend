import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import request from 'utils/request';
import config from '../../config';
import LoadingIndicator from '../LoadingIndicator';
import Comment from './_partials/Comment';


class PostDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    const { match: { params: { slug } } } = this.props;
    const requestURL = `${config.baseURL}/posts/${slug}/`;
    await request(requestURL)
      .then((data) => {
        this.setState(data);
      })
      .catch((e) => console.log(e));
  }

  checkAndRender() {
    return Object.keys(this.state).length > 0 ? this.renderPostDetail() : <LoadingIndicator />;
  }

  renderPostDetail() {
    const { isLoggedIn } = this.props;
    const {
      title,
      link,
      source,
      slug,
      comment
    } = this.state;
    return (
      <div>
        <div>
          <h1>{title}</h1>
          <p className="post-sub-info">{source}</p>
          <p className="flow-text">{link}</p>
        </div>
        <Comment isLoggedIn={isLoggedIn} comments={comment} postSlug={slug} />
      </div>
    );
  }

  render() {
    return (
      <div className="event-detail">
        {this.checkAndRender()}
      </div>
    );
  }
}

PostDetail.propTypes = {
  isLoggedIn: PropTypes.bool,
  match: PropTypes.any
};


export default PostDetail;
