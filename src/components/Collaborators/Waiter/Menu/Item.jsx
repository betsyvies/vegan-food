/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

const Item = ({
  elem, items, setState,
}) => {
  const addNewItem = () => setState((prevState) => ({
    ...prevState,
    items: [
      ...items,
      {
        qty: 1,
        product: { ...elem },
      },
    ],
  }));
  const createNewListItems = () => items.map((item) => {
    if (item.product._id === elem._id) {
      const newItem = { ...item };
      let qtyCu = item.qty;
      qtyCu += 1;
      newItem.qty = qtyCu;
      return newItem;
    }
    return item;
  });
  const addExistItem = () => {
    const newItems = createNewListItems(items);
    setState((prevState) => ({
      ...prevState,
      items: [
        ...newItems,
      ],
    }));
  };
  const sendItem = (e) => {
    e.preventDefault();
    const product = items.find((item) => item.product._id === elem._id);
    if (product) {
      addExistItem();
    }
    addNewItem();
  };
  return (
    <div className="div-product">
      <p className="text-center margin-0">{elem.name}</p>
      <button
        type="button"
        onClick={sendItem}
      >
        Send
      </button>
    </div>
  );
};

Item.propTypes = {
  elem: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  setState: PropTypes.func.isRequired,
};

export default Item;
