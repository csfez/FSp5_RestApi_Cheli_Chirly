// import React,{useState,useEffect} from 'react'
// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import Layout from "./pages";
// // import Home from "./home";

// export default function App(){
// //   const [resourceType,setResourceType]= useState('posts')
//   const [items,setItems]=useState([])
//   const currentUser=JSON.parse(localStorage.getItem("current user"));

//   useEffect(()=> {
//     fetch(`https://jsonplaceholder.typicode.com/posts`)
//       .then(response => response.json())
//       .then(json => setItems(json))
//   },[])

//   const filteredItems = items.filter(item => {
//     return item.userId === currentUser.id;
//   });

//   return(
//     <>
//       <h1>Posts</h1>
//       {filteredItems.map(item => {
//         return <pre>{JSON.stringify(item.title)}</pre>
//       })}
//     </>
//   )
// }

// import React, { useState, useEffect } from 'react';
// import { Link, Outlet, useParams, useNavigate } from "react-router-dom";

// import './App.css'

// export default function App() {
//   const [items, setItems] = useState([]);
//   const [selectedItem, setSelectedItem] = useState([]);
//   const [selectedItemComments, setSelectedItemComments] = useState(null);
//   const currentUser = JSON.parse(localStorage.getItem("current user"));
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [loadedPosts, setLoadedPosts] = useState(10); // Nombre d'éléments déjà chargés
//   const postsPerPage = 5; // Nombre d'éléments à afficher par page

//   useEffect(() => {
//     fetch(`https://jsonplaceholder.typicode.com/posts?_start=0&_limit=${loadedPosts}`)
//       .then(response => response.json())
//       .then((data) => {
//         const list = data.filter((item) => item.userId === currentUser.id);
//         setItems(list);
//       })
//   }, [loadedPosts]);

//   const filteredItems = items.filter(item => {
//     return item.userId === currentUser.id;
//   });

//   const handleClick = (item) => {
//     if (selectedItem === item) {
//       setSelectedItem('');
//     } else {
//       setSelectedItem(item);
//     }
//   }

//   const handleClickComments = (item) => {
//     if (selectedItemComments === item) {
//       setSelectedItemComments(null);
//       navigate(`/users/${item.userId}/posts`);
//     } else {
//       setSelectedItemComments(item);
//       navigate(`/users/${item.userId}/posts/${item.id}/comments`);
//     }
//   };

//   const handleLoadMore = () => {
//     setLoadedPosts(prevLoadedPosts => prevLoadedPosts + postsPerPage);
//   };

//   return (
//     <>
//       <h1>Posts</h1>
//       {items.map(item => {
//         return (
//           <div key={item.id} className={selectedItem === item ? 'selected' : ''}>
//             <div className="post-title" onClick={() => handleClick(item)}>
//               <pre>{JSON.stringify(item.title)}</pre>
//               <pre>{JSON.stringify(item.body)}</pre>
//             </div>
//             <button onClick={() => handleClickComments(item)}>Comments</button>
//             {item === selectedItemComments ? <Outlet /> : null}
//           </div>
//         );
//       })}
//       {items.length < loadedPosts && (
//         <button onClick={handleLoadMore}>Load More</button>
//       )}
//     </>
//   );
// }


import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";

import './App.css'

export default function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedItemComments, setSelectedItemComments] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("current user"));
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${currentUser.id}`)
      .then(response => response.json())
      .then(json => setItems(json))
  }, []);

  const handleClick = (item) => {
    if (selectedItem === item) {
      setSelectedItem('');
    } else {
      setSelectedItem(item);
    }
  };

  const handleClickComments = (item) => {
    if (selectedItemComments === item) {
      setSelectedItemComments(null);
      navigate(`/users/${item.userId}/posts`);
    } else {
      setSelectedItemComments(item);
      navigate(`/users/${item.userId}/posts/${item.id}/comments`);
    }
  };

  return (
    <>
      <h2>Posts</h2>
      {items.map(item => (
        <div className='post' key={item.id}>
          <div className={selectedItem === item ? 'selected' : ''}>
            <div className="post-title" onClick={() => handleClick(item)}>
              <strong>{item.title}</strong> <br /> <br />
              <span>{item.body}</span>
            </div>
          </div>

          <button className='post-buttons' onClick={() => handleClickComments(item)}>Comments</button>
          {item === selectedItemComments ? <Outlet /> : null}
        </div>
      ))}
    </>
  );
}
