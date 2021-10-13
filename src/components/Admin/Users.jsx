/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { getAll } from '../../services/crud';

import AddItem from './AddItem';
import ItemList from './ItemList';
import ModalAddAndModify from './ModalAddAndModifyItem';
import Loader from '../Loader';

const DashboardUsers = () => {
  const [state, setState] = useState({
    items: [],
    show: false,
    btnVal: '',
    comp: 'user',
    infoItem: {
      email: '',
      password: '',
      roles: { admin: true },
    },
    loading: true,
  });

  const getAllUsers = async () => {
    try {
      const items = await getAll('/users');
      setState((prevState) => ({ ...prevState, items }));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    let mounted = true;
    getAllUsers().then(() => {
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

export default DashboardUsers;
