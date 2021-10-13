import React, { useEffect, useState } from 'react';
import { getAll, modifyById } from '../../../services/crud';
import { timeFrom } from '../../../utils';
import OrderProducts from '../Chef/OrderProducts';
import Loader from '../../Loader';

const OrderListWaiter = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setloading] = useState(true);

  const getAllOrders = async () => {
    try {
      const resp = await getAll('/orders?page=1&limit=50');
      setOrders(resp);
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
  const changeOrder = async (elem) => {
    const data = { ...elem };
    data.status = 'canceled';
    const body = JSON.stringify(data);
    try {
      const resp = await modifyById(body, `/orders/${data._id}`);
      const arrOrdersNotChange = orders.filter((obj) => obj._id !== resp._id);
      setOrders([...arrOrdersNotChange]);
    } catch (err) {
      console.error(err.message);
    }
  };
  const timeProcessed = (elem) => {
    const tfn = timeFrom(elem.dateEntry, elem.dateProcessed);
    return `${tfn.time} ${tfn.unitOfTime}`;
  };

  return (
    <main>
      <div className="row">
        {
          !loading ? orders.map((elem) => (
            elem.status === 'delivered'
              ? (
                <div className="div-order-list background-white" key={elem._id}>
                  <div className="flex-between">
                    <p className="bold-1rem">{elem.client}</p>
                    <p className="bold-1rem">{timeProcessed(elem)}</p>
                  </div>
                  <p>Products:</p>
                  <OrderProducts items={elem.products} />
                  <button
                    type="button"
                    onClick={() => changeOrder(elem)}
                  >
                    Delivered
                  </button>
                </div>
              ) : null
          ))
            : (
              <Loader />
            )
        }
      </div>
    </main>
  );
};

export default OrderListWaiter;
