import React, { useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPost';
import { AuthContext, FirebaseContext } from './store/FirebaseContext';
import Post from './store/PostContext';
import MyAds from './Pages/MyAds';


/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';

function App() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsAuthenticated(user)
    })
  })

  return (
    <Router>
      <div>
        <Post>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create' element={<Create />} />
            <Route path='/viewPost' element={<ViewPost />} />
            <Route path='/myAds' element={<MyAds />} />

          </Routes>
        </Post>
      </div>
    </Router>

  );
}

export default App;
