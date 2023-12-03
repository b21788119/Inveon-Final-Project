import React,{useEffect, useState} from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import { useDispatch, useSelector } from "react-redux";

const ChatModal = ({ handleShow, showModal, setShowModal })=> {


const [message,setMessage]=useState("");
const [sentMessageList,setSentMessageList] = useState([]);
const [receivedMessageList,setReceivedMessageList] = useState([])
const [_hubConnection_, setHubConnection] = useState(null);
var [control, setControl] = useState(false);
const [senderIndex,setIndex] =useState(0);


useEffect(() => {
    createHubConnection();
}, [])

const createHubConnection =async () => {
    const _hubConnection_ = new HubConnectionBuilder().withUrl("https://localhost:44368/chat").build();
    try {
        await _hubConnection_.start();
        setHubConnection(_hubConnection_);
        setControl(true);
    } catch (e) {
    console.log("e", e)
    }
    }

useEffect(()=>{
        if(control){
            _hubConnection_.on("ReceivedMessage",(receivedMessage)=>{  
                const sentMessages = sentMessageList.filter(msg=> msg.status == 1 && msg.msg === receivedMessage);
                if(sentMessages.length == 0){    
                    setReceivedMessageList(prevMessages => [...prevMessages, { status: 0, msg: receivedMessage }]);
        
        }}) 
        }
   },[control]);
   

const sendMessage = (content) =>{
    if(_hubConnection_)
    {
        _hubConnection_.invoke("SendMessage",content).then((response)=>{});
        setSentMessageList(prevMessages => [...prevMessages, { status: 1, msg: content }]);
      
        
        
    }
}

const handleTextareaChange = (event) =>{
    setMessage(event.target.value);
}



const handleClose = () => setShowModal(false);
return (
    <>
        

      <Modal autoFocus={false} enforceFocus={false} show={showModal} onHide={handleClose} dialogClassName='modal-bottom-right ' contentClassName="modal-content">
        <Modal.Header closeButton>
          <Modal.Title>Live Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="card-body height3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        			<ul className="chat-list">
        				{sentMessageList.map((msg,index)=>
                            (
                            <li className="out" key={index++} >
                                <div className="chat-img">
                                    <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar6.png"></img>
                                </div>
                                <div className="chat-body">
                                    <div className="chat-message">
                                        <p>{msg.msg}</p>
                                    </div>
                                </div>
        				    </li>))} 
                            {receivedMessageList.map((msg,index)=>
                            (<li className="in" key={index++} >
                                <div className="chat-img">
                                    <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar6.png"></img>
                                </div>
                                <div className="chat-body">
                                    <div className="chat-message">
                                        <p>{msg.msg}</p>
                                    </div>
                                </div>
        				    </li> ))}
        			</ul>
        		</div>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Your Message</Form.Label>
              <Form.Control as="textarea" rows={1} onChange={handleTextareaChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=> sendMessage(message)}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>



           
    </>

)



}

export default ChatModal;