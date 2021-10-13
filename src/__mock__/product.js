import mockFetch from './index';

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

const product = {
  _id: '1',
  name: 'American Coffee',
  price: 7,
  image: '',
  type: 'Breakfast',
  dateEntry: 'Sun Jul 05 2020 23:00:00 GMT-0500 (hora estándar de Perú)',
};

export const mockFetchGetProduct = (status) => mockFetch(status, products);

export const mockFetchDeleteProduct = (status) => mockFetch(status, product);
