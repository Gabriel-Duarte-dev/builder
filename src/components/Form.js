import  React, { useState } from "react";
// import {enviar} from '../Builder.js'


export default  function Form(props) {
  

    const onEnterPress = (e) => {
        if(e.keyCode == 13 && e.shiftKey == false) {
          e.preventDefault();
          setText(""); onSave(text);          
        }
      }

    // const textField = new MDCTextField(document.querySelector('.mdc-text-field'));

    const { onSave } = props;
  
    const [text, setText]  = useState();

    let regexVariable = new RegExp("^[$]");
    let regexImg = new RegExp("^[#]");
    let regexTime = new RegExp("^[!]");
  
    return (
        
            <form  className="addMsg" onSubmit={e => e.preventDefault()}> 

                <div className="msg">
                  <div className="txt">
                  {
                      (regexVariable.test(text))
                      ? 
                      
                          <textarea onKeyDown={onEnterPress} placeholder="Digite sua mensagem..." className="variable" value={text || ""} onChange={e=>setText(e.currentTarget.value)}/>
                      
                      :
                      (regexImg.test(text))
                      ?
                      
                          <textarea onKeyDown={onEnterPress} placeholder="Digite sua mensagem..." className="img" value={text || ""} onChange={e=>setText(e.currentTarget.value)}/>
                      
                      :
                      (regexTime.test(text))
                      ?
                      
                          <textarea onKeyDown={onEnterPress} placeholder="Digite sua mensagem..." className="time" value={text || ""} onChange={e=>setText(e.currentTarget.value)}/>
                      
                      :
                      
                          <textarea onKeyDown={onEnterPress} placeholder="Digite sua mensagem..." className="task-fiel" value={text || ""} onChange={e=>setText(e.currentTarget.value)}/>
                                         
                  }     
                  </div>
                    {/* <textarea onKeyDown={onEnterPress} placeholder="Digite sua mensagem..." className="task-fiel" value={text || ""} onChange={e=>setText(e.currentTarget.value)}/> */}

                    <div className="btn2">

                    {/* <i type="submit" onClick={()=>{setText(""); onSave(text);}} class="fas fa-paper-plane"></i> */}
                        <button className="save-button" onClick={()=>{setText(""); onSave(text);}}>
                            Adicionar
                        </button>
                    </div>

                </div>
                
            </form>        
        
      
    );
  }