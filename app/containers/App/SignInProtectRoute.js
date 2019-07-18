import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

const SignInProtectRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const user = localStorage.getItem('user');
      const component = user ? <Component {...props} /> : <Redirect
        to={{
          pathname: '/auth/sign-in',
          state: { from: props.location },
        }}
      />;
      return (
        component
      );
    }}
  />
);

export default SignInProtectRoute;
