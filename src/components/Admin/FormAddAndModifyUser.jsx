/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { create, modifyById } from '../../services/crud';

import Alert from '../Alert';

const FormAddAndModifyUser = ({
  setState, items, infoItem, handleClickClose,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState('true');
  const [alert, setAlert] = useState({
    status: false,
    message: '',
  });

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleRol = (e) => setAdmin(e.target.value);

  const sendCreateUser = async (route, initState) => {
    const data = JSON.stringify({
      email,
      password,
      roles: {
        admin: admin === 'true',
      },
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

  const sendModifyUserId = async (route, initState) => {
    const data = JSON.stringify({
      email: email !== '' ? email : infoItem.email,
      password: password !== '' ? password : password.email,
      roles: {
        admin: admin === 'true',
      },
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
      email: '',
      password: '',
      roles: { admin: true },
    };
    if (infoItem._id) {
      return sendModifyUserId(`/users/${infoItem._id}`, initState);
    }
    return sendCreateUser('/users', initState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email
        <input type="email" name="email" defaultValue={infoItem.email} onChange={handleEmail} />
      </label>
      <label htmlFor="password">
        Password
        <input type="password" name="password" defaultValue={infoItem.password} onChange={handlePassword} />
      </label>
      <label htmlFor="type">
        Rol
        <select defaultValue={infoItem.roles.admin} type="rol" name="rol" onChange={handleRol}>
          <option value="true">Administrator</option>
          <option value="false">User</option>
        </select>
      </label>
      <button className="margin-1-0" type="submit">Send</button>
      {
        alert.status ? <Alert message={alert.message} /> : <></>
      }
    </form>
  );
};

FormAddAndModifyUser.propTypes = {
  setState: PropTypes.func.isRequired,
  infoItem: PropTypes.shape({
    _id: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    roles: PropTypes.shape({
      admin: PropTypes.bool,
    }),

  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClickClose: PropTypes.func.isRequired,
};

export default FormAddAndModifyUser;
