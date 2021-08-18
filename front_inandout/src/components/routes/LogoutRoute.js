import React from 'react'; 
import { Route, Redirect } from 'react-router-dom'; 
import isLogin from '../../utils/isLogin'; 

const LogoutRoute = ({component: Component, ...rest}) => { 
    window.sessionStorage.removeItem('userNo');
    window.sessionStorage.removeItem('userRole');
    window.sessionStorage.removeItem('Authorization');
    console.log("로그앗웃ㅇㅁ 시랳ㅇ됨?");
    return ( 
        <Route {...rest} render={props => (     
            isLogin() ? 
                <Component {...props} /> : 
                <Redirect to="/login" /> )} 
        /> 
    ); 
}; 
            
export default LogoutRoute;

