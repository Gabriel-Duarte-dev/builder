import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Header from './Header.jsx';
import RoutePage from '../route.js';
import api from '../api';
import '../Styles/Recover.css'

function Recover() {
  return (
    <div className="pagerecover">
      <div className="recovery"> 
        <h1> Recover password</h1>
        <input placeholder="Your email" />

        <Link to={'/login'} className="LinkButton">
        RECOVERED
        </Link>


        <Link to={'/login'} className="Link">
            Back 
        </Link>


      </div>


    </div>
    
  );
}

export default Recover;
