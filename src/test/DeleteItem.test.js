import React from 'react';
import {
  render, screen, fireEvent, act,
} from '@testing-library/react';
import DeleteItem from '../components/Admin/DeleteItem';
import { mockFetchDeleteProduct } from '../__mock__/product';
import { mockFetchDeleteUser } from '../__mock__/user';

describe('DeleteItem with products route', () => {
  const setState = jest.fn();
  const products = [
    {
      _id: '1',
      name: 'American Coffee',
      price: 7,
      image: '',
      type: 'Breakfast',
      dateEntry: 'Sun Jul 05 2020 23:00:00 GMT-0500 (hora estándar de Perú)',
    },
    {
      _id: '2',
      name: 'Water 500ml',
      price: 5,
      image: '',
      type: 'Drink',
      dateEntry: 'Sun Jul 06 2020 14:00:00 GMT-0500 (hora estándar de Perú)',
    },
  ];
  const infoItem = {
    _id: '1',
    name: 'American Coffee',
    price: 7,
    image: '',
    type: 'Breakfast',
    dateEntry: 'Sun Jul 05 2020 23:00:00 GMT-0500 (hora estándar de Perú)',
  };
  const comp = 'product';
  test('Show delete product and data base when to generate a event click', async () => {
    global.fetch = mockFetchDeleteProduct(200);
    act(() => {
      render(<DeleteItem setState={setState} items={products} infoItem={infoItem} comp={comp} />);
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Continue'));
    });
    expect(setState).toHaveBeenCalledTimes(1);
  });
  test('When to generate a event click the ModalAddAndModifyItem is close', async () => {
    act(() => {
      render(<DeleteItem setState={setState} items={products} infoItem={infoItem} comp={comp} />);
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Cancel'));
    });
    expect(setState).toHaveBeenCalledTimes(2);
  });
  test('When there is a error 403', async () => {
    global.fetch = mockFetchDeleteProduct(403);
    act(() => {
      render(<DeleteItem setState={setState} items={products} infoItem={infoItem} comp={comp} />);
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Continue'));
    });
    expect(screen.getByText('Forbidden')).toBeInTheDocument();
  });
  test('When there is a error 401', async () => {
    global.fetch = mockFetchDeleteProduct(401);
    act(() => {
      render(<DeleteItem setState={setState} items={products} infoItem={infoItem} comp={comp} />);
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Continue'));
    });
    expect(screen.getByText('Unauthorized')).toBeInTheDocument();
  });
  test('When there is a error 500', async () => {
    global.fetch = mockFetchDeleteProduct(500);
    act(() => {
      render(<DeleteItem setState={setState} items={products} infoItem={infoItem} comp={comp} />);
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Continue'));
    });
    expect(screen.getByText('Unexpected status 500')).toBeInTheDocument();
  });
});

describe('DeleteItem with users route', () => {
  const setState = jest.fn();
  const users = [
    {
      _id: 1,
      email: 'admin@localhost.com',
      password: '123456',
      rol: {
        admin: 'true',
      },
    },
    {
      _id: 2,
      email: 'juana@gmail.com',
      password: '1234hju',
      rol: {
        admin: 'false',
      },
    },
  ];
  const infoItem = {
    _id: '1',
    email: 'admin@localhost.com',
    password: '123456',
    rol: {
      admin: 'true',
    },
  };
  const comp = 'user';
  test('Show delete product and data base when to generate a event click', async () => {
    global.fetch = mockFetchDeleteUser(200);
    act(() => {
      render(<DeleteItem setState={setState} items={users} infoItem={infoItem} comp={comp} />);
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Continue'));
    });
    expect(setState).toHaveBeenCalledTimes(1);
  });
  test('When to generate a event click the ModalAddAndModifyItem is close', async () => {
    act(() => {
      render(<DeleteItem setState={setState} items={users} infoItem={infoItem} comp={comp} />);
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Cancel'));
    });
    expect(setState).toHaveBeenCalledTimes(2);
  });
  test('When there is a error 403', async () => {
    global.fetch = mockFetchDeleteUser(403);
    act(() => {
      render(<DeleteItem setState={setState} items={users} infoItem={infoItem} comp={comp} />);
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Continue'));
    });
    expect(screen.getByText('Forbidden')).toBeInTheDocument();
  });
  test('When there is a error 401', async () => {
    global.fetch = mockFetchDeleteUser(401);
    act(() => {
      render(<DeleteItem setState={setState} items={users} infoItem={infoItem} comp={comp} />);
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Continue'));
    });
    expect(screen.getByText('Unauthorized')).toBeInTheDocument();
  });
  test('When there is a error 500', async () => {
    global.fetch = mockFetchDeleteUser(500);
    act(() => {
      render(<DeleteItem setState={setState} items={users} infoItem={infoItem} comp={comp} />);
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Continue'));
    });
    expect(screen.getByText('Unexpected status 500')).toBeInTheDocument();
  });
});
