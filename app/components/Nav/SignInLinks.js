import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { successSignOut } from '../../containers/Auth/actions';

const SignInLinks = (props) => {
  const { signOut } = props;
  return (
    <div className="d-inline-block">
      <Link className="router-link" to="/post/create">
        New Post
      </Link>
      <a className="router-link" onClick={signOut}>
        Logout
      </a>
    </div>
  );
};

SignInLinks.propTypes = {
  signOut: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => {
    dispatch(successSignOut());
  },
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(SignInLinks);
