import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Header from './Header.jsx';
import RoutePage from '../route.js';
import api from '../api';
import '../Styles/Confirm.css';
import logo from '../imagens/logotexxia.png';
import desenhoconfirm from '../imagens/desenhoconfirm.svg';

function Confirm() {
  return (
      <div className="imageconfirm">
        <img id="desenho" src={desenhoconfirm} />
        <img id="texxia" src={logo}  />

        <div className="confirmbox">
          <h1 id="text-login"> Perfect, you are now ready to activate your email account</h1>
        

          <Link to={'/Login'} style={{ textDecoration: 'none' }} className="confirmlink">
           Sign in  
          </Link>

        </div>
      </div>
    
    
  );
}

export default Confirm;
