import React, { useState, useEffect } from "react"
import {Link} from 'react-router-dom'
import Header from './Header.jsx'
import "../Styles/home.css"
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
import IconButton from '@material-ui/core/IconButton';
// import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import BuildIcon from '@material-ui/icons/Build';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import ImageIcon from '@material-ui/icons/Image';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PhoneIcon from '@material-ui/icons/Phone';
import TextField from '@material-ui/core/TextField';
import InputMask from 'react-input-mask'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {
  fade,
  ThemeProvider,
  withStyles,  
  createMuiTheme,
} from '@material-ui/core/styles';

import loadingIcon from '../imagens/loading.gif'
import iconModal from '../imagens/iconModal.png'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// COMEÇOS DAS FUNÇÕES QUE TEM QUE SER DEFINIDAS ANTES

const useStyles = makeStyles((theme) => ({
paper: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: `translate(-50%, -50%)`,
    width: 500,  
    border: 0,
    outline: 0,
    borderRadius: '5px',
    backgroundColor: theme.palette.background.paper,    
    textAlign: 'center'
  },  
  root: {
    '&:hover': {
      boxShadow: '0px 4px 15px -5px rgba(0,0,0,0.75)',
      cursor: 'pointer'
    },
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
    },
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
  cancelButton: {    
    marginTop: '110px',      
    marginLeft: '40px',
    backgroundColor: 'rgb(255, 74, 74)',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'rgb(206, 5, 5) !important'
    },
  },
  creatBotButtonClose: {
    margin: '40px 30px',
    backgroundColor: 'rgb(255, 74, 74)',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'rgb(206, 5, 5) !important'
    },
  },
  creatBotButtonCreat: {
    margin: '40px 30px',
    backgroundColor: 'rgb(139, 0, 204)',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'rgb(116, 0, 170) !important'
    },
  },
  modalTitle: {
    marginBottom: '40px'
  },
  inputNewBot: {
    padding: '20px 0',
    maxWidth: '300px',
    width: '100%',    
  },
  inputMask: {
    border: 0,
    margin: '20px 0',
    padding: '10px 0',
    maxWidth: '300px',
    width: '100%',
    borderBottom: '2px solid #a5a5a5d9',
    outline: 0,
    '&:focus, &:hover': {
      borderColor: '#3F5AA9'
    },    
  },
  modalButton: {
    margin: '40px 30px',
  },
  saveButtonEditModal: {
    marginRight: '30px',
    marginTop: '40px',
    marginBottom: '40px',
    paddingLeft: '30px',
    paddingRight: '30px',
    backgroundColor: '#44bd32',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#00b330 !important'
    },
  },
  cancelButtonEditModal: {        
    marginLeft: '40px',
    marginTop: '40px',
    marginBottom: '40px',
    backgroundColor: 'rgb(255, 74, 74)',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'rgb(206, 5, 5) !important'
    },
  },
  textField: {
    '& .MuiInput-underline:after': {
      borderBottomColor: 'rgb(92, 0, 128)',
    },
  }
}));


// FIM DAS FUNÇÕES QUE TEM QUE SER DEFINIDAS ANTES

export default function PageHome(props) {

  const classes = useStyles();
  
  const [tasks, setTask] = useState([]);
  const [open, setOpen] = React.useState(false); 
  const [loading, setLoading] = useState(true);
  // const [botID, setBotID] = useState("")
  const [avatarImg, setAvatarImg] = useState(null)
  const [capaImg, setCapaImg] = useState(null)
  
  const [alertOpen, setAlertOpen] = React.useState(false);  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };  

  const alertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };  

  const [disable, setDisable] =  useState(false)

  async function enviar() {    
    setDisable(true)
    try {           
      
      const avatarUrl = new FormData();

      avatarUrl.append('file', avatarImg)

      console.log(avatarUrl)

      const data = await api.post('api/bot/posts', avatarUrl)

      const awsAvatar = data.data

      const capaUrl = new FormData();

      capaUrl.append('file', capaImg)

      console.log(capaUrl)

      const dataCapa = await api.post('api/bot/posts', capaUrl)

      const awsCapa = dataCapa.data
      
      const body = {
        botName: botNome,
        botTelefone: botTelefone,
        botAvatar: awsAvatar,
        botCapa: awsCapa
    }
    console.log(body)
      const response_get = await api.post('/api/bot/register',
      body
    )
    receber()
    setDisable(false)
    setOpen(false);
    setAlertOpen(true)
    } catch (error) {
      console.log(error)
    }
  }

// FUNCTION PARA RECEBER DADOS DA API
async function receber() {
  setLoading(true)
  try {
  const response_get = await api.get('/api/bot')
  const data = response_get.data
  setTask(data)
  // setBotID(tasks)  
  console.log(data);
  setLoading(false)
  } catch (error) {
    console.log(error)
  }
}


// USE EFFECT PARA RECEBER DADOS DA API

useEffect(() => {
  receber()
}, [])


// CÓDIGO QUE APARECE DENTRO DO MODEL APÓS ELE SER ABERTO PELA TAG <Modal>


