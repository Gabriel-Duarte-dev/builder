import React from "react";
import TextareaAutosize from 'react-textarea-autosize';

// const [autoResize, setAutoResize] = useState();

export default function List(props) {
    
    const { tasks } = props;

    console.log(tasks)
    return (
        <div className="listadiv">
            {tasks.map((task, index) => {
                return (

                    <div className="msgEnviada" key={index}>

                        <div className="txt">
                            <TextareaAutosize id="textarea" onChange={(event) => props.editTask(index, event)} value={task}/>
                        </div>

                        <div className="btn">
                            <i onClick={()=>props.deleteTask(index)} class="fas fa-trash-alt botaoexcluir"></i>
                            {/* <button className="botaoexcluir" onClick={()=>props.deleteTask(index)}> Excluir </button> */}
                        </div>

                    </div>
                );
            })}
        </div>
    );
}