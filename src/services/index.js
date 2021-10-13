const baseUrl = 'https://burger-api-2020.herokuapp.com';

export default async (url, opts = {}) => {
  const token = localStorage.getItem('token');
  const resp = await fetch(`${baseUrl}${url}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
      ...(opts || {}).headers,
    },
  });
  const data = await resp.json();

  switch (resp.status) {
    case 400:
      return Promise.reject(new Error('Please, fill in all the fields'));
    case 401:
      return Promise.reject(new Error('Unauthorized'));
    case 403:
      return Promise.reject(new Error('Forbidden'));
    case 200:
      return data;
    default:
      return Promise.reject(new Error(`Unexpected status ${resp.status}`));
  }
};
