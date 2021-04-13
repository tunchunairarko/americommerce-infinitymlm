import React, {useContext} from 'react'
//import { Link } from "react-router-dom"
import AuthOptions from "../../auth/AuthOptions";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import UserContext from "../../../context/UserContext";

export default function Header() {
    const { userData } = useContext(UserContext);
    return (
        
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            {userData.user ? (
                <Navbar.Brand href="/">Amcom-MLM</Navbar.Brand>
            ):(
                <Navbar.Brand href="/login">Amcom-MLM</Navbar.Brand>
            )}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {/* <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown> */}
                </Nav>
                <Nav>
                    <AuthOptions></AuthOptions>
                    {/* <Nav.Link href="#deets">More deets</Nav.Link>
                    <Nav.Link eventKey={2} href="#memes">
                        Dank memes
                    </Nav.Link> */}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
