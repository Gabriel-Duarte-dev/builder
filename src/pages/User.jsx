import React, { useState, useEffect } from "react"
import {Link} from 'react-router-dom'
import Header from './Header.jsx'
import "./User.css"
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import api from '../api'


    const userInfo = {
        email:"dev@texxia.com.br",
        password:"Senh@123"
    }

 function User() {

    const [token, setToken] = useState("");
    const [firstName, setFirstName] = useState("");

    useEffect(()=>{
        receber()
        
    },[])

    async function receber(){
       //APAGAR DEPOIS
        const res_auth = await api.post('/accounts/authenticate',userInfo)
        const token = res_auth.data.jwtToken
        
        const config = {

            headers: { Authorization: `Bearer ${token}` }
        };
        setToken(config)
        try {
            const response = await api.get('/accounts/601d7273cee6ff327072bd74', config)
            const data = response.data
            setFirstName(data.firstName)
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

    async function enviar(){
        try {
            const body = {
                firstName:firstName
            }
            const res = await api.put('/accounts/601d7273cee6ff327072bd74',body, token)
        } catch (error) {
            console.log(error)
        }
    }
    return (

     <div>   
         <Header></Header>
             

    <div className="fundo">   
      <React.Fragment>

          {/* //Titulo da Div */}
        <Typography variant="h6" gutterBottom>
          Edit Profile
        </Typography>

        {/* Conteiner que engloba todos os campos, se for adicionar um campo novo terá que ser dentro deste conteiner */}
        <Grid container spacing={3}>
            
            {/* Criação do campo "Firs Name" */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(aa)=>setFirstName(aa.target.value)}
            />
          </Grid>

          {/* Criação do campo "Last Name" */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              
            />
          </Grid>

          {/* Criação do campo "E-mail" */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              
            />
          </Grid>

          {/* Criação do campo "Phone number" */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phone"
              name="phone"
                          
            />
          </Grid>

          {/* Criação do campo "City" */}
          <Grid item xs={12} sm={6}>
            <TextField
              id="city"
              name="city"
              
            />
          </Grid>

          {/* Criação do campo "State/Region" */}
          <Grid item xs={12} sm={6}>
            <TextField id="state" name="state" />
          </Grid>

          {/* Criação do campo "Zip/Postal Code" */}
          <Grid item xs={12} sm={6}>
            <TextField
              id="zip"
              name="zip"
              
            />
          </Grid>

          {/* Criação do campo "Country" */}
          <Grid item xs={12} sm={6}>
            <TextField
              id="country"
              name="country"
              
            />
          </Grid>

            {/* Botão "Update Profile" */}
          <button className="botao" onClick={()=>enviar()} >Update Profile</button> 

        </Grid>
      </React.Fragment>
      </div> 
      </div>
    );
  }
 export default User;