import './App.css';
import api from './api.js'
import Builder from './Builder.js'
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'

import texxia from './imagens/texxia.png'

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
  
  return (
    
    <div className="App">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"></link>

      {
        modal?
        <div className="modal">
          <div className="modalContent">
            <i onClick={()=>openModal()} className="fas fa-times"></i>
            <h3>Adicionar Bloco</h3>
            <select onChange={(text)=>setNomeBot(text.target.value)} id="namesBlocos">
              <option value="Inicio">Inicio</option>
              <option value="Boas vindas">Boas vindas</option>
              <option value="Cidade">Cidade</option>
              <option value="E-mail">E-mail</option>
              <option value="O que gostaria de saber?">O que gostaria de saber?</option>
              <option value="Saudação-Nome">Saudação-Nome</option>
              <option value="Apresentação">Apresentação</option>
              <option value="Não entendi simulação">Não entendi simulação</option>
              <option value="Simulação-Valores">Simulação-Valores</option>
              <option value="FGTS">FGTS</option>
              <option value="Entrada">Entrada</option>
              <option value="Fim Simulção">Fim Simulção</option>
              <option value="Agradecimento">Agradecimento</option>
              <option value="Animal">Animal</option>
              <option value="Condomíno">Condomíno</option>
              <option value="Lazer">Lazer</option>
              <option value="Localização">Localização</option>
              <option value="Erro padrão">Erro padrão</option>
              <option value="Contatos">Contatos</option>
              <option value="Visita">Visita</option>
              <option value="Final Visita">Final Visita</option>
              <option value="Escola">Escola</option>
              <option value="Construção">Construção</option>
              <option value="Incorporadora">Incorporadora</option>
              <option value="Segurança Bairro">Segurança Bairro</option>
              <option value="Entrega Obras">Entrega Obras</option>
              <option value="Documentação Cliente">Documentação Cliente</option>
              <option value="Documentação Projeto">Documentação Projeto</option>
              <option value="Juros">Juros</option>
              <option value="Agua-Luz-Gás">Agua-Luz-Gás</option>
              <option value="Mais alguma coisa?">Mais alguma coisa?</option>
            </select>
            <h6 onClick={()=>salvarBloco()}>Adicionar</h6>            
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
         <h3 onClick={()=>openModal()}>Add Bloco +</h3>
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
