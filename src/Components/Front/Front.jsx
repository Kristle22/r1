import Nav from './Nav';
import List from './List';
import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import FrontContext from './FrontContext';
import productsReducer from './productsReducer';

function Front() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [products, dispachProducts] = useReducer(productsReducer, []);
  const [cats, setCats] = useState(null);

  const [filter, setFilter] = useState(0);
  const [cat, setCat] = useState(0);

  const [search, setSearch] = useState('');

  const filtering = (cid) => {
    setCat(cid);
    setFilter(parseInt(cid));
  };

  // Read PRODUCTS Filter
  useEffect(() => {
    let query;
    if (filter === 0 && !search) {
      query = '';
    } else if (filter) {
      query = '?cat-id=' + filter;
    } else if (search) {
      query = '?s=' + search;
    }

    axios
      .get('http://localhost:3003/prekes' + query, authConfig())
      .then((res) => {
        const action = {
          type: 'products_list',
          payload: res.data,
        };
        dispachProducts(action);
      });
  }, [filter, search]);

  // Read CATS
  useEffect(() => {
    axios.get('http://localhost:3003/kategorijos', authConfig()).then((res) => {
      setCats(res.data);
    });
  }, [lastUpdate]);

  return (
    <FrontContext.Provider
      value={{
        products,
        dispachProducts,
        cats,
        setFilter,
        filter,
        cat,
        setCat,
        filtering,
        setSearch,
      }}
    >
      <>
        <Nav />
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <List />
            </div>
          </div>
        </div>
      </>
    </FrontContext.Provider>
  );
}

export default Front;
