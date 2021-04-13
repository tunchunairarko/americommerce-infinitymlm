import React, {useState, useEffect, Fragment} from 'react'
import { BrowserRouter, Switch } from "react-router-dom";
import Axios from "axios";
import Header from './components/layout/Header/header'
import Admin from './components/layout/Admin/Admin'

import Login from './components/auth/login'
import Register from './components/auth/register'
import UserContext from "./context/UserContext";
import { useCookies } from "react-cookie";

import PrivateRoute from "./router/PrivateRoute";
import PublicRoute from './router/PublicRoute';
//"exact property fixes the issue of the Route component to skip looking for child paths"
export default function App() {
    const [cookies, setCookie] = useCookies(["user"]);
    const [userData, setUserData] = useState ({
        token: undefined,
        user: undefined,
    });
    
    
    
    useEffect(() =>{
        const checkLoggedIn = async (e) => {
            
            let token = localStorage.getItem("auth-token");
            // console.log(token)
            if(token==null){
                localStorage.setItem("auth-token","");
                token="";
                setCookie("username", "", {
                    path: "/"
                });

                setCookie("email", "", {
                    path: "/"
                });
                setCookie("displayName", "", {
                    path: "/"
                });
                // history.push("/login");
            }
            else{
                var tokenError=false;
                const newLocal = { headers: { "x-auth-token": token } };
                const tokenResponse = await Axios.post(
                    `/api/users/tokenIsValid`,
                    null,
                    newLocal
                ).catch(function(error){
                    if (error.response) {
                        tokenError=true;   
                      } 
                    
                })
                if(tokenError){
                    setUserData({
                        token:undefined,
                        user:undefined
                      });
                    localStorage.setItem("auth-token","");
                    setCookie("username", "", {
                        path: "/"
                    });

                    setCookie("email", "", {
                        path: "/"
                    });
                    setCookie("displayName", "", {
                        path: "/"
                    });
                    window.location.replace("/login", { path: '/' });
                    // history.push("/login");
                    // logout();
                }
                // console.log(tokenResponse)
                else{
                    if(tokenResponse.data){
                        const userRes = await Axios.get(
                            `/api/users/`,{headers:{"x-auth-token":token,'Content-Type': 'application/json;charset=UTF-8'}},
                        )
                        // console.log(userRes.data)
                        setUserData({
                            token,
                            user: userRes.data,
                        });
                        setCookie("username", userRes.data.username, {
                            path: "/"
                        });

                        setCookie("email", userRes.data.email, {
                            path: "/"
                        });
                        setCookie("displayName", userRes.data.displayName, {
                            path: "/"
                        });
                    }
                }
                
            }
        }
        checkLoggedIn();
    });

    return (
        <Fragment>
            <BrowserRouter>
                <UserContext.Provider value={{ userData,setUserData }}>                    
                    {!userData.user ? <Header /> : <div></div>}
                    <Switch>
                        <PublicRoute restricted={true} component={Login} path="/login" exact />
                        <PublicRoute restricted={true} component={Register} path="/register" exact />
                        <PrivateRoute component={Admin} path="/dashboard" exact />
                        <PrivateRoute component={Admin} path="/posting" exact />
                        <PublicRoute restricted={true} component={Admin} path="/" exact />
                        
                    </Switch>
                </UserContext.Provider>
            </BrowserRouter>
        </Fragment>
        
    );
}
