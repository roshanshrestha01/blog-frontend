import React from 'react';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import request from 'utils/request';
import config from '../../../config';


class Comment extends React.Component {
  // TODO show user who have given comments
  constructor() {
    super();
    this.state = {};
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { postSlug } = this.props;
    const requestURL = `${config.baseURL}/posts/${postSlug}/comments/`;
    const user = localStorage.getItem('user');
    const parseUser = JSON.parse(user);
    const { auth_token } = parseUser;
    const payload = Object.assign({}, this.state);
    const METHOD = 'POST';
    request(requestURL, {
      method: METHOD,
      headers: {
        Accept: 'application/json',
        Authorization: `Token ${auth_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(() => {
        const { comments } = this.props;
        const { message } = this.state;
        comments.push({ id: this.uniqueKey(), message });
        this.setState({ message: '' });
      })
      .catch((err) => {
        let error;
        try {
          error = err.response.json();
        } catch (er) {
          error = { errors: [{ detail: `${er.name}: ${er.message}` }] };
        }
        NotificationManager.error(error.message);
      });
  };

  uniqueKey() {
    return `_${Math.random().toString(36).substr(2, 9)}`;
  }

  renderComments() {
    const { comments } = this.props;
    return comments.map((value) => <p key={value.id}>{value.message}</p>);
  }

  render() {
    const {
      isLoggedIn,
    } = this.props;
    const {
      message
    } = this.state;
    return (
      <div>
        <h3>Comments</h3>
        <hr />
        {this.renderComments()}
        {isLoggedIn
        && (
          <form className="white" onSubmit={this.handleSubmit}>
            <div className="input-field">
              <label htmlFor="message" className="active">Message*</label>
              <textarea
                type="textarea"
                className="form-control"
                placeholder="Message"
                id="message"
                value={message}
                onChange={this.handleChange}
                required
              >
              </textarea>
            </div>
            <div className="input-field mt-4">
              <button type="submit" className="btn btn-primary">Comment</button>
            </div>
          </form>
        )
        }
      </div>
    );
  }
}

Comment.propTypes = {
  postSlug: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  comments: PropTypes.array
};


export default Comment;
