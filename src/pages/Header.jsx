import React from 'react'
import '../App.css';


import logo from '../imagens/logo.png'


function Header(props){


    return(

        <header>
            <div className="box-logo">
                <img className="logo" src={logo} />
            </div>        
            <ul>
                <li>Usuário</li>
                <li>Template</li>
                <li>Intenções</li>
                <li>Integração</li>
            </ul>
       </header>
    )
}


export default Header;