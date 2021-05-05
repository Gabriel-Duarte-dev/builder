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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Icon from '@material-ui/core/Icon';
import CheckIcon from '@material-ui/icons/Check';
import { green, purple } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

import {useParams} from 'react-router-dom'
import loadingIcon from './imagens/loading.gif'
import iconModal from './imagens/iconModal.png'


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
    fontWeight: 500
  },
  confirmButton: {
    marginTop: '110px',  
    
    marginRight: '30px',
    backgroundColor: '#44bd32',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#00b330 !important'
    },
  },
  cancelBtton: {    
    marginTop: '110px',  
    
    marginLeft: '40px',
    backgroundColor: 'rgb(255, 74, 74)',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'rgb(206, 5, 5) !important'
    },
  }
}));

export default function Builder(props) {
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  // const handleClick = () => {
  //   setOpen(true)
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

  // const [send, setSend] = useState();

  const [tasks, setTask] = useState([]);
  const [nomeBloco, setNomeBloco] = useState("");
  const [botName, setBotName] = useState("");    
  const [modalDelete, setModalDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalTimeout, setModalTimeout] = useState(false)
  const [btnTimeOut, setBtnTimeOut] = useState(false)
  const [timeOut, setTimeOut] = useState('')

  const openModal = () => {
    setModalDelete(!modalDelete);
  }

  const openModalTimeout = () => {
    setModalTimeout(!modalTimeout)
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
  setOpen(true)

    console.log(response);

  } 

  async function receber() {
    setLoading(true)
      try {
        const response = await api.get('/api/bloco/'+props.blocoID);
        const response2 = await api.get('/api/bot/'+id);

        const data = response.data             
        
        setTask(data.mensagem)
        setBtnTimeOut(data.blocoTimeout)
        setTimeOut(data.valueTimeout)
        setNomeBloco(data.nomeBloco)        
        console.log(data);
        
        const nameBot = response2.data

        setBotName(nameBot.botName)
        console.log(nameBot)
        console.log(response2.status)
        
        setLoading(false)
    
      } catch (error) {
          console.log(error)          
      }    
  }   

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

async function sendBlocoTimeout() {
  try {
    const response_get = await api.get('/api/bloco/'+props.blocoID)        
    const data = response_get.data
    const dados = {
      nomeBloco: data.nomeBoloco,
      mensagem: tasks,
      blocoTimeout: btnTimeOut,
      valueTimeout: timeOut
  } 

    const response = await api.patch('/api/bloco/'+props.blocoID, dados);
  
    openModalTimeout()
  } catch (error) {
    console.log(error)
  }
  
}

// function teste (){

//   alert('teste')
// }

  useEffect(() => {
    receber()
  },[])

    useEffect(() => {
    receber()
    },[props.blocoID])

  return (
    <div className="wrap">

      {
        loading?
        <div className="modal">
          <div className="loadingContent">
            {/* <CircularProgress style={{color: purple[800]}} /> */}
            <img src={loadingIcon} className="loadingIcon"/>
          </div>
        </div>
        :
        console.log()
      }

      {
        modalTimeout?
        <div className="modal">
          <div className="modalContent">
            <i onClick={()=>openModalTimeout()}  className="fas fa-times"></i>
              
              <div className="modalHeader">
                <img src={iconModal} className="icon" />
                <h1>Limit time</h1>
              </div>

              <FormControlLabel 
                control={<Switch checked={btnTimeOut} onClick={()=>setBtnTimeOut(!btnTimeOut)} />}
                label="Bloc timeout" style={{color: 'rgb(148, 148, 148)'}} />
                <div></div>
              <TextField
                type="number"
                placeholder={btnTimeOut ? 'time in minutes' : ''}
                disabled={!btnTimeOut}
                className="editBotModalTimeout"
                onChange={(e)=>setTimeOut(e.target.value)} />
                <div></div>
              <Button
                variant="contained"        
                className={classes.confirmButton}                      
                onClick={()=>sendBlocoTimeout()}
              >
                Confirm
              </Button>

              <Button
                variant="contained"        
                className={classes.cancelBtton}                      
                onClick={()=>openModalTimeout()}
              >
                Cancel
              </Button> 

          </div>
        </div>
        :
        console.log()
      }

      {
        modalDelete?
        <div className="modal">
          <div className="modalContent">
            <i onClick={()=>openModal()} className="fas fa-times"></i>
              
              <div className="modalHeader">
                <img src={iconModal} className="icon" />
                <h1>Delete Bot?</h1>
              </div> 

              <Button
                variant="contained"        
                className={classes.confirmButton}                      
                onClick={()=>deleteBloco()}
              >
                Confirm
              </Button>

              <Button
                variant="contained"        
                className={classes.cancelBtton}                      
                onClick={()=>openModal()}
              >
                Cancel
              </Button>              
              
          </div>
        </div>
        :
        console.log()
      }
      
      <div className="titleBloco">
        <h2><i className="fas fa-tag"></i> <span className="botName">{botName}</span> - {nomeBloco}</h2>
        
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Button
                variant="contained"        
                className={classes.button}
                startIcon={<MoreVertIcon />}
                {...bindTrigger(popupState )}
              >
                Options
              </Button>
              <Menu
               {...bindMenu(popupState)}
               anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              style={{marginTop: '3%'}}>
                <MenuItem onClick={()=>{openModalTimeout() ;popupState.close()}}>Limit time</MenuItem>
                <MenuItem style={{color: 'red'}} onClick={()=>{openModal(); popupState.close()}}>Delete</MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>

        {/* <Button
        variant="contained"        
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={()=>openModal()}
      >
        Excluir
      </Button> */}
      </div>      
        <div className="msgs">                  

            <Form onSave={addTask} />
            <div className="listMsg">
              <List tasks={tasks} deleteTask={deleteTask} editTask={editTask} /> 
            </div>    

            <div className="saveMsg">
              <h2 className="botaoenviar"
              onClick = {() => {enviar()}} >
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