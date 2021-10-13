/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { create, modifyById } from '../../services/crud';

import Alert from '../Alert';

const FormAddAndModifyProduct = ({
  setState, items, infoItem, handleClickClose,
}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [alert, setAlert] = useState({
    status: false,
    message: '',
  });

  const handleName = (e) => setName(e.target.value);
  const handlePrice = (e) => setPrice(e.target.value);
  const handleType = (e) => setType(e.target.value);

  const sendCreateProduct = async (route, initState) => {
    const data = JSON.stringify({
      name,
      price: parseInt(price, 10),
      type,
      image: '',
    });
    try {
      const resp = await create(data, route);
      setState((prevState) => ({
        ...prevState,
        items: [{ ...resp },
          ...items],
        infoItem: initState,
      }));
      handleClickClose();
    } catch (err) {
      setAlert({ status: true, message: err.message });
    }
  };

  const sendModifyProductId = async (route, initState) => {
    const data = JSON.stringify({
      name: name !== '' ? name : infoItem.name,
      price: price !== '' ? parseInt(price, 10) : infoItem.price,
      type: type !== '' ? type : infoItem.type,
      image: '',
    });
    try {
      const resp = await modifyById(data, route);
      const arrItemsNotChange = items.filter((elem) => elem._id !== infoItem._id);
      setState((prevState) => ({
        ...prevState,
        show: false,
        items: [{ ...resp },
          ...arrItemsNotChange],
        infoItem: initState,
      }));
      handleClickClose();
    } catch (err) {
      setAlert({ status: true, message: err.message });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const initState = {
      name: '',
      price: 0,
      type: 'Breakfast',
    };
    if (infoItem._id) {
      return sendModifyProductId(`/products/${infoItem._id}`, initState);
    }
    return sendCreateProduct('/products', initState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name
        <input type="name" name="name" defaultValue={infoItem.name} onChange={handleName} />
      </label>
      <label htmlFor="price">
        Price
        <input type="price" name="price" defaultValue={infoItem.price} onChange={handlePrice} />
      </label>
      <label htmlFor="type" className="">
        Type
        <select defaultValue={infoItem.type} type="type" name="type" onChange={handleType}>
          <option value="Breakfast">Breakfast</option>
          <option value="Drink">Drink</option>
          <option value="Accompaniments">Accompaniments</option>
          <option value="Burger">Burger</option>
        </select>
      </label>
      <button className="margin-1-0" type="submit">Send</button>
      {
        alert.status ? <Alert message={alert.message} /> : <></>
      }
    </form>
  );
};

FormAddAndModifyProduct.propTypes = {
  setState: PropTypes.func.isRequired,
  infoItem: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    type: PropTypes.string,
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClickClose: PropTypes.func.isRequired,
};

export default FormAddAndModifyProduct;
