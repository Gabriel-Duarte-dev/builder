import React, { useState, useEffect } from "react"
import Header from './Header.jsx'
import '../Styles/Settings.css'
import api from '../api'

/** Import Material UI */
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

/** Snackbar Styles and Config */

/** Default Function Below */
export default function Settings(props) {

    const userandpass = {
        email: 'dev@texxia.com.br',
        password: 'Senh@123'
    }

    const [ accountSid , setAccountSid ] = useState('')
    const [ auth , setAuth ] = useState('')
    const [ userData, setUserData ] = useState()
    const [ isLoading , setIsLoading ] = useState(false)
    const [ isReceiving , setIsReceiving ] = useState(true)
    /** Config da Mensagem ao Salvar Dados */
    const [open, setOpen] = useState(false);

    /** Abrir mensagem de sucesso */
    const handleClick = () => {
        setOpen(true);
    };

    /** Fechar mensagem de sucesso */
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    /** Atualizar AccountSid e Auth no banco de dados */
    async function enviar() { 
        setIsLoading(true)
        const response_post = await api.post(`/accounts/authenticate`, userandpass)
        const data = response_post.data
    
        const token = data.jwtToken
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };


        const id = data.id   
        try {
            const body = {
                twilio: {
                    accountSid: accountSid,
                    auth: auth
                }
            }
            const response = await api.put(`/accounts/${id}`,body, config)
            if(response.status == 200){
                handleClick()
            }else{
                
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }

    }

    async function receber() { 
        const response_post = await api.post(`/accounts/authenticate`, userandpass)
        const data = response_post.data
        setUserData(data)
        setAccountSid(data.twilio.accountSid)
        setAuth(data.twilio.auth)
        setIsReceiving(false)
    }


    useEffect(() => {
        receber()
    },[])

    return (
        <div className="">
            <Header />

            <div className="">
                <h2 className="h2_Twilio">Twilio Settings</h2>
                <p className="textTitle">We need the information below to connect all bots to Twilio Conversation. To get this information contact Twilio.</p>
                <Divider/>
                <p className="textInput">AccountSid: </p>
                <input value={accountSid} className="input" type="text" onChange={(text) => setAccountSid(text.target.value)}/>
                <p className="textInput">Auth: </p> 
                <input value={auth} className="input" type="text" onChange={(text) => setAuth(text.target.value)} />
                <div className="saveButton">
                    <Button variant="contained" color="primary" onClick={() => enviar()} disabled={isLoading}>Apply</Button>
                </div>
                
            </div>
            
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
                Sucessful applied
                </MuiAlert>
            </Snackbar>
        </div>
        
    )
}

