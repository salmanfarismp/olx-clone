import React, { useContext, useEffect } from 'react';
import './App.css';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost'
import { BrowserRouter, Route } from 'react-router-dom';
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import { AuthContext, FirebaseContext } from './store/Context';
import Post from './store/PostContext';

function App() {
  const {user,setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user);
    })
  })
  return (
    <div>
      <Post>
      <BrowserRouter>
        <Route path='/signup' >
          <Signup/>
        </Route>
        <Route exact path='/' >
          <Home />
        </Route>
        <Route  path='/create' >
          <Create />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/view'>
          <ViewPost />
        </Route>
      </BrowserRouter>
      </Post>
    </div>
    
    
  );
}

export default App;
