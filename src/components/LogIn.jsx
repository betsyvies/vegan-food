import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useAuth } from '../ProvideAuth';
import auth from '../services/auth';
import Alert from './Alert';

const LogIn = () => {
  const authHook = useAuth();
  const history = useHistory();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [alert, setAlert] = useState({
    status: false,
    message: '',
  });

  const handleChange = (e) => {
    const nam = e.target.name;
    const val = e.target.value;
    setUser((prev) => ({ ...prev, [nam]: val }));
  };

  const getRol = (token) => {
    const tokenDecode = jwtDecode(token);
    return tokenDecode.roles.admin;
  };

  const handleStart = async (e) => {
    e.preventDefault();
    const body = JSON.stringify(user);
    try {
      const respAuth = await auth(body);
      localStorage.setItem('token', respAuth.token);
      const admin = getRol(respAuth.token);
      localStorage.setItem('admin', admin);
      authHook.signin(
        () => (admin ? history.push('/admin/users') : history.push('/waiter/menu')),
      );
    } catch (err) {
      setAlert({ status: true, message: err.message });
    }
  };

  return (
    <main className="flex-center">
      <div className="img-responsive" />
      <div className="div-form">
        <form onSubmit={handleStart}>
          <label htmlFor="email">
            Email
            <input id="email" type="email" name="email" onChange={handleChange} />
          </label>
          <label htmlFor="password">
            Password
            <input id="password" type="password" name="password" onChange={handleChange} />
          </label>
          {
            alert.status ? <Alert message={alert.message} /> : <></>
          }
          <div className="div-button">
            <button type="submit">Start</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LogIn;
