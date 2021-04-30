import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Header from './Header.jsx';
import RoutePage from '../route.js';
import api from '../api';
import '../pages/Register.css';
import logo from '../imagens/logotexxia.png';
import desenho from '../imagens/image.svg';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from "react-router-dom";
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';



function Register() {

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstname, setfirstName] = useState('')
  const [lastname, setlastName] = useState('')
  const [errorResponse, setErrorResponse] = useState('')
  const [ acceptTerms, setacceptTerms] = useState ('') 



  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  
  let history = useHistory();

  async function enviar() {
      try {
          const body = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: senha,
            confirmPassword: confirmPassword,
            acceptTerms: acceptTerms
      }

      

  

          const response = await api.post('/accounts/register', body)

          if (response.status == 200)

          history.push("/Confirm");
          
          else{
              console.log('error');              
          }
          
        console.log(response);
          
      } catch (error) {
        setErrorResponse(error.response.data.message);
          handleClick()
      
      }
    }


  return (
    <div className="principalregister">
      <p> Use artificial intelligence to your advantage </p>
      <div className="boximage">
        <Link to={'/Login'} style={{ textDecoration: 'none' }}>
            <p className="backoption"> <ArrowBackIosIcon
              style={{ position: 'relative', top: '3px', left: '13px'}}
              fontSize={'small'} /> Back  </p>
        </Link>

        <img id="texxia" src={logo} />
        <img id="desenho" src={desenho} width={550} />

        <div className="registerbox">

          <h1 id="text-login"> Create your account </h1>

          <input id="inputnameregister" placeholder="First name" type="text" onChange={(texto) => setfirstName(texto.target.value)} />
          <input id="inputsobrenomeregister" placeholder="Last name" type="text" onChange={(texto) => setlastName(texto.target.value)} />
          <input id="input1" placeholder="E-mail" type="text" onChange={(texto) => setEmail(texto.target.value)} />
          
          <OutlinedInput
            className="inputhiddenregiter2"
            placeholder="Password"
            type={values.showPassword ? "text" : "password"}
            onChange={handleChange("password")}
            onChange={(texto ) => setConfirmPassword(texto.target.value)}
            endAdornment={
               <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}>
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>}/>
                          
          <OutlinedInput
            className="inputhiddenregiter"
           
            placeholder="Confirm Password"
            type={values.showPassword ? "text" : "password"}
            onChange={handleChange("password")}
            onChange={(texto ) => setSenha(texto.target.value)}
            endAdornment={
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}>
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>}/>
        
          
  
          
          
          <input id="accepttermscheck" type="checkbox" onChange={(texto ) => setacceptTerms(texto.target.value)}/>  

          
          <span id="accepttermstext"> Accept terms</span> 


          <button className="confirmlink" onClick={() => enviar()}>
            Register
          </button>

        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {errorResponse}
                </Alert>
            </Snackbar>
    </div>

  );
}

export default Register;
