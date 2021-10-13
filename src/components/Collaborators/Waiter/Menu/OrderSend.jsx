import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { create } from '../../../../services/crud';

import Alert from '../../../Alert';

const OrderSend = ({ name, items, setState }) => {
  const [alert, setAlert] = useState({
    status: false,
    message: '',
  });

  const sumPrice = (arrItems) => {
    if (arrItems.length > 0) {
      return arrItems.reduce((acc, cur) => acc + parseInt(cur.product.price * cur.qty, 10), 0);
    }
    return 0;
  };

  const getProductsId = () => items.map((item) => ({
    qty: item.qty,
    productId: item.product._id,
  }
  ));

  const sendCreateOrder = async (data) => {
    try {
      await create(data, '/orders');
      setState((prev) => ({
        ...prev, items: [], name: '', show: false,
      }));
      setAlert({ status: false, message: '' });
    } catch (err) {
      setAlert({ status: true, message: err.message });
    }
  };

  const handleSendOrder = (e) => {
    e.preventDefault();
    const order = JSON.stringify({
      _id: '3',
      userId: '1',
      client: name,
      products: getProductsId(),
      status: 'pending',
    });
    sendCreateOrder(order);
  };

  return (
    <div>
      <div className="flex-between">
        <p>Total</p>
        <p>{`$ ${sumPrice(items)}`}</p>
      </div>
      <button type="button" onClick={handleSendOrder}>Send kitchen</button>
      {
        alert.status ? <Alert message={alert.message} /> : <></>
      }
    </div>
  );
};

OrderSend.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
};

export default OrderSend;
