import 'bootstrap/dist/css/bootstrap.css';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import React ,{useState , useEffect} from 'react'
import axios from 'axios'
import $ from 'jquery'




function Messages(props) {
    const _id = props.match.params.id
    const token = localStorage.getItem('token')
    const user =JSON.parse(localStorage.getItem('user')) ;
    const url_api =`http://localhost:3001/`

const [messages, setmessages] = useState([]);

    useEffect(() => {
        const getmessage = async ()=>{
          const resultmessages = await axios({
          headers: {'Authorization': `Bearer ${token}`},
          method: 'get',
          url : `${url_api}Chat/chatmessages/${_id}`,
          });
          if(resultmessages.status === 200){
            setmessages(resultmessages.data.chat.messages)
            
          }
        }
        
        getmessage()
       
      }, [_id])

      const Rendermessages = ({id , message})=>{
            if(message.sender === user._id){
                return (
                    <div key={id} className="message-sent justify-content-start mt-1 mb-1">
                    <p className="mt-1 mb-1">{message.message}</p>
                    </div>
                )
            }else{
                return (
                    <div key={id} className="message-received justify-content-start mt-1 mb-1">
                    <p className="mt-1 mb-1">{message.message}</p>
                    </div>
                )
            }
      }

      const sendmessage = async(e) =>{
        e.preventDefault()
           const message = $('#messageinput').val()
            const data = {
                sender :user._id,
                chatID :_id,
                message:message
            }
           
      
       const resultsendmessage = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'post',
        url : `${url_api}Message/add`,
        data
        });
        console.log(resultsendmessage)
      }
      
    return (
        <div>
            <div className="message">
                <div className="center mt-5">
                    <div className=" flex-column">
                    {      messages.map((message, index) => {
                    return <Rendermessages key={index} message={message} />
                    })}
                    </div>
                    
                  
                </div>
            </div>
            <div className="align-items-end ">
                
                    <form id="sendmessage" className="d-flex flex-row align-items-center">
                <input type="text" placeholder="type something !!" required id="messageinput"/>
                <button className=" ml-3" type="submit"  style={{border:"none",fontSize:10}} onClick={sendmessage} >Send</button>
                    </form>
               
            </div>
        </div>
    )
}

export default Messages
