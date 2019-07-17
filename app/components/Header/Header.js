import React from 'react';
import {Link} from 'react-router-dom';
import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header">
        <div className="nav-bar">
          <Link className="router-link" to="/">
            Home
          </Link>
          <Link className="router-link" to="/features">
            Features
          </Link>
          <Link className="router-link" to="/auth/sign-up">
            Sign Up
          </Link>
          <Link className="router-link" to="/auth/sign-in">
            Sign In
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
