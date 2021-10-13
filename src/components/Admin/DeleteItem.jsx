import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { deleteById } from '../../services/crud';

const DeleteItem = ({
  setState, items, infoItem, comp, handleClickClose,
}) => {
  const [error, setError] = useState('');

  const deleteItem = async (route) => {
    try {
      const resp = await deleteById(route);
      const arrItemsNotChange = items.filter((elem) => elem._id !== resp._id);
      setState((prevState) => ({ ...prevState, show: false, items: [...arrItemsNotChange] }));
      handleClickClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = () => {
    if (comp === 'user') {
      return deleteItem(`/users/${infoItem._id}`);
    }
    return deleteItem(`/products/${infoItem._id}`);
  };
  return (
    <div>
      <p className="bold-1rem ">{`You are sure like to delete the ${comp}?`}</p>
      <button className="margin-1-0" type="button" onClick={handleClickClose}>Cancel</button>
      <button className="margin-1-0" type="button" onClick={handleDelete}>Continue</button>
      <p>{error}</p>
    </div>
  );
};

DeleteItem.propTypes = {
  setState: PropTypes.func.isRequired,
  infoItem: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  comp: PropTypes.string.isRequired,
  handleClickClose: PropTypes.func.isRequired,
};

export default DeleteItem;
