import React from 'react'
import '../App.css';
import {Link} from 'react-router-dom'


import logo from '../imagens/logo.png'


function Header(props){


    return(

        <header>
            <div className="box-logo">
                <Link to="/" style={{ textDecoration:'none', border: 0}}><img className="logo" src={logo} /></Link>
            </div>        
            <ul>
                <li>Usuário</li>
                <li>Template</li>
                <li>Intenções</li>
                <Link to="/settings" style={{ textDecoration:'none', border: 0}}><li>Settings</li></Link>
            </ul>
       </header>
    )
}


export default Header;