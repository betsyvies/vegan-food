import React from 'react';
import {
  render, screen, fireEvent, act,
} from '@testing-library/react';

import AddItem from '../components/Admin/AddItem';

describe('AddItem with users route', () => {
  const setState = jest.fn();
  const comp = 'user';
  test('Show the button add item and to generate a event click', () => {
    act(() => {
      render(<AddItem setState={setState} comp={comp} />);
    });
    act(() => {
      fireEvent.click(screen.getByRole('button'));
    });
    expect(setState).toHaveBeenCalledTimes(1);
  });
  test('Show Users List when comp is user', () => {
    act(() => {
      render(<AddItem setState={setState} comp={comp} />);
    });
    expect(screen.getByText('Users List')).toBeInTheDocument();
  });
});

describe('AddItem with products route', () => {
  const setState = jest.fn();
  const comp = 'product';
  test('Show the button add item and to generate a event click', () => {
    act(() => {
      render(<AddItem setState={setState} comp={comp} />);
    });
    act(() => {
      fireEvent.click(screen.getByRole('button'));
    });
    expect(setState).toHaveBeenCalledTimes(1);
  });
  test('Show Products List when comp is product', () => {
    act(() => {
      render(<AddItem setState={setState} comp={comp} />);
    });
    expect(screen.getByText('Products List')).toBeInTheDocument();
  });
});
