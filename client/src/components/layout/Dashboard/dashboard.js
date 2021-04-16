import React, { Fragment, useState, useEffect } from 'react'
import Axios from "axios";
import { CardDeck, Row, Col } from 'react-bootstrap'
import "../../../components/assets/style.css";
import { FaUndo } from 'react-icons/fa';
import ModuleHeader from "../ModuleHeader/ModuleHeader";
import DashCard from "./DashCard";
import { useCookies } from "react-cookie";
import DashController from './DashController';
import DataTimeline from './DataTimeline';

import { useAlert } from 'react-alert';
import socketIOClient from "socket.io-client";
const socket = socketIOClient();



export default function Dashboard() {

    const [cookies] = useCookies(["user"]);
    const [activeState, setActiveState] = useState(true);
    const alert = useAlert()
    const [error, setError] = useState();
    const [successNotice, setSuccessNotice] = useState();
    const [curEvents,setCurEvents]=useState([]) //starting e ekbar query kore update nibe, er por theke socket handle korbe

    
    socket.on("frombackend", data => {
        setCurEvents(data);
    });


    useEffect(() => {
        if (successNotice) {
            alert.success(<div style={{ 'fontSize': '0.70em' }}>{successNotice}</div>)
            setSuccessNotice(undefined)
        }
    }, [successNotice])

    useEffect(() => {
        if (error) {
            alert.error(<div style={{ 'fontSize': '0.70em' }}>{error}</div>)
            setSuccessNotice(undefined)
        }
    }, [error])

    useEffect(() => {
        const getAllDashboardData = async (e) => {
            let token = localStorage.getItem("auth-token");
            try{
                const tokenResponse = await Axios.post(
                    "/api/users/tokenIsValid",
                    null,
                    { headers: { "x-auth-token": token } }
                );
                // console.log(searchQuery)
    
                if (tokenResponse.data) {
                    const username = cookies.username
                    try {
    
                        const apiData = await Axios.get(
                            "/api/settings/",
                            { headers: { "x-auth-token": token },params: { username: username } }
                        )
                        if (!apiData.data) {
                            window.location.replace("/settings", { path: '/' });
                        }
                        setActiveState(apiData.data.settings.activeState)
                    }catch(error){
                        window.location.replace("/settings", { path: '/' });
                        setError("Error updating data")
                        // alert.error(<div style={{ 'fontSize': '0.70em' }}>Error updating data</div>)
                    }
                    try{
                        const apiData = await Axios.get(
                            "/api/hookspublisher/events",
                            { headers: { "x-auth-token": token },params: { username: username } }
                        )
                        setCurEvents(apiData.data.curEvents)
                    }catch(error){
                        console.log(error)
                    }
                }
            }catch(error){
                setError("API missing/Server error")
                window.location.replace("/login", { path: '/' })
                // alert.error(<div style={{ 'fontSize': '0.70em' }}>Internal server error</div>)
            }
        }
        getAllDashboardData()
    }, [])


    return (
        <Fragment>
            <ModuleHeader moduleName={"Dashboard"} />
            <Row >
                <Col className="mb-2" sm align="right">

                    <small className="text-muted mr-2 ml-2" onClick={() => window.location.reload(false)}> <a href="#"><FaUndo /> Refresh data</a> </small>
                </Col>
            </Row>
            <CardDeck >
                <DashController title={"Plugin switch"} activeState={activeState} setActiveState={setActiveState} />
                <DashCard title={"Americommerce state"} activeState={activeState} />
                <DashCard title={"Infinite MLM state"} activeState={activeState} />

            </CardDeck>
            <Row>
                <DataTimeline curEvents={curEvents}/>
            </Row>
        </Fragment>
    )
}
