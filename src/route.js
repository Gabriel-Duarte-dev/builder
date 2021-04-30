import './App.css';
import React from 'react'
import App from './App.js'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
<<<<<<< HEAD
import User from './pages/User.jsx'
=======
import Register from './pages/Register'
import Recover from './pages/Recover'
import Settings from './pages/Settings'

>>>>>>> 90b928bbbed5ee8df849dbb3f436108e1768a943
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
<<<<<<< HEAD
            <Route path="/user"   children={<User/>} />
            <Route path="/:id" children={<App var={"1234"} />} />            
=======
            <Route path="/recover" children={<Recover/>} />
            <Route path="/register" children={<Register/>} />
            <Route path="/confirm" children={<Confirm/>} />
            <Route path="/settings" children={<Settings/>} />
            
            <Route path="/bot/:id" children={<App var={"1234"} />} />            
>>>>>>> 90b928bbbed5ee8df849dbb3f436108e1768a943
          </Switch>
        </div>
      </Router>
    );
  }



  export default RoutePage;