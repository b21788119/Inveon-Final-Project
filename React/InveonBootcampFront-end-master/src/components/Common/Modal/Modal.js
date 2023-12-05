import React,{useEffect, useState} from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";

const ChatModal = ({ handleShow, showModal, setShowModal })=> {

let dispatch = useDispatch();
const messages = useSelector((state) => state.chat.messages);
const connection = useSelector((state) => state.chat.connection);
const user = useSelector((state) => state.user.user);
const [message,setMessage] = useState("");

   
const sendMessage = () => {
  if(message.length !== 0){
    connection.invoke("SendMessage",JSON.stringify({message:message,userId:user.user_id})).then((res)=>{
    });
  }
}


const handleTextareaChange = (event) =>{
    setMessage(event.target.value);
}


const handleClose = () => setShowModal(false);
return (
    <>
        

      <Modal show={showModal} onHide={handleClose} dialogClassName='modal-bottom-right' contentClassName="modal-content">
        <Modal.Header closeButton>
          <Modal.Title>Live Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="card-body height3">
            <ul className="chat-list">
                {messages.map((msg,index) => 
                    <li className={user.user_id === msg.userId ? "out" : "in"} key={index}>
                        <div className="chat-img">
                            <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar6.png"></img>
                        </div>
                        <div className="chat-body">
                            <div className="chat-message">
                                <p>{msg.message}</p>
                            </div>
                        </div>
                    </li>
                )}

        			</ul>
        		</div>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Your Message</Form.Label>
              <Form.Control as="textarea" rows={1} onChange={(e)=>{handleTextareaChange(e)}}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=> sendMessage()}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>



           
    </>

)



}

export default ChatModal;