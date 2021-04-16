import './App.css';
import App from './App.js'
// import api from './api.js'
// import {useEffect, useState} from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
    
  } from "react-router-dom";


  function RoutePage() {
    return (
      <Router>
        <div>                                
          <Switch>            
            <Route path="/:id" children={<App var={"1234"} />} />            
          </Switch>
        </div>
      </Router>
    );
  }



  export default RoutePage;