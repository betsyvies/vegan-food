import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import OrderItem from './OrderItem';
import OrderSend from './OrderSend';

const Div = styled.div`
  margin: 1rem;
  padding: 0 1rem;
  width: ${({ show }) => (show ? '100%' : '50%')};
  @media (max-width: 768px) {
    display: ${({ show }) => (show ? 'initial' : 'none')};;
  }
`;

const OrderTable = ({
  name, items, setState, show,
}) => {
  const handleChange = (e) => {
    const inputVal = e.target.value;
    setState((prevState) => ({ ...prevState, name: inputVal }));
  };
  return (
    <Div show={show}>
      <input type="name" onChange={handleChange} placeholder="Name customer" defaultValue={name} />
      {items.map((elem) => (
        <OrderItem
          key={elem.product._id}
          elem={elem}
          items={items}
          setState={setState}
        />
      ))}
      <OrderSend name={name} items={items} setState={setState} />
    </Div>
  );
};

OrderTable.propTypes = {
  name: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  setState: PropTypes.func.isRequired,
};

export default OrderTable;
