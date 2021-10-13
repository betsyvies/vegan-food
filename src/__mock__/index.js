const chooseStatus = (status, data) => {
  switch (status) {
    case 401:
      return Promise.reject(new Error('Unauthorized'));
    case 403:
      return Promise.reject(new Error('Forbidden'));
    case 200:
      return Promise.resolve(data);
    default:
      return Promise.reject(new Error(`Unexpected status ${status}`));
  }
};

const mockFetch = (status, data) => jest.fn(() => (
  Promise.resolve({
    status,
    json: () => chooseStatus(status, data),
  })
));

export default mockFetch;
