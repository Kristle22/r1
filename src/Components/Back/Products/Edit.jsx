import { useContext } from 'react';
import { useEffect, useState } from 'react';
import BackContext from '../BackContext';

function Edit() {
  const { modalProduct, setModalProduct, setEditProduct, cats } =
    useContext(BackContext);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [inStock, setInStock] = useState(false);
  const [cat, setCat] = useState('0');
  const [lu, setLu] = useState('');

  const setDateFormat = (d) => {
    // yyyy-MM-ddThh:mm
    const date = new Date(Date.parse(d));

    const y = date.getFullYear();
    const m = ('' + (date.getMonth() + 1)).padStart(2, '0');
    const day = ('' + (date.getDate() + 1)).padStart(2, '0');
    const h = ('' + date.getHours()).padStart(2, '0');
    const min = ('' + date.getMinutes()).padStart(2, '0');

    const out = y + '-' + m + '-' + day + 'T' + h + ':' + min;

    return out;
  };

  useEffect(() => {
    if (null === modalProduct) return;
    setTitle(modalProduct.title);
    setPrice(modalProduct.price);
    setInStock(modalProduct.in_stock ? true : false);
    setLu(setDateFormat(modalProduct.lu));
    setCat(cats.filter((c) => (c.title = modalProduct.cat))[0].id);
  }, [modalProduct, cats]);

  const handleEdit = () => {
    const data = {
      title,
      id: modalProduct.id,
      in_stock: inStock ? 1 : 0,
      price: parseFloat(price),
      cat: parseInt(cat),
      lu: lu,
    };
    setEditProduct(data);
    setModalProduct(null);
  };
  // console.log(new Date(lu).toISOString().slice(0, 19).replace('T', ' '));

  if (null === modalProduct) {
    return null;
  }

  return (
    <div className='modal'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Change category name</h5>
            <button
              type='button'
              className='close'
              onClick={() => setModalProduct(null)}
            >
              <span>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <div className='form-group'>
              <label>Title</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <small className='form-text text-muted'>
                Enter new Product here.
              </small>
            </div>
            <div className='form-group'>
              <label>Price</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
              <small className='form-text text-muted'>
                Enter product price here.
              </small>
            </div>
            <div className='form-group'>
              <label>Date</label>
              <input
                type='datetime-local'
                className='form-control'
                onChange={(e) => setLu(e.target.value)}
                value={lu}
              />
              <small className='form-text text-muted'>
                Enter date and time here.
              </small>
            </div>
            <div className='form-group form-check'>
              <input
                type='checkbox'
                className='form-check-input'
                id='in--stock--modal'
                checked={inStock}
                onChange={() => setInStock((c) => !c)}
              />
              <label className='form-check-label' htmlFor='in--stock--modal'>
                Check me out
              </label>
            </div>
            <div className='form-group'>
              <label>Categories</label>
              <select
                className='form-control'
                value={cat}
                onChange={(e) => setCat(e.target.value)}
              >
                <option value='0'>Please, select Category</option>
                {cats
                  ? cats.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))
                  : null}
              </select>
              <small className='form-text text-muted'>
                Select products Category here.
              </small>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-outline-secondary'
                onClick={() => setModalProduct(null)}
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-outline-primary'
                onClick={handleEdit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
