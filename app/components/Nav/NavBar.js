import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import SignInLinks from './SignInLinks';
import SignOutLinks from './SignOutLinks';
import { makeSelectUserLoggedIn } from '../../containers/Auth/selectors';
import { successSignIn } from '../../containers/Auth/actions';

const NavBar = (props) => {
  const { isLoggedIn } = props;
  const user = localStorage.getItem('user');
  if (user) {
    const { signIn } = props;
    signIn(JSON.parse(user));
  }
  const links = isLoggedIn ? <SignInLinks/> : <SignOutLinks/>;
  return (
    <div className="nav-bar">
      <Link className="router-link" to="/">
        Home
      </Link>
      {links}
    </div>
  );
};

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool,
  signIn: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectUserLoggedIn(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (cred) => {
      dispatch(successSignIn(cred));
    },
  };
};


const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(withConnect)(NavBar);
