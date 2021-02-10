import React,{useState} from 'react'
import { Route, useRouteMatch,Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Avatar from '@material-ui/core/Avatar';




function Chat({users , _id}) {


    const currentuser =JSON.parse(localStorage.getItem('user')) ;
    const profile_pic ="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
    const {path,url} = useRouteMatch()
    
    return (
        <Link to={`${url}/${_id}`} >
        <div  className="border mt-2 mb-2  chats shadow-sm p-3 mb-2 bg-white rounded">
            
            
           {      users.map((user, index) => {
                if(user._id !== currentuser._id){
                    
                    return (
                        <div key={index} className="ml-3 d-flex flex-row justify-content-start align-items-center mt-3 mb-3 ">
                    <Avatar alt={user.name}  src="/azeazE/"/>
                    <div className="ml-3 font-weight-bold" >{user.name}</div>
                    <div className="ml-2 font-weight-light"  >some message here</div>
                        </div>
                    )
                }
       })}
                </div>
                </Link>
       
    )
}

export default Chat
