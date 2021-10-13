import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ProvideAuth from './ProvideAuth';
import PrivateRoute from './PrivateRoute';
import Loader from './components/Loader';

const LogIn = lazy(() => import('./components/LogIn'));
const Menu = lazy(() => import('./components/Collaborators/Waiter/Menu'));
const OrderListWaiter = lazy(() => import('./components/Collaborators/Waiter/OrderList'));
const OrderListChef = lazy(() => import('./components/Collaborators/Chef/OrderList'));
const DashboardProducts = lazy(() => import('./components/Admin/Products'));
const DashboardUsers = lazy(() => import('./components/Admin/Users'));
const renderLoader = () => <Loader />;

const App = () => (
  <ProvideAuth>
    <Router>
      <Suspense fallback={renderLoader()}>
        <Switch>
          <PrivateRoute path="/admin/users">
            <DashboardUsers />
          </PrivateRoute>
          <PrivateRoute path="/admin/products">
            <DashboardProducts />
          </PrivateRoute>
          <PrivateRoute path="/chef/order-list">
            <OrderListChef />
          </PrivateRoute>
          <PrivateRoute path="/waiter/order-list">
            <OrderListWaiter />
          </PrivateRoute>
          <PrivateRoute path="/waiter/menu">
            <Menu />
          </PrivateRoute>
          <Route path="/" component={LogIn} />
        </Switch>
      </Suspense>
    </Router>
  </ProvideAuth>
);

export default App;
