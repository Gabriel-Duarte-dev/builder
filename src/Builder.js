import './App.css';
import './components/styles.css';
import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import List from "./components/List";
import api from './api';

export default function Builder(props) {
    console.log(props.blocoID)
    console.log(props.nomeBloco)
  const [tasks, setTask] = useState([]);

  const [nomeBloco, setNomeBloco] = useState("");

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

   alert('Conversa Salva!');

    console.log(response);

  }
  async function receber() {
      try {
        const response = await api.get('/api/bloco/'+props.blocoID);

        const data = response.data.mensagem
        const data2 = response.data.nomeBloco
        
        setTask(data)
        setNomeBloco(data2)
        console.log(data);
    
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
      setModalDelete(!modalDelete);
      window.location.reload();   
  
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
        <h2><i class="fas fa-tag"></i> {nomeBloco}</h2>
        <span onClick={()=>openModal()}><i class="fas fa-trash"></i>Excluir Bloco</span>
      </div>      
        <div className="msgs">                  

            <Form onSave={addTask} />
            <div className="listMsg">
              <List tasks={tasks} deleteTask={deleteTask} editTask={editTask} /> 
            </div>    

            <div className="saveMsg">
              <h2 className="botaoenviar"
              onClick = {() => enviar()} >
              <i class="fas fa-check"></i>
              </h2>
            </div>        

          </div>
    </div>
    
  );
}