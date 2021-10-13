import React, {
  useState, useEffect,
} from 'react';

import { getAll } from '../../../../services/crud';

import ButtonMenu from './ButtonMenu';
import OrderTable from './OrderTable';
import Title from './Title';
import ModalOrder from './ModalOrder';
import Item from './Item';
import Loader from '../../../Loader';

const Menu = () => {
  const [state, setState] = useState({
    name: '',
    items: [],
    products: [],
    type: 'Breakfast',
    show: false,
    loading: true,
  });

  const getAllProducts = async () => {
    try {
      const products = await getAll('/products?page=1&limit=50');
      setState((prevState) => ({ ...prevState, products }));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    let mounted = true;
    getAllProducts().then(() => {
      if (mounted) {
        setState((prevState) => ({ ...prevState, loading: false }));
      }
    });

    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <main>
      <Title {...state} setState={setState} />
      <div className="flex margin-1">
        <div className="container-button-menu padding-0-1">
          <ButtonMenu {...state} setState={setState} />
          <div className="row">
            {
          !state.loading ? state.products
            .filter((elem) => elem.type === state.type)
            .map((elem) => (
              <Item
                key={elem._id}
                elem={elem}
                {...state}
                setState={setState}
              />
            ))
            : (
              <Loader />
            )
        }
          </div>
        </div>
        <ModalOrder {...state} setState={setState} />
        {!state.show
          ? <OrderTable {...state} setState={setState} />
          : null}
      </div>
    </main>
  );
};

export default Menu;
