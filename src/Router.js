// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import React,{createContext} from 'react'
import React,{useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route, useNavigate,Navigate  } from "react-router-dom";
import {useParams } from "react-router-dom";

import Layers from "./Layers";
// import LayersSignIn from "./LayerSignIn";
// import Home from "./pages/users";
// import Users from "./Layers";
import Posts from './posts';
import Todos from './todos';
import Albums from './albums';
import Info from './info';
import NoPage from "./pages/NoPage";
import SignIn from "./signIn";
import Comments from "./comments"


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [items,setItems]=useState([])
  const [resourceType,setResourceType]= useState('')

  useEffect(()=> {
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
      .then(response => response.json())
      .then(json => setItems(json))
  },[resourceType])

  return (
    <BrowserRouter>
      <Routes>
        {/* Ajouter une redirection depuis la racine vers la page de connexion */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<SignIn setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="users/:id/" element={<Layers/>}>
            <Route path="info" element={<Info />} />
            <Route path="todos" onClick={()=>setResourceType('todos')} element={<Todos items={items}/>} />
            <Route path="posts" onClick={()=>setResourceType('posts')} element={<Posts  items={items}/>} />
            <Route path="posts/:postid/" element={<Posts />} >
              <Route path="comments" element={<Comments items={items}/>} />
            </Route>
            <Route path="albums" onClick={()=>setResourceType('albums')} element={<Albums  items={items}/>} />
            <Route path="info" element={<Info  items={items}/>} />
            <Route path="*" element={<NoPage />} />
         </Route>
        
      </Routes>
    </BrowserRouter>
  );
}
