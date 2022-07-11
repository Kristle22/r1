import { useState } from 'react';
import { useContext } from 'react';
import FrontContext from './FrontContext';

function SortFilter() {
  const { dispachProducts, cats } = useContext(FrontContext);

  const [sort, setSort] = useState('default');
  const [cat, setCat] = useState(0);

  const sorting = (e) => {
    setSort(e.target.value);
    const action = {
      type: e.target.value,
    };
    dispachProducts(action);
  };

  return (
    <div className='card mt-4'>
      <div className='card-header'>
        <h2>Sort and Filter</h2>
      </div>
      <div className='card-body'>
        <div className='container'>
          <div className='row'>
            <div className='col-4'>
              <div className='form-group'>
                <label>Sort By</label>
                <select
                  className='form-control'
                  value={sort}
                  onChange={sorting}
                >
                  <option value='default'>Default Sort</option>
                  <option value='ascTitle'>A-Z Title</option>
                  <option value='descTitle'>Z-A Title</option>
                  <option value='ascPrice'>min-max Price</option>
                  <option value='descPrice'>max-min Price</option>
                </select>
                <small className='form-text text-muted'>
                  Select sorting order here.
                </small>
              </div>
            </div>
            <div className='col-4'>
              <div className='form-group'>
                <label>Filter By Categories</label>
                <select
                  className='form-control'
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                >
                  <option value='0'>All Categories</option>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortFilter;
