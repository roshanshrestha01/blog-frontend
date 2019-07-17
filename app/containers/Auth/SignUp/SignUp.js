import React, { Component } from 'react';
import LoadingIndicator from '../../../components/LoadingIndicator';

class SignUp extends Component {
  state = {
    email: '',
    password1: '',
    password2: '',
    full_name: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const { onSubmitForm, loading } = this.props;
    const button = loading ? <LoadingIndicator /> : <button className="btn pink lighten-1 z-depth-0">Sign Up</button>;
    return (
      <div className="container">
        <form className="white" onSubmit={(e) => onSubmitForm(e, this.state)}>
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={this.handleChange} required/>
          </div>
          <div className="input-field">
            <label htmlFor="full_name">Full Name</label>
            <input type="text" id='full_name' onChange={this.handleChange} required/>
          </div>
          <div className="input-field">
            <label htmlFor="password1">Password</label>
            <input type="password" id='password1' onChange={this.handleChange} required/>
          </div>
          <div className="input-field">
            <label htmlFor="password2">Retype Password</label>
            <input type="password" id='password2' onChange={this.handleChange} required/>
          </div>

          <div className="input-field">
            {button}
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
