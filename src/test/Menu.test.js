import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Menu from '../components/Collaborators/Waiter/Menu';
import { mockFetchGetProduct } from '../__mock__/product';

describe('Menu', () => {
  test('When admin is same a true', async () => {
    global.fetch = mockFetchGetProduct(200);
    const history = createMemoryHistory();
    await act(async () => {
      render(
        <Router history={history}>
          <Menu />
        </Router>,
      );
    });
    expect(screen.getByText('American Coffee')).toBeInTheDocument();
  });
});
