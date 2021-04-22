import './App.css';
import React from 'react'
import App from './App.js'
// import api from './api.js'
// import {useEffect, useState} from 'react';

import Home from './Home.jsx'

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
            <Route path="/:id" children={<App var={"1234"} />} />
          </Switch>
        </div>
      </Router>
    );
  }



  export default RoutePage;