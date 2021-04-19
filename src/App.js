import './App.css';
import React from 'react';
import api from './api.js'
import Builder from './Builder.js'
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddIcon from '@material-ui/icons/Add';

import texxia from './imagens/texxia.png'
import { red } from '@material-ui/core/colors';

function App(props) {
  
  let {id} = useParams();
  const [nomeBot, setNomeBot] = useState("");

  const [blocoID, setBlocoID] = useState("");

  const [blocos, setarBlocos] = useState([]);

  async function receber(){

    try{
      const response = await api.get('/api/bloco/'+id)
      const data = response.data
      setarBlocos(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const [modal, setModal] = useState(false);  

  const [builder, setBuilder] = useState(false);   

  const salvarBloco = async () => {    

    console.log("id:"+id)
    console.log("nomeBot:"+nomeBot)
    try {
      const response = await api.post('/api/bloco/register',{
        botSid: id,      
        nomeBloco: nomeBot
    })    
    receber()    
    console.log(response);
    } catch (error) {
      console.log(error)
    }    
        

    // setarBlocos([
    //   ...blocos,
    //   {
    //     id: new Date().getTime(),
    //     bloco: bloco.value,
    //     add: true
    //   }
    // ]);

    setModal(false);    

  }

  const openModal = () => {
    setModal(!modal);
  }

  const openBuilder = (id) => {
    // setBuilder(!builder);

    setBlocoID(id)        
  }  

  useEffect(() => {
    receber()
  },[])

  const useStyles = makeStyles((theme) => ({

    button: {      
      marginTop: '30px',  
      marginBottom: '30px',
      width: '80%',
      height: '45px',
      background: '#8722c5',      
      color: '#fff',
      '&:hover': {
        background: '#6a1b9a'
      }
    },

    // button2: {   
    //   display: 'inline-block',   
    //   marginTop: '30px',  
    //   marginBottom: '30px',
    //   width: '150px',
    //   height: '40px',
    //   background: '#8722c5',      
    //   color: '#fff',
    //   '&:hover': {
    //     background: '#6a1b9a'
    //   }
    // },
    
    selectEmpty: {
      marginTop: theme.spacing(2),
    }
  }));

  const classes = useStyles();
  const [age, setAge] = React.useState('');
  
  return (
    
    <div className="App">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"></link>

      {
        modal?
        <div className="modal">          
          <div className="modalContent">
            <i onClick={()=>openModal()} className="fas fa-times"></i>
            <h3>Adicionar Bloco</h3>
            <FormControl variant="outlined">
            <InputLabel>Selecione o bloco</InputLabel>
              <Select onChange={(text)=>setNomeBot(text.target.value)} label="Selecione o bloco" className="namesBlocos">
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Inicio">Inicio</MenuItem>
                <MenuItem value="Boas vindas">Boas vindas</MenuItem>
                <MenuItem value="Cidade">Cidade</MenuItem>
                <MenuItem value="E-mail">E-mail</MenuItem>
                <MenuItem value="O que gostaria de saber?">O que gostaria de saber?</MenuItem>
                <MenuItem value="Saudação-Nome">Saudação-Nome</MenuItem>
                <MenuItem value="Apresentação">Apresentação</MenuItem>
                <MenuItem value="Não entendi simulação">Não entendi simulação</MenuItem>
                <MenuItem value="Simulação-Valores">Simulação-Valores</MenuItem>
                <MenuItem value="FGTS">FGTS</MenuItem>
                <MenuItem value="Entrada">Entrada</MenuItem>
                <MenuItem value="Fim Simulção">Fim Simulção</MenuItem>
                <MenuItem value="Agradecimento">Agradecimento</MenuItem>
                <MenuItem value="Animal">Animal</MenuItem>
                <MenuItem value="Condomíno">Condomíno</MenuItem>
                <MenuItem value="Lazer">Lazer</MenuItem>
                <MenuItem value="Localização">Localização</MenuItem>
                <MenuItem value="Erro padrão">Erro padrão</MenuItem>
                <MenuItem value="Contatos">Contatos</MenuItem>
                <MenuItem value="Visita">Visita</MenuItem>
                <MenuItem value="Final Visita">Final Visita</MenuItem>
                <MenuItem value="Escola">Escola</MenuItem>
                <MenuItem value="Construção">Construção</MenuItem>
                <MenuItem value="Incorporadora">Incorporadora</MenuItem>
                <MenuItem value="Segurança Bairro">Segurança Bairro</MenuItem>
                <MenuItem value="Entrega Obras">Entrega Obras</MenuItem>
                <MenuItem value="Documentação Cliente">Documentação Cliente</MenuItem>
                <MenuItem value="Documentação Projeto">Documentação Projeto</MenuItem>
                <MenuItem value="Juros">Juros</MenuItem>
                <MenuItem value="Agua-Luz-Gás">Agua-Luz-Gás</MenuItem>
                <MenuItem value="Mais alguma coisa?">Mais alguma coisa?</MenuItem>
              </Select>
            </FormControl>           
            {/* <h6 onClick={()=>salvarBloco()}>Adicionar</h6> */}
            <Button
              variant="contained"        
              className="addBlocoModal"              
              endIcon={<AddIcon />}        
              onClick={()=>salvarBloco()}
            >
              Adicionar
            </Button>           
          </div>
        </div>
        :
        <div></div>
      }      

       <header>
         <h1>Logo</h1>
         <ul>
           <li>botao</li>
           <li>botao</li>
           <li>botao</li>
           <li>botao</li>
         </ul>
       </header>

       <div className="blocos">         
         {/* <h3 onClick={()=>openModal()}>Add Bloco +</h3> */}
         <Button
        variant="contained"        
        className="addBloco"
        className={classes.button}
        endIcon={<AddCircleOutlineIcon />}        
        onClick={()=>openModal()}
      >
        Add Bloco
      </Button>
         {           
           blocos.map((val, index) => {
            return(

              <p key={index} onClick={()=>openBuilder(val.id)}>{val.nomeBloco}</p>              
            )           
           })
         }
       </div>
         
         <div className="builder">
           <div className="builderContent">
             {
               blocoID == ""?
               <div className="initPage">
                 <h2>Bem vindo ao Builder</h2>                           
                 <div className="texxia">
                  <img src={texxia} />
                 </div>
               </div>
               :
               
                <Builder blocoID={blocoID} />               
             }
            
           </div>
         </div>
    </div>
  );
}

export default App;
