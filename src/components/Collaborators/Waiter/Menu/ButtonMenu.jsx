import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Div = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin: 1rem 0;
input {
  text-align: center;
  &:nth-child(1) {
    color: ${({ val }) => (val === 'Breakfast' ? '#375F1B' : 'black')};
    border-bottom: 2px solid ${({ val }) => (val === 'Breakfast' ? '#375F1B' : 'transparent')};
  }
  &:nth-child(2) {
    color: ${({ val }) => (val === 'Drink' ? '#375F1B' : 'black')};
    border-bottom: 2px solid ${({ val }) => (val === 'Drink' ? '#375F1B' : 'transparent')};
  }
  &:nth-child(3) {
    color: ${({ val }) => (val === 'Burger' ? '#375F1B' : 'black')};
    border-bottom: 2px solid ${({ val }) => (val === 'Burger' ? '#375F1B' : 'transparent')};
  }
  &:nth-child(4) {
    color: ${({ val }) => (val === 'Accompaniments' ? '#375F1B' : 'black')};
    border-bottom: 2px solid ${({ val }) => (val === 'Accompaniments' ? '#375F1B' : 'transparent')};
  }
`;

const ButtonMenu = ({ setState, type }) => {
  const handleClick = (e) => {
    const val = e.target.value;
    setState((prevState) => ({ ...prevState, type: val }));
  };
  return (
    <Div className="flex-between" val={type}>
      <input type="button" onClick={handleClick} value="Breakfast" />
      <input type="button" onClick={handleClick} value="Drink" />
      <input type="button" onClick={handleClick} value="Burger" />
      <input type="button" onClick={handleClick} value="Accompaniments" />
    </Div>
  );
};

ButtonMenu.propTypes = {
  setState: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default ButtonMenu;
