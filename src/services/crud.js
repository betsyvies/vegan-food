import fetchFromAPI from './index';

export const getAll = (route) => fetchFromAPI(route, {
  method: 'GET',
});

export const create = (body, route) => fetchFromAPI(route, {
  method: 'POST',
  body,
});

export const modifyById = (body, route) => fetchFromAPI(route, {
  method: 'PUT',
  body,
});

export const getById = (route) => fetchFromAPI(route, {
  method: 'GET',
});

export const deleteById = (route) => fetchFromAPI(route, {
  method: 'DELETE',
});
