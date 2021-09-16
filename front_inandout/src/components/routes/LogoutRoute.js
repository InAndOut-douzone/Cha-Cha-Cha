import React from 'react'; 
import { Route, Redirect } from 'react-router-dom'; 
import isLogin from '../../utils/isLogin'; 

const LogoutRoute = ({component: Component, ...rest}) => { 
    sessionStorage.removeItem('userNo');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('Authorization');
    sessionStorage.removeItem('username');

    return ( 
        <Route {...rest} render={props => (     
            isLogin() ? 
                <Component {...props} /> : 
                <Redirect to="/login" /> )} 
        /> 
    ); 
}; 
            
export default LogoutRoute;

