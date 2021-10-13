import React from 'react';
import PropTypes from 'prop-types';

import ItemUser from './ItemUser';
import ItemProduct from './ItemProduct';

const ItemList = ({ items, comp, setState }) => {
  const handleOpenModal = (e) => {
    const dataId = e.target.getAttribute('data-id');
    const btn = e.target.getAttribute('data-btn');
    const serchItem = items.filter((elem) => elem._id === dataId)[0];
    setState((prevState) => ({
      ...prevState,
      infoItem: serchItem,
      show: true,
      btnVal: btn,
    }));
  };

  const compItems = items.map((elem) => (
    <div key={elem._id} className="flex-between">
      {comp === 'user' ? <ItemUser elem={elem} /> : <ItemProduct elem={elem} />}
      <div className="container-text">
        <input
          data-id={elem._id}
          data-btn="edit"
          type="image"
          alt="edit"
          src="https://user-images.githubusercontent.com/30939075/93300474-72ca6300-f7bc-11ea-948e-e6c9c6e75f54.png"
          onClick={handleOpenModal}
        />
      </div>
      <div className="container-text">
        <input
          data-id={elem._id}
          data-btn="delete"
          type="image"
          alt="delete"
          src="https://user-images.githubusercontent.com/30939075/93293701-34c64280-f7ae-11ea-87f8-ee0d2fd78c18.png"
          onClick={handleOpenModal}
        />
      </div>
    </div>
  ));
  return (
    <div className="container-items">
      { compItems }
    </div>
  );
};

ItemList.propTypes = {
  comp: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  setState: PropTypes.func.isRequired,
};

export default ItemList;
