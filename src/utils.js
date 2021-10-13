export const clearStateItem = (id) => {
  if (id === 'user') {
    return {
      email: '',
      password: '',
      roles: { admin: true },
    };
  }
  return {
    name: '',
    price: 0,
    type: 'Breakfast',
  };
};

export const timeFrom = (dateEntry, dateProcessed) => {
  const entryTime = new Date(dateEntry).getTime();
  const processTime = new Date(dateProcessed).getTime();
  let difference = (entryTime / 1000) - (processTime / 1000);
  // Convert difference to absolute
  difference = Math.abs(difference);
  // Setup return object
  const tfn = {};

  // Calculate time unit
  if (difference / (60 * 60 * 24 * 365) > 1) {
    // Years
    tfn.unitOfTime = 'years';
    tfn.time = Math.floor(difference / (60 * 60 * 24 * 365));
  } else if (difference / (60 * 60 * 24 * 45) > 1) {
    // Months
    tfn.unitOfTime = 'months';
    tfn.time = Math.floor(difference / (60 * 60 * 24 * 45));
  } else if (difference / (60 * 60 * 24) > 1) {
    // Days
    tfn.unitOfTime = 'days';
    tfn.time = Math.floor(difference / (60 * 60 * 24));
  } else if (difference / (60 * 60) > 1) {
    // Hours
    tfn.unitOfTime = 'hours';
    tfn.time = Math.floor(difference / (60 * 60));
  } else {
    // Seconds
    tfn.unitOfTime = 'seconds';
    tfn.time = Math.floor(difference);
  }
  return tfn;
};
