import React, { Component } from 'react';
import LoadingIndicator from '../../../components/LoadingIndicator';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    password_confirmation: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const { onSubmitForm, loading } = this.props;
    const button = loading ? <LoadingIndicator /> : <button className="btn btn-primary">Sign Up</button>;
    return (
      <div className="container">
        <form className="white" onSubmit={(e) => onSubmitForm(e, this.state)}>
          <h2 className="text-center grey-text text-darken-3">Sign Up</h2>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              id="email"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              id="password"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="password_confirmation">Retype Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password Confirmation"
              id="password_confirmation"
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="input-field mt-3">
            {button}
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
