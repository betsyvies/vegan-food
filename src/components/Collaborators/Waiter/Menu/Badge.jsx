import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ setState, items }) => {
  const handleOpenModal = () => setState((prevState) => ({ ...prevState, show: true }));
  return (
    <span className="badge">
      <span className="badge__icon">
        <i className="">{items.length}</i>
      </span>
      <input
        type="image"
        alt="user-name"
        src="https://user-images.githubusercontent.com/30939075/93292829-152e1a80-f7ac-11ea-97cd-c431a052117c.png"
        onClick={handleOpenModal}
      />
    </span>
  );
};

Badge.propTypes = {
  setState: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Badge;
