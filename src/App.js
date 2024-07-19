import React, { useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPost';
import MyAds from './Pages/MyAds';
import { AuthContext, FirebaseContext } from './store/FirebaseContext';
import Post from './store/PostContext';
import Home from './Pages/Home';

function App() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setIsAuthenticated(user);
    });

    return () => unsubscribe();
  }, [firebase, setIsAuthenticated]);

  return (
    <Router>
      <div>
        <Post>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={isAuthenticated ? <Navigate to='/' /> : <Signup />} />
            <Route path='/login' element={isAuthenticated ? <Navigate to='/' /> : <Login />} />
            <Route path='/create' element={isAuthenticated ? <Create /> : <Navigate to='/' />} />
            <Route path='/viewPost' element={isAuthenticated ? <ViewPost /> : <Navigate to='/' />} />
            <Route path='/myAds' element={isAuthenticated ? <MyAds /> : <Navigate to='/' />} />
          </Routes>
        </Post>
      </div>
    </Router>
  );
}

export default App;
