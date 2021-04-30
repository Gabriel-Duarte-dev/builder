import './App.css';
import React from 'react'
import App from './App.js'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import User from './pages/User.jsx'
// import api from './api.js'
// import {useEffect, useState} from 'react';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    
    
  } from "react-router-dom";


  function RoutePage() {
    return (
      <Router>
        <div>                                
          <Switch>
            <Route path="/" exact children={<Home/>} />
            <Route path="/login" children={<Login/>} />
            <Route path="/user"   children={<User/>} />
            <Route path="/:id" children={<App var={"1234"} />} />            
          </Switch>
        </div>
      </Router>
    );
  }



  export default RoutePage;