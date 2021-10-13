/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import PropTypes from 'prop-types';
import OrderTable from './OrderTable';

const ModalOrder = ({
  setState, show, name, items,
}) => {
  const handleClickClose = () => {
    setState((prevState) => ({
      ...prevState,
      show: false,
    }));
  };

  return (show
    ? (
      <div className="modal">
        <div className="modal-content">
          <span role="button" className="close" onClick={handleClickClose}>&times;</span>
          <OrderTable
            show={show}
            name={name}
            items={items}
            setState={setState}
          />
        </div>
      </div>
    ) : null
  );
};

ModalOrder.propTypes = {
  setState: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ModalOrder;
