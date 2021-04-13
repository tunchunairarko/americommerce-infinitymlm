import React from 'react';
import { Route, Redirect } from 'react-router-dom';


export default function PublicRoute ({component: Component, restricted, ...rest}) {
    const isLogin = () => {
        if (localStorage.getItem("auth-token")) {
            return true;
        }
    
        return false;
    }
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isLogin() && restricted ?
                <Redirect to="/dashboard" />
            : <Component {...props} />
        )} />
    );
};

