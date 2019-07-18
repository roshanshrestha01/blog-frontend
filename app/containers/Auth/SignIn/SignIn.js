import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoadingIndicator from '../../../components/LoadingIndicator';

export default class SignIn extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const { onSubmitForm, loading } = this.props;
    const button = loading ? <LoadingIndicator /> : <button type="submit" className="btn btn-primary">Sign In</button>;
    return (
      <div className="container">
        <form className="white" onSubmit={(e) => onSubmitForm(e, this.state)}>
          <h2 className="text-center grey-text text-darken-3">Sign In</h2>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field">
            {button}
          </div>
        </form>
        <p>
        Don't have account? <Link to="/auth/sign-up/">Sign up</Link>
        </p>
      </div>
    );
  }
}

SignIn.propTypes = {
  loading: PropTypes.bool,
  onSubmitForm: PropTypes.func,
};
