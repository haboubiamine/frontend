import React , { useState , useEffect} from 'react'
import { Route, Redirect } from 'react-router-dom';


function AdminRout({ component: Component, ...rest }) {
    const [isadmin, setisadmin] = useState(false)
    const user =JSON.parse(localStorage.getItem('user')) ;

    if(user){
        return (
            <Route {...rest} render={(props) => (
               user.role === "admin" 
                  ? <Component {...props} /> 
                  : <Redirect to='/' />
              )} />
        )
    }else{
        return (
            <Route {...rest} render={(props) => (
                   <Redirect to='/' />
              )} />
        )
    }
    
    
}

export default AdminRout
