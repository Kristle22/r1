import { useState, useEffect } from 'react';
import CatsCrud from './Cats/Crud';
import Nav from './Nav';
import ProductsCrud from './Products/Crud';
import BackContext from './BackContext';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function Back({ show }) {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [cats, setCats] = useState(null);
  const [createCat, setCreateCat] = useState(null);
  const [deleteCat, setDeleteCat] = useState(null);
  const [modalCat, setModalCat] = useState(null);
  const [editCat, setEditCat] = useState(null);

  const [products, setProducts] = useState(null);
  const [createProduct, setCreateProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [modalProduct, setModalProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  const [messages, setMessages] = useState([
    // { id: 4465, text: 'Jus pasiekete prekiu limita.', type: 'danger' },
    // {
    //   id: 5437,
    //   text: 'Jusu korteles galiojimo laikas baigsis uz 7 dienu.',
    //   type: 'info',
    // },
    // { id: 8490, text: 'Sveikiname isigijus megstama preke!', type: 'success' },
  ]);

  // Read PRODUCTS
  useEffect(() => {
    axios.get('http://localhost:3003/adm/prekes').then((res) => {
      setProducts(res.data);
    });
  }, [lastUpdate]);

  //Create PRODUCT
  useEffect(() => {
    if (null === createProduct) return;
    axios
      .post('http://localhost:3003/adm/prekes', createProduct)
      .then((res) => {
        showMessage(res.data.msg);
        console.log('res data', res.data);
        setLastUpdate(Date.now());
      })
      .catch((error) => {
        showMessage({ text: error.message, type: 'danger' });
      });
  }, [createProduct]);

  //Delete PRODUCT
  useEffect(() => {
    if (null === deleteProduct) return;
    axios
      .delete('http://localhost:3003/adm/prekes/' + deleteProduct.id)
      .then((res) => {
        showMessage(res.data.msg);
        console.log('res data', res.data);
        setLastUpdate(Date.now());
      })
      .catch((error) => {
        showMessage({ text: error.message, type: 'danger' });
      });
  }, [deleteProduct]);

  //Edit PRODUCT
  useEffect(() => {
    if (null === editProduct) return;
    axios
      .put('http://localhost:3003/adm/prekes/' + editProduct.id, editProduct)
      .then((res) => {
        showMessage(res.data.msg);
        console.log('res data', res.data);
        setLastUpdate(Date.now());
      })
      .catch((error) => {
        showMessage({ text: error.message, type: 'danger' });
      });
  }, [editProduct]);

  // Read CATS
  useEffect(() => {
    axios.get('http://localhost:3003/adm/kategorijos').then((res) => {
      setCats(res.data);
    });
  }, [lastUpdate]);

  //Create CAT
  useEffect(() => {
    if (null === createCat) return;
    axios
      .post('http://localhost:3003/adm/kategorijos', createCat)
      .then((res) => {
        showMessage(res.data.msg);
        console.log('res data', res.data);
        setLastUpdate(Date.now());
      })
      .catch((error) => {
        showMessage({ text: error.message, type: 'danger' });
      });
  }, [createCat]);

  //Delete CAT
  useEffect(() => {
    if (null === deleteCat) return;
    axios
      .delete('http://localhost:3003/adm/kategorijos/' + deleteCat.id)
      .then((res) => {
        showMessage(res.data.msg);
        console.log('res data', res.data);
        setLastUpdate(Date.now());
      })
      .catch((error) => {
        showMessage({ text: error.message, type: 'danger' });
      });
  }, [deleteCat]);

  //Edit CAT
  useEffect(() => {
    if (null === editCat) return;
    axios
      .put('http://localhost:3003/adm/kategorijos/' + editCat.id, editCat)
      .then((res) => {
        showMessage(res.data.msg);
        console.log('res data', res.data);
        setLastUpdate(Date.now());
      })
      .catch((error) => {
        showMessage({ text: error.message, type: 'danger' });
      });
  }, [editCat]);

  const showMessage = (m) => {
    const id = uuidv4();
    m.id = id;
    setMessages((msg) => [...msg, m]);
    setTimeout(() => {
      setMessages((mes) => mes.filter((ms) => ms.id !== id));
    }, 5000);
  };

  return (
    <BackContext.Provider
      value={{
        setCreateCat,
        cats,
        setDeleteCat,
        messages,
        modalCat,
        setModalCat,
        setEditCat,
        setCreateProduct,
        products,
        showMessage,
        setDeleteProduct,
        setEditProduct,
        modalProduct,
        setModalProduct,
      }}
    >
      {show === 'admin' ? (
        <>
          <Nav />
          <h1>Back</h1>
        </>
      ) : show === 'cats' ? (
        <CatsCrud />
      ) : show === 'products' ? (
        <ProductsCrud />
      ) : null}
    </BackContext.Provider>
  );
}

export default Back;