const [botNome, setBotNome] = useState('');
const [botTelefone, setBotTelefone] = useState('');


  const body = (
    <div className={classes.paper}>

      <div className="modalHeader">
        <img src={iconModal} className="icon" />
        <h1 className={classes.modalTitle}>Create Bot</h1>
      </div>      

      <form className="formNewBot">

        <TextField 
          className={classes.inputNewBot}
          onChange={(texto) => setBotNome(texto.target.value)}
          placeholder="Bot name"/>
        <div></div>
        <InputMask
        className={classes.inputMask} 
        onChange={(texto) => setBotTelefone(texto.target.value)}
        placeholder="+55999999999"        
        mask="+55 999999999" />          
        <div></div>
        <input type="file" onChange={(e)=> {setAvatarImg(e.target.files[0])}}  />
        <div></div>
        <input type="file" onChange={(e)=> {setCapaImg(e.target.files[0])}}  />
        <div></div>

        <Button variant="contained" disabled={disable} className={classes.creatBotButtonCreat} onClick={()=>enviar()}> Create </Button>
        <Button variant="contained" className={classes.creatBotButtonClose} onClick={handleClose}> Close </Button>

      </form>            
    </div>
  );

  //  RETURN DO CÓDIGO QUE SERVE PARA ABRIR O MODEL COM INFORMAÇÕES A SEREM PREENCHIDAS

  return (
    <div className="homeContent">
        <Header/>

        <Snackbar open={alertOpen} autoHideDuration={2000} onClose={alertClose}>
          <Alert onClose={alertClose} severity="success">
            Created Bot successful!
          </Alert>
        </Snackbar>

          {
            loading?
            <div className="modal">
              <div className="loadingContent">                
                <img src={loadingIcon} className="loadingIcon"/>
              </div>
            </div>
            :
            console.log()
          }

        <Button
          variant="contained"        
          className="addBot"
          endIcon={<AddIcon />}        
          onClick={()=>handleOpen()}
        >
          Create Bot
        </Button>

        <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
          {body}
        </Modal>
      <div className="cardBots">
        <NewList tasks={tasks} refresh={receber}  />
      </div>
    </div>
  );
}


