import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Header from './Header.jsx';
import RoutePage from '../route.js';
import api from '../api';
import '../pages/Login.css';
import logo from '../imagens/logotexxia.png';
import desenho from '../imagens/image.svg';


function Login() {
    return (
        <div className="principallogin">
            <p> Use artificial intelligence to your advantage </p>
            <div className="loginboximage">
                <img id="texxia" src={logo}  />
                <img id="desenho" src={desenho} width={550} />

                <div className="loginbox">
                    <h1 id="text-login"> Login </h1>
                    <input id="input1" placeholder="Email" type="text" />
                    <input id="input2" placeholder="Password" type="password" />

                    <Link to={'/'} className="registerlink" className="buttonlogin">                 
                        Sign In              
                    </Link>


                    <h1 id="text">  Don't have an account?
                    
                        <Link to={'/register'} style={{ textDecoration: 'none' }}>
                            <span> Register  </span>
                        </Link>
                    </h1>

                    
                <Link to={'/recover'} style={{ textDecoration: 'none' }} className="forgotlink">
                      Forgot password 
                </Link>  

                </div>
            </div>
        </div>

    );
}
export default Login;