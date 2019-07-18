import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

const SignOutProtectRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const user = localStorage.getItem('user');
      const component = user ? (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      ) : <Component {...props} />;
      return (
        component
      );
    }}
  />
);

export default SignOutProtectRoute;
