import React, { useState, useEffect } from 'react';
import { useParams ,useLocation} from "react-router-dom";
import './App.css'

const Info = () => {

  const [items, setItems] = useState([]);
  const { id, postid } = useParams();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then(response => response.json())
      .then(json => setItems(json))
  }, []);

  const filteredItems = items.filter(item => {
    return item.id === parseInt(id);
  });

    return (
      <>
        <h2>Info</h2>
        {filteredItems.map(item => {
          return (
          <>
            {/* <strong>name:</strong> {item.name}<br/>
            <strong>username:</strong>{item.username}<br/>
            <strong>email:</strong>{item.email}<br/>
            <strong>address:</strong><br/>
            <strong>street:</strong>{item.address.street}<br/>
            <strong>suite:</strong>{item.address.suite}<br/>
            <strong>city:</strong>{item.address.city}<br/>
            <strong>zipcode:</strong>{item.address.zipcode}<br/>
            <strong>geo lalitude:</strong>{item.address.geo.lat}<br/>
            <strong>geo longitude:</strong>{item.address.geo.lng}<br/> */}
            <div className='info'>
          <div className="info-item">
            <span className="info-label">name:</span>
            <span className="info-value">{item.name}</span>
          </div>
          <div className="info-item">
            <span className="info-label">username:</span>
            <span className="info-value">{item.username}</span>
          </div>
          <div className="info-item">
            <span className="info-label">email:</span>
            <span className="info-value">{item.email}</span>
          </div>
          <div className="address">
            <span className="address-label">address:</span>
            <div className="address-value">
              <div>
                <span className="info-label">street:</span>
                <span className="info-value">{item.address.street}</span>
              </div>
              <div>
                <span className="info-label">suite:</span>
                <span className="info-value">{item.address.suite}</span>
              </div>
              <div>
                <span className="info-label">city:</span>
                <span className="info-value">{item.address.city}</span>
              </div>
              <div>
                <span className="info-label">zipcode:</span>
                <span className="info-value">{item.address.zipcode}</span>
              </div>


              <div>
                <span className="info-label">geo lalitude:</span>
                <span className="info-value">{item.address.geo.lat}</span>
              </div>
              <div>
                <span className="info-label">geo longitude:</span>
                <span className="info-value">{item.address.geo.lng}</span>
              </div>
              </div>
            </div>
            </div>
          </>)
        })}
      </>
    );
  };
  
  export default Info;