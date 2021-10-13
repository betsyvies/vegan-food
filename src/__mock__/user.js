import mockFetch from './index';

const user = {
  _id: 2,
  email: 'juana@lgmail.com',
  password: '123456',
  roles: {
    admin: 'false',
  },
};

const users = [
  {
    _id: 1,
    email: 'admin@localhost.com',
    password: '123456',
    roles: {
      admin: 'true',
    },
  },
  {
    _id: 2,
    email: 'juana@gmail.com',
    password: '1234hju',
    roles: {
      admin: 'false',
    },
  },
];

export default (status) => mockFetch(status, user);

export const mockFetchGetUser = (status) => mockFetch(status, users);

export const mockFetchDeleteUser = (status) => mockFetch(status, user);
