import React, { useEffect } from 'react'; 
import { Route, Redirect } from 'react-router-dom'; 
import isLogin from '../../utils/isLogin'; 
import { useLocation } from "react-router-dom";

const PrivateRoute = ({admin, component: Component, ...rest}) => { 

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);

    return ( 
        <Route
        {...rest} render={props => (     
            isLogin() ? 
                window.sessionStorage.getItem("userRole") === "ROLE_ADMIN" ?
                <Component {...props} /> :
                admin ?
                <Redirect to="/" /> :
                <Component {...props} />
                : <Redirect to="/login" /> )}
        /> 
    ); 
}; 
            
export default PrivateRoute;