function NewList(props) {
  const { tasks, refresh } = props;
  const classes = useStyles();
  const [modalDelete, setModalDelete] = useState(false)

  const [modalEdit, setModalEdit] = useState(false) 
  const [taskID, setTaskID]  = useState("")
  const [botNameID, setBotNameID] = useState("")

  const [avatarImg, setAvatarImg] = useState("")
  const [capaImg, setCapaImg] = useState("")
  const [attBotName, setAttBotName] = useState("")
  const [botPhoneNumber, setBotPhoneNumber] = useState("")

  const [btnTimeOut, setBtnTimeOut] = useState(false)
  const [timeOut, setTimeOut] = useState('')

  const [alertOpenDelete, setAlertOpenDelete] = React.useState(false);

  const CssTextField = withStyles({
    root: {      
      '& .MuiInput-underline:after': {
        borderBottomColor: 'rgb(92, 0, 128)',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'red',
        },
        '&:hover fieldset': {
          borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'green',
        },
      },
    },
  })(TextField);

  const alertCloseDelete = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpenDelete(false);
  };

  async function deleteBot(id) {
    try {
      const response = await api.delete('/api/bot/'+id)
      refresh()
      setModalDelete(false)      
      setAlertOpenDelete(true);      
    } catch (error) {
      console.log(error)
    }
  }

  async function changeNameBot(id) {
    try {
      const avatarUrl = new FormData();

      avatarUrl.append('file', avatarImg)

      console.log(avatarUrl)

      const dataAvatar = await api.post('api/bot/posts', avatarUrl)

      const awsAvatar = dataAvatar.data

      const capaUrl = new FormData();

      capaUrl.append('file', capaImg)

      console.log(capaUrl)

      const dataCapa = await api.post('api/bot/posts', capaUrl)

      const awsCapa = dataCapa.data

      const response_get = await api.get('api/bot/'+id)
      const data = response_get.data
      const dados = {        
        botName: attBotName,
        botTelefone: botPhoneNumber,
        botAvatar: awsAvatar,
        botCapa: awsCapa,
        botTimeout: btnTimeOut,
        valueTimeout: timeOut
      }
      setModalEdit(!modalEdit)
      console.log(dados)
      const response = await api.put('api/bot/'+id,dados)
      refresh()
    } catch (error) {
      console.log(error)
    }
  }

  function openModal(id) {
    setTaskID(id)

    setModalDelete(!modalDelete);  
  }

  function openModalEdit(id, phone, name, avatar, capa, timeout, valueTimeout) {
    setBotNameID(id)
    setBotPhoneNumber(phone)
    setAttBotName(name)
    setAvatarImg(avatar)
    setCapaImg(capa)
    setBtnTimeOut(timeout)
    setTimeOut(timeout)
    setModalEdit(!modalEdit)
  }

  return (
    <div className="cardBots">
      {tasks.map((task, index) =>  {
        
        return (
          <div className="cardBots-Content" key={index}>

            <Snackbar open={alertOpenDelete} autoHideDuration={2000} onClose={alertCloseDelete}>
              <Alert onClose={alertCloseDelete} severity="error">
                Bot successfully deleted!
              </Alert>
            </Snackbar>
            <Card className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar arial-label="recipe" className={classes.avatar} src={task.botAvatar.url}>
                    
                  </Avatar>
                }
                action={
                  <IconButton arial-label="settings">
                    <SettingsIcon
                     onClick={()=>openModalEdit(
                       task.id, task.botTelefone, task.botName,
                       task.botAvatar, task.botCapa, task.botTimeout, task.valueTimeout
                       )} />
                  </IconButton>
                }
                title={task.botName}
                subheader="subtitulo">                
              </CardHeader>
              
              <CardMedia 
                className={classes.media}
                image={task.botCapa.url}
                title="imagem">
              </CardMedia>

              <CardActions className={classes.actions}>
                
                <Button
                  variant="contained"        
                  className={classes.button}
                  startIcon={<DeleteForeverIcon />}
                  onClick={()=>{openModal(task.id)}}                  
                >
                  Delete
                </Button>

                <Link to={`/bot/${task.botSid}`} style={{ textDecoration:'none'}}>
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
                      onClick={()=>deleteBot(taskID)}
                    >
                      Confirm
                    </Button>

                    <Button
                      variant="contained"        
                      className={classes.cancelButton}
                      onClick={()=>openModal()}                        
                    >
                      Cancel
                    </Button>
                    

                    {/* <ul>
                      <li onClick={()=>deleteBot(task.id)}>Confirm</li>
                      <li onClick={()=>openModal()}>Cancel</li>
                    </ul> */}
                    
                </div>
              </div>
              :
              console.log()
            }

            {
              modalEdit?
              <div className="modal">
                <div className="modalContent">
                  <i onClick={()=>openModalEdit()} className="fas fa-times"></i>
                    
                    <div className="modalHeader">
                      <img src={iconModal} className="icon" />
                      <h1>Edit Bot</h1>
                    </div>
                                    
                    <TextField
                      id="input-with-icon-textfield"
                      placeholder="Bot name"
                      className="editBotModal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EditIcon style={{color:'#8c8c8c'}} />
                          </InputAdornment>
                        ),
                      }}
                      onChange={(texto) => setAttBotName(texto.target.value)}
                      />
                      <div></div>
                      {/* <InputMask
                        className="editBotModalPhone"
                        // onChange={(texto) => setBotTelefone(texto.target.value)}
                        placeholder="Bot number"        
                        mask="+55 999999999"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon style={{color:'#8c8c8c'}} />
                            </InputAdornment>
                          ),
                        }}
                        />
                        <div></div> */}
                    <TextField
                      id="input-with-icon-textfield"
                      placeholder="+55 999999999"
                      className="editBotModal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon style={{color:'#8c8c8c'}} />
                          </InputAdornment>
                        ),                        
                      }}
                      onChange={(number) => setBotPhoneNumber(number.target.value)}
                      />
                      <div></div>
                    {/* <TextField
                      id="input-with-icon-textfield"
                      placeholder="Avatar img"
                      className="editBotModal"
                      type="file"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleIcon style={{color:'#8c8c8c'}} />
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e)=>setAvatarImg(e.target.files[0])}
                      /> */}
                      <IconButton className="iconFile" component="label">
                        <AccountCircleIcon style={{color:'#858585', fontSize: '50px'}} />                        
                        <input type="file" onChange={(e)=>setAvatarImg(e.target.files[0])} hidden/>
                      </IconButton>
                      <span className="selectFile">{avatarImg.name}</span>
                      <div></div>
                    {/* <TextField
                      id="input-with-icon-textfield"
                      placeholder="Capa img"
                      className="editBotModal"
                      type="file"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ImageIcon style={{color:'#858585'}} />
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e)=>setCapaImg(e.target.files[0])}
                      /> */}
                      <IconButton className="iconFile" component="label">
                        <ImageIcon style={{color:'#858585', fontSize: '50px'}} />                        
                        <input type="file" onChange={(e)=>setCapaImg(e.target.files[0])} hidden/>
                      </IconButton>
                      <span className="selectFile">{capaImg.name}</span>
                      <div></div>
                      <FormControlLabel 
                        control={<Switch checked={btnTimeOut} onClick={()=>setBtnTimeOut(!btnTimeOut)} />}
                        label="Bot Timeout" style={{color: 'rgb(148, 148, 148)'}} />
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
                      className={classes.saveButtonEditModal}                      
                      onClick={()=>changeNameBot(botNameID)}
                    >
                      Save
                    </Button>

                    <Button
                      variant="contained"        
                      className={classes.cancelButtonEditModal}
                      onClick={()=>openModalEdit()}
                    >
                      Cancel
                    </Button>
                    

                </div>
              </div>:
              console.log()
            }

    </div>
  );
}