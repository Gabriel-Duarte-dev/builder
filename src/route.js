import './App.css';
import React from 'react'
import App from './App.js'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
<<<<<<< HEAD
import Register from './pages/Register'
import Recover from './pages/Recover'
import Settings from './pages/Settings'
import User from './pages/User'

=======
import User from './pages/User.jsx'
import Register from './pages/Register'
import Recover from './pages/Recover'
import Settings from './pages/Settings'
>>>>>>> 871e90cbd993c01536c8732b713ea0a9c010b211
// import api from './api.js'
// import {useEffect, useState} from 'react';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    
    
  } from "react-router-dom";
  
import Confirm from './pages/Confirm';


  function RoutePage() {
    return (
      <Router>
        <div>                                
          <Switch>
            <Route path="/" exact children={<Home/>} />
            <Route path="/login" children={<Login/>} />
            <Route path="/recover" children={<Recover/>} />
            <Route path="/register" children={<Register/>} />
            <Route path="/confirm" children={<Confirm/>} />
            <Route path="/settings" children={<Settings/>} />
<<<<<<< HEAD
            <Route path="/user" children={<User/>} />
=======
            <Route path="/user"   children={<User/>} />
>>>>>>> 871e90cbd993c01536c8732b713ea0a9c010b211
            
            <Route path="/bot/:id" children={<App var={"1234"} />} />            
          </Switch>
        </div>
      </Router>
    );
  }



  export default RoutePage;