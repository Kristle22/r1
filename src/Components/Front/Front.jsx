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

  // Read PRODUCTS
  useEffect(() => {
    axios.get('http://localhost:3003/prekes', authConfig()).then((res) => {
      const action = {
        type: 'products_list',
        payload: res.data,
      };
      dispachProducts(action);
    });
  }, [lastUpdate]);

  // Read CATS
  useEffect(() => {
    axios.get('http://localhost:3003/kategorijos', authConfig()).then((res) => {
      setCats(res.data);
    });
  }, [lastUpdate]);

  return (
    <FrontContext.Provider value={{ products, dispachProducts, cats }}>
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
