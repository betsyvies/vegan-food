/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import { getAll } from '../../services/crud';

import AddItem from './AddItem';
import ItemList from './ItemList';
import ModalAddAndModify from './ModalAddAndModifyItem';
import Loader from '../Loader';

const DashboardProducts = () => {
  const [state, setState] = useState({
    items: [],
    show: false,
    btnVal: '',
    comp: 'product',
    infoItem: {
      name: '',
      price: 0,
      type: 'Breakfast',
    },
    loading: true,
  });

  const getAllProducts = async () => {
    try {
      const items = await getAll('/products?page=1&limit=20');
      setState((prevState) => ({ ...prevState, items }));
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
      <div className="padding-1">
        <AddItem {...state} setState={setState} />
        {
          !state.loading ? <ItemList {...state} setState={setState} />
            : (
              <Loader />
            )
        }
        <ModalAddAndModify {...state} setState={setState} />
      </div>
    </main>
  );
};

export default DashboardProducts;
