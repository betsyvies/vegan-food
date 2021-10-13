import React from 'react';
import { render, screen } from '@testing-library/react';

import ItemUser from '../components/Admin/ItemUser';

describe('ItemUser', () => {
  test('shows the admin when rol.admin is true', () => {
    const item = {
      _id: '1',
      email: 'admin@localhost.com',
      password: '123456',
      rol: {
        admin: 'true',
      },
    };
    render(<ItemUser elem={item} />);

    expect(screen.queryByText(item.email)).toBeInTheDocument();
    expect(screen.queryByText('admin')).toBeInTheDocument();
  });

  test('shows the user when rol.admin is false', () => {
    const item = {
      _id: 1,
      email: 'admin@localhost.com',
      password: '123456',
      rol: {
        admin: 'false',
      },
    };
    render(<ItemUser elem={item} />);

    expect(screen.queryByText(item.email)).toBeInTheDocument();
    expect(screen.queryByText('user')).toBeInTheDocument();
  });
});
