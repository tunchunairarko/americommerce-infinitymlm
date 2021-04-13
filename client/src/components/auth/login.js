
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDidMount, useWillUnmount } from "react-hooks-lib";
import "../assets/Dashboard.scss";


export default function Login() {
    
    useDidMount(()=>{
        const bodyElt = document.querySelector("body");
        bodyElt.style.setProperty("background-image","url(back.png)")
    })
    useWillUnmount(()=>{
        const bodyElt = document.querySelector("body");
        bodyElt.style.setProperty("background-image","none")
    })
    
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = { username, password };
            const loginRes = await Axios.post(
                `/api/users/login`,
                loginUser
            );
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/");
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };
    return (
        <>
            <Container className="p-3 login-form" >
                <Jumbotron>
                    {error && (
                        <ErrorNotice message={error} clearError={() => setError(undefined)} />
                    )}
                    <h1>
                        Amcom-MLM login
                    </h1>
                    <Form onSubmit={submit}>
                        <Form.Group controlId="formUserName">
                            <Form.Label>User name</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}/>

                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Form.Text className="text-muted">
                            Your access credentials are secured.
                        </Form.Text>
                        <Button variant="primary" type="submit" size="lg" block>
                            Login
                        </Button>
                    </Form>
                </Jumbotron>
            </Container>
        </>
    );
}
