/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { modifyById, deleteById } from '../../../services/crud';
import styles from './option.module.css';

const OrderHeader = ({
  elem, id, orders, setOrders,
}) => {
  const changeOrder = async (val) => {
    const data = { ...elem };
    data.status = val;
    data.dateProcessed = new Date();
    const body = JSON.stringify(data);
    try {
      const resp = val === 'delivered' ? await modifyById(body, `/orders/${data._id}`) : await deleteById(`/orders/${data._id}`);
      const arrOrdersNotChange = orders.filter((obj) => obj._id !== resp._id);
      setOrders([...arrOrdersNotChange]);
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleChange = (e) => {
    const val = e.target.value;
    if (val === 'canceled' || val === 'delivered') {
      changeOrder(val);
    }
  };

  return (
    <div className={styles.between}>
      <label className="bold-1rem">{elem.client}</label>
      <select
        name={`${id}`}
        defaultValue={elem.status}
        type="rol"
        className="padding-05"
        onChange={handleChange}
      >
        <option value={`${elem.status}`}>{elem.status}</option>
        <option value="canceled">canceled</option>
        <option value="delivered">delivered</option>
      </select>
    </div>
  );
};

OrderHeader.propTypes = {
  id: PropTypes.string.isRequired,
  elem: PropTypes.shape({
    client: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  setOrders: PropTypes.func.isRequired,
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OrderHeader;
