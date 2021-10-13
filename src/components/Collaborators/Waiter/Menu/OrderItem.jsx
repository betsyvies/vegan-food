import React from 'react';
import PropTypes from 'prop-types';

const OrderItem = ({
  elem, setState, items,
}) => {
  const addQty = (e) => {
    const id = e.target.getAttribute('data-id');
    const item = items.filter((pdt) => pdt.product._id === id)[0];
    let qtyCu = item.qty;
    qtyCu += 1;
    item.qty = qtyCu;
    setState((prev) => ({
      ...prev,
    }));
  };

  const minusQty = (e) => {
    const id = e.target.getAttribute('data-id');
    const item = items.filter((pdt) => pdt.product._id === id)[0];
    if (item.qty > 0) {
      let qtyCu = item.qty;
      qtyCu -= 1;
      item.qty = qtyCu;
      setState((prev) => ({
        ...prev,
      }));
    }
  };

  const handleClickDelete = (e) => {
    e.preventDefault();
    const id = e.target.getAttribute('data-id');
    const itemsNotRemoved = items.filter((item) => item.product._id !== id);
    setState((prevState) => ({ ...prevState, items: [...itemsNotRemoved] }));
  };

  return (
    <div className="flex-between">
      <div className="flex-center">
        <input
          className="margin-1"
          data-id={`${elem.product._id}`}
          type="image"
          alt="add"
          src="https://user-images.githubusercontent.com/30939075/93419412-67397380-f872-11ea-98b1-14d9048b016c.png"
          onClick={addQty}
        />
        <input
          type="number"
          value={elem.qty}
          onChange={(e) => e.target.value}
        />
        <input
          className="margin-1"
          data-id={`${elem.product._id}`}
          type="image"
          alt="minus"
          src="https://user-images.githubusercontent.com/30939075/93419354-3e18e300-f872-11ea-8396-ce35e41aed49.png"
          onClick={minusQty}
        />
      </div>
      <p className="padding-05">{elem.product.name}</p>
      <p className="padding-05">{`$ ${elem.product.price * elem.qty}`}</p>
      <input
        data-id={`${elem.product._id}`}
        type="image"
        alt="delete"
        src="https://user-images.githubusercontent.com/30939075/93293701-34c64280-f7ae-11ea-87f8-ee0d2fd78c18.png"
        onClick={handleClickDelete}
      />
    </div>
  );
};

OrderItem.propTypes = {
  elem: PropTypes.shape({
    qty: PropTypes.number.isRequired,
    product: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
    }),
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  setState: PropTypes.func.isRequired,
};

export default OrderItem;
