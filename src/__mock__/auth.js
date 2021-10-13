import mockFetch from './index';

const admin = {
  token: 'fake_admin_token',
  roles: {
    admin: true,
  },
};

const user = {
  token: 'fake_user_token',
  roles: {
    admin: false,
  },
};

export const mockFetchAuthAdmin = (status) => mockFetch(status, admin);

export const mockFetchAuthUser = (status) => mockFetch(status, user);
