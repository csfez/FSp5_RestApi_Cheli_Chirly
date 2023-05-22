// import React, { useState } from "react";
// import Router from './Router';
import React,{useState,createContext, useEffect} from 'react'
import { useNavigate } from "react-router-dom";

import './App.css'



export default function SignIn(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [Islogged,setIsLoggedIn]=useState(false)
  const [items,setItems]=useState([])
  const navigate = useNavigate();


  useEffect(()=> {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then(response => response.json())
      .then(json => setItems(json))
  },[])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = items.find(
      (u) => u.username === username && 
      u.address.geo.lat.substring(u.address.geo.lat.length - 4) === password
    );
    if (user) {
      navigate(`/users/${user.id}`);
      props.setIsLoggedIn(true); 
      // props.setCurrentUser(user);
      localStorage.setItem("current user",JSON.stringify(user));


    } else {
        alert("Invalid username or password");
    }

  };


  return (
    
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input value={username} onChange={handleUsernameChange} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
   );
  
}
