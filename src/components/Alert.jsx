import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ message }) => (
  <div className="alert flex-between margin-1-0">
    <span />
    <p className="margin-05 padding-0-05">{message}</p>
  </div>
);

Alert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Alert;
