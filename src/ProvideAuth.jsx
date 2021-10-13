import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

import useProvideAuth from './hooks/useProvideAuth';

const authContext = createContext();
const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);

ProvideAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProvideAuth;
