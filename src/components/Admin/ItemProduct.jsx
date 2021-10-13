import React from 'react';
import PropTypes from 'prop-types';

const ItemProduct = ({ elem }) => (
  <>
    <div className="container-text">
      <p>{elem.name}</p>
    </div>
    <div className="container-text">
      <p>{`$${elem.price}`}</p>
    </div>
    <div className="container-text">
      <p>{elem.type}</p>
    </div>
  </>
);

ItemProduct.propTypes = {
  elem: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    dateEntry: PropTypes.string.isRequired,
  }).isRequired,
};

export default ItemProduct;
