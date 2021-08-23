import React from 'react'; 
import { Route, Redirect } from 'react-router-dom'; 
import isLogin from '../../utils/isLogin'; 

const LogoutRoute = ({component: Component, ...rest}) => { 
    localStorage.removeItem('userNo');
    localStorage.removeItem('userRole');
    localStorage.removeItem('Authorization');
    localStorage.removeItem('username');

    return ( 
        <Route {...rest} render={props => (     
            isLogin() ? 
                <Component {...props} /> : 
                <Redirect to="/login" /> )} 
        /> 
    ); 
}; 
            
export default LogoutRoute;

