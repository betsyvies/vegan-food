import '@testing-library/jest-dom';
import React from 'react';
import {
  render, fireEvent, screen, act,
} from '@testing-library/react';
import Login from '../components/LogIn';
import { mockFetchAuthAdmin, mockFetchAuthUser } from '../__mock__/auth';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('Admin login ', () => {
  test('allows the admin to login successfully', async () => {
    global.fetch = mockFetchAuthAdmin(200);
    act(() => {
      render(<Login />);
    });

    act(() => {
      fireEvent.change(screen.getByLabelText(/Email/), {
        target: { value: 'admin@localhost.com' },
      });
    });

    act(() => {
      fireEvent.change(screen.getByLabelText(/Password/), {
        target: { value: '123456' },
      });
    });
    await act(async () => {
      fireEvent.click(screen.getByText(/Start/i));
    });
    expect(localStorage.getItem('token')).toEqual('fake_admin_token');
  });
});

describe('User login ', () => {
  test('allows the user to login successfully', async () => {
    global.fetch = mockFetchAuthUser(200);
    act(() => {
      render(<Login />);
    });

    act(() => {
      fireEvent.change(screen.getByLabelText(/Email/), {
        target: { value: 'juana@gmail.com' },
      });
    });

    act(() => {
      fireEvent.change(screen.getByLabelText(/Password/), {
        target: { value: '123456' },
      });
    });
    await act(async () => {
      fireEvent.click(screen.getByText(/Start/i));
    });
    expect(localStorage.getItem('token')).toEqual('fake_user_token');
  });
});
