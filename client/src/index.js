import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/assets/style.css'
import { CookiesProvider } from "react-cookie";
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic'

const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 4000,
    offset: '20px',
    // you can also just use 'scale'
    transition: transitions.SCALE
  }

ReactDOM.render(
    <CookiesProvider>
        <AlertProvider template={AlertTemplate} {...options}>
            <App />
        </AlertProvider>        
    </CookiesProvider>, document.querySelector("#root")
    
);
