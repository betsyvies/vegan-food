import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useAuth } from '../../ProvideAuth';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  padding: 0 1rem;
  li {
    padding: 1.2rem 0.6rem;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: white;
    position: fixed;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    top: 0;
    z-index: 1;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #66B032;
    }
  }
`;

const RightNav = ({ open, admin, setOpen }) => {
  const authHook = useAuth();
  const history = useHistory();
  const handleLogOut = () => {
    authHook.signout(() => history.push('/'));
  };

  const handleChangeRoute = (route) => {
    history.push(route);
    setOpen(!open);
  };

  return (
    <Ul open={open}>
      { admin === 'true'
        ? (
          <>
            <li>
              <input
                type="button"
                onClick={() => handleChangeRoute('/admin/users')}
                value="Users"
              />
            </li>
            <li>
              <input
                type="button"
                onClick={() => handleChangeRoute('/admin/products')}
                value="Products"
              />
            </li>
          </>
        )
        : (
          <>
            <li>
              <input
                type="button"
                onClick={() => handleChangeRoute('/waiter/menu')}
                value="Menu"
              />
            </li>
            <li>
              <input
                type="button"
                onClick={() => handleChangeRoute('/chef/order-list')}
                value="Orders"
              />
            </li>
            <li>
              <input
                type="button"
                onClick={() => handleChangeRoute('/waiter/order-list')}
                value="Delivered"
              />
            </li>
          </>
        )}
      <li>
        <button type="button" onClick={handleLogOut}>Log out</button>
      </li>
    </Ul>
  );
};

RightNav.propTypes = {
  open: PropTypes.bool.isRequired,
  admin: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default RightNav;
