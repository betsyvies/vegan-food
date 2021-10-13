import React from 'react';
import { Link } from 'react-router-dom';
import Burger from './Burger';

const Header = () => {
  const admin = localStorage.getItem('admin');
  return (
    <header className="flex-between">
      <h2 className="margin-0-1">
        <Link to={`${admin === 'true'
          ? '/admin/users'
          : '/waiter/menu'
        }`}
        >
          Vegan Food
        </Link>
      </h2>
      <nav>
        <Burger admin={admin} />
      </nav>
    </header>
  );
};

export default Header;
