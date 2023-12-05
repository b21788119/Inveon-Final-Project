import { handleReceivedMessage,handleConnectionEstablisment } from './app/Actions/Index';
import { HubConnectionBuilder,HubConnectionState,HubConnection} from '@microsoft/signalr';
import { useSelector } from 'react-redux';

const HubConnector = () => {

    
    const listenHub = (connection,dispatch) =>{
        connection.on("ReceivedMessage", (message)=>{
            dispatch(handleReceivedMessage(JSON.parse(message)));
        }
        );
    }
    const connect = async (dispatch) =>{
        const hubConnection = new HubConnectionBuilder().withUrl("https://localhost:44368/chatting").build();
        try {
            await hubConnection.start();
            listenHub(hubConnection,dispatch);
            dispatch(handleConnectionEstablisment(hubConnection));
          
        } catch (e) {
        console.log("e", e);
        }

    }
    return { listenHub,connect};
};


export default HubConnector;





