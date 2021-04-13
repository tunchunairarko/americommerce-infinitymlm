import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import UserContext from "../../context/UserContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
// import '../assets/register-auth.css';
import { useDidMount, useWillUnmount } from "react-hooks-lib";


export default function Register() {
    useDidMount(()=>{
        const bodyElt = document.querySelector("body");
        bodyElt.style.setProperty("background-image","url(back.png)")
    })
    useWillUnmount(()=>{
        const bodyElt = document.querySelector("body");
        bodyElt.style.setProperty("background-image","none")
    })
    
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();
    
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
    
        try {
          const newUser = { username, email, password, passwordCheck, displayName };
          const registerRes = await Axios.post(`/api/users/register`, newUser);
          console.log(registerRes);
          const loginRes = await Axios.post(`/api/users/login`, {
            username,
            password,
          });
          setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user,
          });
          localStorage.setItem("auth-token", loginRes.data.token);
          history.push("/");
        } catch (err) {
            console.log(err.response.data.msg);
          err.response.data.msg && setError(err.response.data.msg);
        }
    };

    return (
        <div>
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            <Container className="p-3 register-form">
                <Jumbotron className="shadow-sm rounded">
                    <h1 as={Row} style={{display: 'flex', justifyContent: 'center'}}>
                        Create Account
                    </h1>
                    <Form onSubmit={submit}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="register-username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="register-email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                            </Form.Group>                            
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="register-password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="register-password-check">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e) => setPasswordCheck(e.target.value)}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="register-full-name">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control placeholder="Enter the full name" onChange={(e) => setDisplayName(e.target.value)}/>
                        </Form.Group>

                        <Button variant="primary" type="submit" size="lg" value="Register" block>
                            Submit
                        </Button>
                    </Form>
                </Jumbotron>
            </Container>
        </div>
    );
}
