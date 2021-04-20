import './App.css';
import './components/styles.css';
import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import List from "./components/List";
import api from './api';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import CheckIcon from '@material-ui/icons/Check';
import { green } from '@material-ui/core/colors';

import {useParams} from 'react-router-dom'


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },

  button: {
    marginRight: '30px',
    marginTop: '10px',  
    marginBottom: '5px',
    backgroundColor: 'rgb(255, 74, 74)',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'rgb(206, 5, 5) !important'
    }
  }
}));



export default function Builder(props) {
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  // const handleClick = () => {
    
  // };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  // const handleClickDelete = () => {
    
  // };

  const handleCloseDelete = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenDelete(false);
  };

    // console.log(props.blocoID)  
    
  let {id} = useParams();

  const [send, setSend] = useState();

  const [tasks, setTask] = useState([]);

  const [nomeBloco, setNomeBloco] = useState("");

  const [botName, setBotName] = useState("");    

  const [modalDelete, setModalDelete] = useState(false);

  const openModal = () => {
    setModalDelete(!modalDelete);
  }

  const addTask = task => {
    setTask([...tasks, task]);
    console.log(tasks)
  };

  const deleteTask = index => {
    let newTasks = [...tasks];
    newTasks.splice(index, 1)
    

    setTask(newTasks)

  };

  const editTask = (index,event) => {
    let newTasks = [...tasks];
    newTasks.splice(index , 1, event.target.value)
    
    setTask(newTasks)

  }
   async function enviar() {
    const response_get = await api.get('/api/bloco/'+props.blocoID)        
    const data = response_get.data
    const dados = {
      nomeBloco: data.nomeBoloco,
      mensagem: tasks      
  
    
  } 
  console.log(dados);
    const response = await api.patch('/api/bloco/'+props.blocoID, 
    dados
    );

  //  alert('Conversa Salva!');
  setOpen(true);

    console.log(response);

  } 

  async function receber() {
      try {
        const response = await api.get('/api/bloco/'+props.blocoID);
        const response2 = await api.get('/api/bot/'+id);

        const data = response.data             
        
        setTask(data.mensagem)
        setNomeBloco(data.nomeBloco)        
        console.log(data);
        
        const nameBot = response2.data

        setBotName(nameBot.botName)
        console.log(nameBot)
        console.log(response2.status)
    
      } catch (error) {
          console.log(error)
      }    
  }   

  // async function getNameBot() {
  //   try {
  //     const response = await api.get('/api/bot/'+botID);

  //     const nameBot = response.data

  //     // setBotName(nameBot)      
  //     console.log(nameBot)
      
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  async function deleteBloco() {
    try {      
      const response = await api.delete('/api/bloco/'+props.blocoID);      
      // const data = response.data.mensagem
      // setTask(data)
      // console.log(data);
      console.log(response)      
      openDelete ? setModalDelete(!modalDelete) : setOpenDelete(true); setModalDelete(!modalDelete)      
      setTimeout(function() {
        window.location.reload();
      }, 1000)
      
  
    } catch (error) {
        console.log(error)
    }
}

  useEffect(() => {
    receber()
  },[])

    useEffect(() => {
    receber()
    },[props.blocoID])

  return (
    <div className="wrap">

      {
        modalDelete?
        <div className="modal">
          <div className="modalContent">
            <i onClick={()=>openModal()} className="fas fa-times"></i>
              <h1>Excluir Bloco?</h1>

              <ul>
                <li onClick={()=>deleteBloco()}>Confirmar</li>                  
                <li onClick={()=>openModal()}>Cancelar</li>
              </ul>
              
          </div>
        </div>
        :
        console.log()
      }
      
      <div className="titleBloco">
        <h2><i class="fas fa-tag"></i> <span className="botName">{botName}</span> - {nomeBloco}</h2>
        {/* <span onClick={()=>openModal()}><i class="fas fa-trash"></i>Excluir Bloco</span> */}
        <Button
        variant="contained"        
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={()=>openModal()}
      >
        Excluir
      </Button>
      </div>      
        <div className="msgs">                  

            <Form onSave={addTask} />
            <div className="listMsg">
              <List tasks={tasks} deleteTask={deleteTask} editTask={editTask} /> 
            </div>    

            <div className="saveMsg">
              <h2 className="botaoenviar"
              onClick = {() => enviar()} >
              <CheckIcon className="saved" color="primary" style={{ fontSize: 50, color: green[500], cursor: 'pointer' }} />
              </h2>
              <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                  Mensagem salva!
                </Alert>
              </Snackbar>
            </div>        

          </div>
          <Snackbar open={openDelete} autoHideDuration={1000} onClose={handleCloseDelete}>
            <Alert onClose={handleCloseDelete} severity="error">
              Bloco excluido!
            </Alert>
          </Snackbar>
    </div>
    
  );
}