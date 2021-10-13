import React from 'react';
import PropTypes from 'prop-types';

const OrderProducts = ({ items }) => (items.map((item) => (
  <div className="flex" key={item.product._id}>
    <p className="padding-05">{item.qty}</p>
    <p className="padding-05">{item.product.name}</p>
  </div>
)));

OrderProducts.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OrderProducts;
