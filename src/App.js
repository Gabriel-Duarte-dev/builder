import './App.css';
import React from 'react';
import api from './api.js'
import Builder from './Builder.js'
import route from './route.js'
import Header from './pages/Header.jsx'
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
import CircularProgress from '@material-ui/core/CircularProgress';
import { purple } from '@material-ui/core/colors';

import texxia from './imagens/texxia.png'
// import loadingIcon from './imagens/loading.gif'
// import logo2 from './imagens/logo2.png'

function App(props) {
  
  let {id} = useParams();
  const [nomeBot, setNomeBot] = useState("");

  const [blocoID, setBlocoID] = useState("");

  const [blocos, setarBlocos] = useState([]);

  const [loading, setLoading] = useState(true);

  const [optionValue, setOptionValue] = useState([    
    "Boas vindas",    
    "O que gostaria de saber?",
    "Saudação-Nome",
    "Apresentação",
    "Não entendi simulação",
    "Simulação-Valores",
    "FGTS",
    "Entrada",
    "Fim Simulção",
    "Agradecimento",
    "Animal",
    "Condomíno",
    "Lazer",
    "Localização",
    "Erro padrão",
    "Contatos",
    "Visita",
    "Final Visita",
    "Escola",
    "Construção",
    "Incorporadora",
    "Segurança Bairro",
    "Entrega Obras",
    "Documentação Cliente",
    "Documentação Projeto",
    "Juros",
    "Agua-Luz-Gás",
    "Mais alguma coisa?",
    "Alagamento",
    "Tamanho Plantas",
    "Estoque",
    "Entorno",
    "Fim Chat",
    "Hospital",
    "Infraestrutura",
    "IPTU",
  ]);

  async function receber(){

    try{
      const response = await api.get('/api/bloco/'+id)
      const data = response.data
      setarBlocos(data)
      console.log(data)            

      await getBlocos()     
      setLoading(false) 

      // await setLoading(true)

    } catch (error) {
      console.log(error)
    }
  }

  const [modal, setModal] = useState(false);
  

  const salvarBloco = async () => {    

    setLoading(true)
    console.log("id:"+id)
    console.log("nomeBot:"+nomeBot)
    try {
      const response = await api.post('/api/bloco/register',{
        botSid: id,      
        nomeBloco: nomeBot
    })    
    receber()
    setLoading(false)
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

    option: {
      fontSize: '12px !important'      
    }
  }));

  const classes = useStyles();
  const [age, setAge] = React.useState('');

  async function getBlocos(){
    try {
      const response = await api.get('/api/bloco/'+id)
      const data = response.data

      const newArray = optionValue.filter(o1 => !data.some(o2 => o1 == o2.nomeBloco))
      setOptionValue(newArray)

    } catch (error) {
      console.log(error)
    }
  }

  // const arrayOptions =  [
  //   "Boas vindas", "O que gostaria de saber?", "Saudação-Nome", "Apresentação"
  // ]  
  
  return (

    <div className="App">    
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"></link>

     {
       loading?
       <div className="modal">
         <div className="loadingContent">
          {/* <img src={loadingIcon} className="loadingIcon"/> */}
          <CircularProgress style={{color: purple[800]}} />
         </div>
       </div>
       :
       console.log()
     }

      {
        modal?        
        <div className="modal">
          <div className="modalContent">
            <i onClick={()=>openModal()} className="fas fa-times"></i>
            <h3>Adicionar Bloco</h3>
            <FormControl variant="outlined">
            <InputLabel>Selecione o bloco</InputLabel>
              <Select onChange={(text)=>setNomeBot(text.target.value)} label="Selecione o bloco" className="namesBlocos">

              {
                optionValue.map((value, index) =>{
                  return(
                    <MenuItem className={classes.option} value={value} key={index}>{value}</MenuItem>
                  )
                })
              }
                
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

      <Header/>      

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
