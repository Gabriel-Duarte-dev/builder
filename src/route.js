import './App.css';
import React from 'react'
import App from './App.js'
import Home from './pages/Home.jsx'
import Settings from './pages/Settings.jsx'
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
            <Route path="/bot/:id" children={<App var={"1234"} />} />
            <Route path="/rr" exact children={<Settings/>} />
            <Route path="/settings" exact children={<Settings/>} />
          </Switch>
        </div>
      </Router>
    );
  }



  export default RoutePage;