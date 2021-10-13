import React, { useEffect, useState } from 'react';

import { getAll } from '../../../services/crud';

import OrderHeader from './OrderHeader';
import OrderProducts from './OrderProducts';
import Loader from '../../Loader';

const OrderListChef = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setloading] = useState(true);

  const getAllOrders = async () => {
    try {
      const resp = await getAll('/orders?page=1&limit=50');
      const orderPending = resp.filter((elem) => elem.status === 'pending');
      setOrders(orderPending);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    let mounted = true;
    getAllOrders().then(() => {
      if (mounted) {
        setloading(false);
      }
    });

    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <main>
      <div className="row">
        {
          !loading ? orders.map((elem) => (
            <div className="div-order-list background-white" key={elem._id}>
              <OrderHeader elem={elem} id={elem._id} orders={orders} setOrders={setOrders} />
              <div>
                <p>Total Products:</p>
                <OrderProducts items={elem.products} />
              </div>
            </div>
          ))
            : (
              <Loader />
            )
        }
      </div>
    </main>
  );
};

export default OrderListChef;
