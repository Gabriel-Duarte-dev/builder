import './App.css';
import React from 'react'
import App from './App.js'
import Home from './pages/Home.jsx'
<<<<<<< HEAD
import Settings from './pages/Settings.jsx'
=======
import Login from './pages/Login.jsx'
import Register from './pages/Register'
import Recover from './pages/Recover'

>>>>>>> 1218f44c9321eb5bfd3dccadf232f21f29dcafef
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
<<<<<<< HEAD
            <Route path="/bot/:id" children={<App var={"1234"} />} />
            <Route path="/rr" exact children={<Settings/>} />
            <Route path="/settings" exact children={<Settings/>} />
=======
            <Route path="/login" children={<Login/>} />
            <Route path="/recover" children={<Recover/>} />
            <Route path="/register" children={<Register/>} />
            <Route path="/confirm" children={<Confirm/>} />
            
            <Route path="/:id" children={<App var={"1234"} />} />            
>>>>>>> 1218f44c9321eb5bfd3dccadf232f21f29dcafef
          </Switch>
        </div>
      </Router>
    );
  }



  export default RoutePage;