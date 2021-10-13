import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './components/Header';

const PrivateRoute = ({ children, ...rest }) => {
  const token = localStorage.getItem('token');
  return (
    <>
      <Header />
      <Route
        {...rest}
        render={({ location }) => (token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        ))}
      />
    </>
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
