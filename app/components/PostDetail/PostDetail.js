import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import request from 'utils/request';
import config from '../../config';
import LoadingIndicator from '../LoadingIndicator';


class PostDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    const { match: { params: { slug } }, isLoggedIn } = this.props;
    console.log(isLoggedIn);
    const requestURL = `${config.baseURL}/posts/${slug}/`;
    await request(requestURL)
      .then((data) => {
        this.setState(data);
      })
      .catch((e) => console.log(e));
  }

  checkAndRender() {
    return Object.keys(this.state).length > 0 ? this.renderEventDetail() : <LoadingIndicator />;
  }

  renderEventDetail() {
    const {
      title,
      link,
      source,
      messages
    } = this.state;
    return (
      <div>
        <div>
          <h1>{title}</h1>
          <p className="post-sub-info">{source}</p>
          <p className="flow-text">{link}</p>
        </div>
        {messages}
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
