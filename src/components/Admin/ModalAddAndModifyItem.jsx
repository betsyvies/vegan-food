/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import PropTypes from 'prop-types';

import DeleteItem from './DeleteItem';
import FormAddAndModifyProduct from './FormAddAndModifyProduct';
import FormAddAndModifyUser from './FormAddAndModifyUser';

import { clearStateItem } from '../../utils';

const ModalAddAndModify = ({
  show, items, infoItem, btnVal, setState, comp,
}) => {
  const handleClickClose = () => {
    setState((prevState) => ({
      ...prevState,
      show: false,
      infoItem: clearStateItem(comp),
    }));
  };

  const Form = comp === 'product' ? (
    <FormAddAndModifyProduct
      setState={setState}
      items={items}
      infoItem={infoItem}
      handleClickClose={handleClickClose}
    />
  ) : (
    <FormAddAndModifyUser
      setState={setState}
      items={items}
      infoItem={infoItem}
      handleClickClose={handleClickClose}
    />
  );

  return (show
    ? (
      <div className="modal">
        <div className="modal-content">
          <span role="button" className="close" onClick={handleClickClose}>&times;</span>
          { btnVal === 'edit'
            ? (Form)
            : (
              <DeleteItem
                setState={setState}
                items={items}
                infoItem={infoItem}
                comp={comp}
                handleClickClose={handleClickClose}
              />
            )}
        </div>
      </div>
    ) : null
  );
};

ModalAddAndModify.propTypes = {
  show: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  infoItem: PropTypes.shape({
    _id: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    password: PropTypes.string,
    price: PropTypes.number,
    roles: PropTypes.shape({
      admin: PropTypes.bool,
    }),
    type: PropTypes.string,
  }).isRequired,
  btnVal: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  comp: PropTypes.string.isRequired,
};

export default ModalAddAndModify;
