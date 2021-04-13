import React from 'react';
import { Route, Redirect } from 'react-router-dom';


export default function PrivateRoute ({component: Component, ...rest}) {
    const isLogin = () => {
        if (localStorage.getItem("auth-token")) {
            return true;
        }
    
        return false;
    }

    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};
