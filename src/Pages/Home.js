import React ,{useState , useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {useDispatch } from 'react-redux';
import { Route, useRouteMatch } from 'react-router-dom';
import axios from 'axios'
import {Logout} from './../redux/actions/authAction';
import Chat from '../Component/Chat'
import Messages from '../Component/Messages'
import io from "socket.io-client";

// export function Socket (){
//   var socket 
//   useEffect(() => {
//      socket = socketIOClient("http://localhost:3001/");
//   }, []);
 
//   return socket
// }
const socket = io.connect("http://localhost:3001");

function Home() {

    const dispatch = useDispatch();
    const token = localStorage.getItem('token')
    const user =JSON.parse(localStorage.getItem('user')) ;
    const url_api = "http://localhost:3001/"
    const [chats, setchats] = useState([])
    

    useEffect(() => {
      const getchats = async ()=>{
        
        const resultchat = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : url_api+"Chat/mychat",
        });
        // console.log(resultchat)
        if(resultchat.status === 200){
          setchats(resultchat.data.Chat)
          
        }
      }
      
        getchats()
     
    }, [])

    const {path} = useRouteMatch()
  

    const handellogout = ()=>{
        dispatch(Logout());
        window.location.replace('/');
    }

    return (
        <div className="col-12">
  <div className="row">
    <div className="col-lg-3 shadow p-3 bg-white rounded chat-container">
      <div className="">
      <button>search</button>
      </div>
      <div className="chats">
      {      chats.map((chat, index) => {
         return <Chat key={index} users={chat.users} _id={chat._id} />
       })}
      </div>
      
      
      <button onClick={handellogout}>logout</button>
    </div>




    <div className="col-lg-9  message-container">
    <Route path={`${path}/:id`} component={Messages} exact/>
    </div>
    
  </div>
</div>
    )
}

export default Home

