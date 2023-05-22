import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";

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
      <h1>Info</h1>
      {filteredItems.map(item => {
        return (
          <React.Fragment key={item.id}>
            <strong>name:</strong> {item.name}<br />
            <strong>username:</strong>{item.username}<br />
            <strong>email:</strong>{item.email}<br />
            <strong>address:</strong><br />
            <strong>street:</strong>{item.address.street}<br />
            <strong>suite:</strong>{item.address.suite}<br />
            <strong>city:</strong>{item.address.city}<br />
            <strong>zipcode:</strong>{item.address.zipcode}<br />
            <strong>geo lalitude:</strong>{item.address.geo.lat}<br />
            <strong>geo longitude:</strong>{item.address.geo.lng}<br />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Info;