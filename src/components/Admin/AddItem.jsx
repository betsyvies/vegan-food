import React from 'react';
import PropTypes from 'prop-types';

const AddItem = ({ setState, comp }) => {
  const handleOpenModal = () => setState((prevState) => ({ ...prevState, show: true, btnVal: 'edit' }));

  return (
    <div className="flex-between">
      <h3>{`${comp === 'user' ? 'Users' : 'Products'} List`}</h3>
      <div className="padding-0-15">
        <button type="button" onClick={handleOpenModal}>Add Item</button>
      </div>
    </div>
  );
};

AddItem.propTypes = {
  setState: PropTypes.func.isRequired,
  comp: PropTypes.string.isRequired,
};

export default AddItem;
