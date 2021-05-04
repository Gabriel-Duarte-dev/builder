import React, { useState, useEffect } from "react"
import {Link} from 'react-router-dom'
import Header from './Header.jsx'
import "../Styles/User.css"
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import api from '../api'


    const userInfo = {
        email:"dev@texxia.com.br",
        password:"Senh@123"
    }

 function User() {

    const [token,     setToken    ] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email,     setEmail    ] = useState("");
    const [lastName,  setLastName ] = useState("");
    const [endereco,  setEndereco ] = useState("");
    const [bairro,    setBairro   ] = useState("");
    const [cidade,    setCidade   ] = useState("");
    const [estado,    setEstado   ] = useState("");
    const [telefone,  setTelefone ] = useState("");
    const [cep,       setCep      ] = useState("");
    const [pais,      setPais     ] = useState("");
    

    

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
            setEmail      (data.email      === undefined ? "" : data.email);
            setFirstName  (data.firstName  === undefined ? "" : data.firstName);
            setLastName   (data.lastName   === undefined ? "" : data.lastName);
            setEndereco   (data.endereco   === undefined ? "" : data.endereco);
            setBairro     (data.bairro     === undefined ? "" : data.bairro);
            setCidade     (data.cidade     === undefined ? "" : data.cidade);
            setEstado     (data.estado     === undefined ? "" : data.estado) ;
            setTelefone   (data.telefone   === undefined ? "" : data.telefone); 
            setCep        (data.cep        === undefined ? "" : data.cep); 
            setPais       (data.pais       === undefined ? "" : data.pais);


            console.log(data)
        } catch (error) {
            console.log(error);
        }
    }

    async function enviar(){
        try {
            const body = {
                firstName : firstName,
                email     :email,
                lastName  :lastName,
                endereco  :endereco,
                bairro    :bairro,
                cidade    :cidade,
                estado    :estado,
                telefone  :telefone,
                cep       :cep,
                pais      :pais,
                               
            }
            alert("Informações atualizadas com sucesso!")
            
            const res = await api.put('/accounts/601d7273cee6ff327072bd74',body, token)
        } catch (error) {
            console.log(error)
            alert("Erro ao atualizar as informações")
        }
    }
    return (

     <div>   
         <Header></Header>
             



    <div className="fundo">   
     
      <React.Fragment>

          {/* Titulo da Div */}
        <Typography variant="h6" gutterBottom>
          Edit Profile 
        </Typography>
        
        {/* Conteiner que engloba todos os campos, se for adicionar um campo novo terá que ser dentro deste conteiner */}
        <Grid container spacing={4}>
            
          {/* Criação do campo "E-mail" */}
          <Grid item xs={12} sm={6}>
           <TextField
              disabled={true}
              required
              label="E-mail"
              id="email"
              name="email"
              fullWidth
              value={email}
              onChange={(textoEmail)=>setFirstName(textoEmail.target.value)}
            />
          </Grid>           

            {/* Criação do campo "Firs Name" */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="First name"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(textoNome)=>setFirstName(textoNome.target.value)}
              fullWidth
            />
          </Grid>

          {/* Criação do campo "Last Name" */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Last name"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(textoSobrenome)=>setLastName(textoSobrenome.target.value)}
              fullWidth
              
            />
          </Grid>      

          {/* Criação do campo "Address" */}
          <Grid item xs={12} sm={6}>
            <TextField 
            label="Address" 
            id="address" 
            name="address" 
            value={endereco}
            onChange={(texoEndereco)=>setEndereco(texoEndereco.target.value)}
            fullWidth
            />
          </Grid>   

          {/* Criação do campo "District" */}
          <Grid item xs={12} sm={6}>
            <TextField 
            label="District" 
            id="district" 
            name="district" 
            value={bairro}
            onChange={(textoBairro)=>setBairro(textoBairro.target.value)}
            fullWidth
            />
          </Grid>

          {/* Criação do campo "City" */}
          <Grid item xs={12} sm={6}>
            <TextField
            label="City"
            id="city"
            name="city"
            value={cidade}
            onChange={(textoCidade)=>setCidade(textoCidade.target.value)}
            fullWidth             
            />
          </Grid>

          

          {/* Criação do campo "State/Region" */}
          <Grid item xs={12} sm={6}>
            <TextField 
            label="State/Province" 
            id="state" 
            name="state" 
            value={estado}
            onChange={(textoEstado)=>setEstado(textoEstado.target.value)}
            fullWidth
            />
          </Grid>

          {/* Criação do campo "Zip/Postal Code" */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Postcode / ZIP"
              id="zip"
              name="zip"
              value={cep}
              onChange={(textoCep)=>setCep(textoCep.target.value)}
              fullWidth             
            />
          </Grid>

          {/* Criação do campo "Country" */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Country"
              id="country"
              name="country"
              value={pais}
              onChange={(textoPais)=>setPais(textoPais.target.value)}
              fullWidth
            />
          </Grid>

          {/* Criação do campo "Phone number" */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Phone number"
              id="phone"
              name="phone"
              value={telefone}
              onChange={(textoTelefone)=>setTelefone(textoTelefone.target.value)}
              fullWidth
                          
            />
          </Grid>

            {/* Botão "Update Profile" */}
          <button  className="botao" onClick={()=>enviar()} >Update Profile</button> 

        </Grid>
      </React.Fragment>
      </div> 
      </div>
      
    );
  }
 export default User;