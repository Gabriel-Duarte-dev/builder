import React, { useState, useEffect } from "react"
import {Link} from 'react-router-dom'
import route from '../route.js'
import Header from './Header.jsx'
import "./home.css"
import "../App.css"
import "../components/styles.css"
import api from '../api'
import '../components/Modal'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'

import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
// import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import { red } from '@material-ui/core/colors'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import BuildIcon from '@material-ui/icons/Build';
import TextField from '@material-ui/core/TextField';
// import MaskedInput from 'react-maskedinput'
// import InputMask from 'react-input-mask'

// import MaskedInput from 'react-text-mask';
// import PropTypes from 'prop-types';
// import FormControl from '@material-ui/core/FormControl';



// COMEÇOS DAS FUNÇÕES QUE TEM QUE SER DEFINIDAS ANTES

const useStyles = makeStyles((theme) => ({
paper: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: `translate(-50%, -50%)`,
    width: 500,    
    borderRadius: '5px',
    backgroundColor: theme.palette.background.paper,    
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: 'center'
  },
  
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },  
  // avatar: {
  //   backgroundColor: red[500],
  // },
  actions:{
    paddingLeft: '25px',
    paddingRight: '25px',
    paddingTop: '15px',
  },
  button: {    
    marginTop: '10px',  
    marginBottom: '5px',
    backgroundColor: 'rgb(255, 74, 74)',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'rgb(206, 5, 5) !important'
    }
  },
  button2: {    
    marginTop: '10px',  
    marginBottom: '5px',
    backgroundColor: '#006CFF',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0055C8 !important'
    }
  },
  modalTitle: {
    marginBottom: '40px'
  },
  inputNewBot: {
    padding: '20px 0',
    maxWidth: '300px',
    width: '100%'
  },
  modalButton: {
    margin: '40px 30px',    
  }
}));


// FIM DAS FUNÇÕES QUE TEM QUE SER DEFINIDAS ANTES

export default function PageHome() {

  const classes = useStyles();
  
  const [tasks, setTask] = useState([]);
  const [open, setOpen] = React.useState(false);    

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };  

  async function enviar() {
    const response_get = await api.post('/api/bot/register',
      {
      botName: botNome,
      botTelefone: botTelefone
    }
    )
    receber()
    setOpen(false);
  }

// FUNCTION PARA RECEBER DADOS DA API
async function receber() {
  const response_get = await api.get('/api/bot')
  const data = response_get.data
  setTask(data)
  console.log(data);
}

// USE EFFECT PARA RECEBER DADOS DA API

useEffect(() => {
  receber()
}, [])


// CÓDIGO QUE APARECE DENTRO DO MODEL APÓS ELE SER ABERTO PELA TAG <Modal>


const [botNome, setBotNome] = useState('');
const [botTelefone, setBotTelefone] = useState('');


  const body = (
    <div  className={classes.paper}>

      <h1 className={classes.modalTitle}>Criar Bot</h1>

      <form className="formNewBot">

        <TextField 
          className={classes.inputNewBot} 
          onChange={(texto) => setBotNome(texto.target.value)} 
          placeholder="Digite o nome do bot"/>
        <div></div>
        <TextField
        className={classes.inputNewBot} 
        onChange={(texto) => setBotTelefone(texto.target.value)} 
        placeholder="+55999999999"
        >
          {/* <InputMask mask="+55 999999999"></InputMask> */}
        </TextField>
        <div></div>
        <Button variant="contained" className={classes.modalButton} onClick={handleClose}> Fechar </Button>
        <Button variant="contained" className={classes.modalButton} onClick={enviar}> Enviar BOT  </Button>

      </form>
       
    </div>
  );

  //  RETURN DO CÓDIGO QUE SERVE PARA ABRIR O MODEL COM INFORMAÇÕES A SEREM PREENCHIDAS

  return (
    <div className="homeContent">
        <Header/>

       

        <Button
          variant="contained"        
          className="addBot"
          endIcon={<AddIcon />}        
          onClick={()=>handleOpen()}
        >
          Criar Bot
        </Button>

        <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description"
        >
        {body}
      </Modal>
      <div className="cardBots">
        <NewList tasks={tasks} refresh={receber} />
      </div>
    </div>
  );
}


function NewList(props) {
  const { tasks, refresh } = props;
  const classes = useStyles();
  const [modalDelete, setModalDelete] = useState(false)


  async function deleteBot(id) {
    try {
      const response = await api.delete('/api/bot/'+id)
      refresh()
      setModalDelete(false)
    } catch (error) {
      console.log(error)
    }
  }

  function openModal() {
    setModalDelete(!modalDelete);
  }

  return (
    <div className="cardBots">
      {tasks.map((task, index) => {
        console.log(task.id)
        return (
          <div className="cardBots-Content" key={index}>

            {
              modalDelete?
              <div className="modal">
                <div className="modalContent">
                  <i onClick={()=>openModal()} className="fas fa-times"></i>
                    <h1>Excluir Bot?</h1>

                    <ul>
                      <li onClick={()=>deleteBot(task.id)}>Confirmar</li>
                      <li onClick={()=>openModal()}>Cancelar</li>
                    </ul>
                    
                </div>
              </div>
              :
              console.log()
            }

            <Card className={classes.root}>
              <CardHeader 
                avatar={
                  <Avatar arial-label="recipe" className={classes.avatar} src="https://maishm.com.br/storage/news/novo-posicionamento-de-marca.png">
                    
                  </Avatar>
                }
                title={task.botName}
                subheader="subtitulo">
              </CardHeader>
              
              <CardMedia 
                className={classes.media}
                image="https://s2.glbimg.com/p4SHGxODVxBqHe8emRleBrUJxQs=/0x0:1600x900/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2020/J/p/aA9AQlTEqlPNP0AwNwAA/foto-01-materia.jpg"
                title="imagem">
              </CardMedia>

              <CardActions className={classes.actions}>
                
                <Button
                  variant="contained"        
                  className={classes.button}
                  startIcon={<DeleteForeverIcon />}
                  onClick={()=>{openModal()}}
                >
                  Excluir
                </Button>

                <Link to={`/${task.botSid}`} style={{ textDecoration:'none'}}>
                  <Button
                    variant="contained"        
                    className={classes.button2}
                    startIcon={<BuildIcon />}
                    
                  >
                    Builder
                  </Button> 
                </Link>

              </CardActions>

            </Card>

            {/* <Link to="/b3f1a897"><h2> {task.botName} </h2></Link> */}
          </div>
        );
      })}
    </div>
  );
}