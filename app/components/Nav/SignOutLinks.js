import React from 'react';
import { Link } from 'react-router-dom';


const SignOutLinks = () => {
  return (
    <div className="d-inline-block">
      <Link className="router-link" to="/auth/sign-up">
        Sign Up
      </Link>
      <Link className="router-link" to="/auth/sign-in">
        Sign In
      </Link>
    </div>
  );
};

export default SignOutLinks;
