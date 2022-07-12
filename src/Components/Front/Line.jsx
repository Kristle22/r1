import { useContext } from 'react';
import FrontContext from './FrontContext';

function Line({ line }) {
  const { filtering } = useContext(FrontContext);

  return (
    <li className='list-group-item'>
      <div className='item'>
        <div className='content'>
          <div style={{ width: '25%', margin: '10px' }}>
            {line.photo ? (
              <div className='photo-bin'>
                <img src={line.photo} alt={line.title} />
              </div>
            ) : null}
          </div>
          <b>{line.title}</b>
          <b>{line.price.toFixed(2)} Eur.</b>
          <div
            className='box'
            style={{ backgroundColor: line.in_stock ? 'coral' : null }}
          ></div>
          <span>{new Date(Date.parse(line.lu)).toLocaleString()}</span>
          <div className='cat' onClick={() => filtering(line.cid)}>
            {line.cat}
          </div>
        </div>
      </div>
    </li>
  );
}

export default Line;
