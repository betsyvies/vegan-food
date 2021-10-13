import React from 'react';
import PropTypes from 'prop-types';

import Badge from './Badge';

const Title = ({ setState, items }) => (
  <div className="flex-between margin-0-1">
    <h3>Menu</h3>
    <Badge setState={setState} items={items} />
  </div>
);

Title.propTypes = {
  setState: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Title;
