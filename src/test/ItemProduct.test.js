import React from 'react';
import { render, screen } from '@testing-library/react';

import ItemProduct from '../components/Admin/ItemProduct';

describe('ItemProduct', () => {
  test('shows the admin when rol.admin is true', () => {
    const product = {
      _id: '1',
      name: 'American Coffee',
      price: 7,
      image: '',
      type: 'Breakfast',
      dateEntry: 'Sun Jul 05 2020 23:00:00 GMT-0500 (hora estándar de Perú)',
    };
    render(<ItemProduct elem={product} />);

    expect(screen.queryByText(product.name)).toBeInTheDocument();
  });
});
