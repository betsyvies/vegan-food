import React from 'react';
import PropTypes from 'prop-types';

const ItemUser = ({ elem }) => (
  <>
    <div className="container-text">
      <p>{elem.email}</p>
    </div>
    <div className="container-text">
      <p>{elem.roles.admin === true ? 'admin' : 'user'}</p>
    </div>
  </>
);

ItemUser.propTypes = {
  elem: PropTypes.shape({
    email: PropTypes.string.isRequired,
    roles: PropTypes.shape({
      admin: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ItemUser;
