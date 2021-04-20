import React from "react";
import TextareaAutosize from 'react-textarea-autosize';

// const [autoResize, setAutoResize] = useState();

export default function List(props) {
    
    const { tasks } = props;

    let regexVariable = new RegExp("^[$]");
    let regexImg = new RegExp("^[#]");
    let regexTime = new RegExp("^[!]");

    // const IdentfyVariable = () => {

    //     if(tasks == 'teste'){
    //         let variable = 'Variable-textarea'
    //     }
    //     else{
    //         let Variable = 'textarea'
    //     }
    // }

    // const classes = IdentfyVariable()

    console.log(tasks)
    return (
        <div className="listadiv">
            {tasks.map((task, index) => {
                return (

                    <div className="msgEnviada" key={index}>

                        {
                            (regexVariable.test(task))
                            ? 
                            <div className="txt">
                                <TextareaAutosize id="Variable-textarea" onChange={(event) => props.editTask(index, event)} value={task}/>
                            </div>
                            :
                            (regexImg.test(task))
                            ?
                            <div className="txt">
                                <TextareaAutosize id="img-textarea" onChange={(event) => props.editTask(index, event)} value={task}/>
                            </div>
                            :
                            (regexTime.test(task))
                            ?
                            <div className="txt">
                                <TextareaAutosize id="time-textarea" onChange={(event) => props.editTask(index, event)} value={task}/>
                            </div>
                            :
                            <div className="txt">
                                <TextareaAutosize id="textarea" onChange={(event) => props.editTask(index, event)} value={task}/>
                            </div>
                            // <div className="txt">
                            //     <TextareaAutosize id="textarea" onChange={(event) => props.editTask(index, event)} value={task}/>
                            // </div>
                        }                        

                        {/* <div className="txt">
                          <TextareaAutosize id="textarea" onChange={(event) => props.editTask(index, event)} value={task}/>
                        </div> */}

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