import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from '../api';
import '../pages/Login.css';
import logo from '../imagens/logotexxia.png';
import desenho from '../imagens/image.svg';
import { useHistory } from "react-router-dom";
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
function Login() {
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
    const [ email, setEmail ] = useState ('')
    const [ senha, setSenha ] = useState ('')
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
                email: email,
                password: senha
            }
            const response = await api.post('/accounts/authenticate', body)
            if (response.status == 200)
            history.push("/");
            else{
                console.log('error');
            }
          console.log(response);
        } catch (error) {
            handleClick()
            console.log(error);  
        }
      }
    return (
        <div className="principallogin">
            <p> Use artificial intelligence to your advantage </p>
            <div className="loginboximage">
                <img id="texxia" src={logo}  />
                <img id="desenho" src={desenho} width={550} />
                <div className="loginbox">
                    <h1 id="text-login"> Login </h1>
                    <input id="input1" placeholder="Email" type="text"  onChange={(texto ) => setEmail(texto.target.value)}/>
                    <OutlinedInput
                        className="inputhidden"
                        id="inputhidden"
                        placeholder="Password"
                        type={values.showPassword ? "text" : "password"}
                        onChange={handleChange("password")}
                        onChange={(texto ) => setSenha(texto.target.value)}
                        endAdornment={
                            <IconButton className="iconcolor"
                                onClick={handleClickShowPassword}
                                >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>}/>
                    <button className="registerlink" className="buttonlogin" onClick={() => enviar()}>   
                        Sign In              
                    </button>
                    <h1 id="text">  Don't have an account?
                        <Link to={'/register'} style={{ textDecoration: 'none' }}>
                            <span> Register  </span>
                        </Link>
                    </h1>
                <Link to={'/recover'} style={{ textDecoration: 'none' }} className="forgotlink">
                      Forgot password 
                </Link>  
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    incorrect email or password!
                </Alert>
            </Snackbar>
        </div>
    );
}
export default Login;