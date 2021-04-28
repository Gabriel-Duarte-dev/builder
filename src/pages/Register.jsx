import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import Header from './Header.jsx';
import RoutePage from '../route.js';
import api from '../api';
import '../pages/Register.css';
import logo from '../imagens/logotexxia.png';
import desenho from '../imagens/image.svg';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

function Register() {
    return (
    <div className="principalregister">
      <p> Use artificial intelligence to your advantage </p>
      <div className="boximage"> 
        <img id="texxia" src={logo} />
        <img id="desenho" src={desenho} width={550} />
        
        <div className="registerbox">

        <Link to={'/Login'} style={{ textDecoration: 'none' }}>
          <p className="backoption"> <ArrowBackIosIcon 
             style={{position:'relative', top: '5px', left: '12px'}} 
             fontSize={'small'}/> Back  </p>
        </Link>


          <h1 id="text-login"> Create your account </h1>
          
          <input id="input1" placeholder="Email" type="text"/>
          <input id="input2" placeholder="Password" type="password"/>
          <input id="input3" placeholder="Confirm password" type="password"/>


          <Link to={'/Confirm'} style={{ textDecoration: 'none' }} className="confirmlink">
            Register
          </Link>
          
        </div>
      </div>
    </div>
    
    );
  }
  
  export default Register;
  