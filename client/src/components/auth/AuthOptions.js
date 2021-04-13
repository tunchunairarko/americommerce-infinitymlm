import React, {useContext} from 'react';
import Button from 'react-bootstrap/Button';
import {useHistory} from "react-router-dom"; //This is a react hook
import UserContext from "../../context/UserContext";
import { useCookies } from "react-cookie";

export default function AuthOptions() {
    const [setCookie] = useCookies(["user"]);
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory(); //history is all events that had happened in the url bar
    
    const register =() => history.push("/register");
    const login = () => history.push("/login");

    const divStyle = {
        marginLeft: '5px',
        marginRight: '5px'
      };
    const logout = () => {
      setUserData({
        token:undefined,
        user:undefined
      });
      setCookie("username", "", {
        path: "/"
      });

      setCookie("email", "", {
          path: "/"
      });
      setCookie("displayName", "", {
          path: "/"
      });
      localStorage.setItem("auth-token","");
      history.push("/login");
    }
    return (
      <>
        {userData.user ? (
            <Button style={divStyle} onClick={logout} variant="danger" type="submit" >
                Logout
            </Button>
          ):(          
          <>
          <div>
            <Button style={divStyle} onClick={register} variant="secondary" type="submit">
                Register
            </Button>
            <Button style={divStyle} onClick={login} variant="primary" type="submit" >
                Login
            </Button>
          </div>
          </>
          )
        }
      </>        
    );
    
}
