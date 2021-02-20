import React from 'react'
import { Route, Redirect } from 'react-router-dom';

function LoginprotectedRoute({ component: Component, ...rest }) {
   
        const token = localStorage.getItem('token')
    return (
        <Route {...rest} render={(props) => (
            token
              ?<Redirect to='/' /> 
              : <Component {...props} />
          )} />
    )
    
}

export default LoginprotectedRoute


