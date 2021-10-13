const urlAuth = 'https://burger-api-2020.herokuapp.com/auth';

export default async (body) => {
  const resp = await fetch(urlAuth, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body,
  });
  const data = await resp.json();

  switch (resp.status) {
    case 400:
      return Promise.reject(new Error('Enter e-mail or password'));
    case 200:
      return data;
    default:
      return Promise.reject(new Error(`Unexpected status ${resp.status}`));
  }
};
