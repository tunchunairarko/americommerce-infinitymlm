import React, { Fragment, useState, useEffect } from 'react'
import Axios from "axios";
import { Card, Row, Col, Form, Button } from 'react-bootstrap'
import "../assets/style.css";
import { FaUpload } from 'react-icons/fa';
import ModuleHeader from "../layout/ModuleHeader/ModuleHeader";
import { useCookies } from "react-cookie";
import axios from 'axios';
import { useAlert } from 'react-alert';
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";

export default function ApiSettings() {
    const [cookies] = useCookies(["user"]);
    const [activeState, setActiveState] = useState("Active"); //dui jaigatei off korar bebostha thakbe
    const [amcomApi, setAmcomApi] = useState("");
    const [mlmWebHook, setMlmWebHook] = useState("");
    const alert = useAlert()
    const [error, setError] = useState();
    const [successNotice, setSuccessNotice] = useState();

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
        const getAllSettingsData = async (e) => {
            let token = localStorage.getItem("auth-token");
            const tokenResponse = await Axios.post(
                "/api/users/tokenIsValid",
                null,
                { headers: { "x-auth-token": token } }
            );
            // console.log(searchQuery)

            if (tokenResponse.data) {
                try {
                    const username = cookies.username
                    const apiData = await Axios.get(
                        "/api/settings/",
                        { headers: { "x-auth-token": token }, params: { username: username } }
                    )
                    console.log(apiData.data)
                    if (apiData.data) {
                        setAmcomApi(apiData.data.settings.amcomApi)
                        setMlmWebHook(apiData.data.settings.mlmWebHook)
                        setActiveState(apiData.data.settings.activeState)
                    }
                }catch(err){
                    setError("Error updating settings")
                }
                // const body = { username };
                // const dashboardRes = await Axios.post(
                //     "/api/products/dashboarddata", 
                //     body,
                //     { headers: { "x-auth-token": token }}
                // );
                // setUserUpload(dashboardRes.data.userPostedProductsCount);
                // setTotalUpload(dashboardRes.data.totPostedProductsCount);
                // setBestUploader(dashboardRes.data.bestPoster);
            }
        }
        getAllSettingsData()
    }, [])

    const handleActiveState = async (val) => {
        setActiveState(val)
    }
    const handleAmComApi = async (val) => {
        setAmcomApi(val)
    }
    const handleMlmWebhook = async (val) => {
        setMlmWebHook(val)
    }

    const handleSettingsUpdate = async (e) => {
        let token = localStorage.getItem("auth-token");
        const tokenResponse = await Axios.post(
            "/api/users/tokenIsValid",
            null,
            { headers: { "x-auth-token": token } }
        );
        // console.log(searchQuery)

        if (tokenResponse.data) {
            const username = cookies.username
            let data = { username, amcomApi, mlmWebHook, activeState }
            try {
                const updateResp = await axios.post(
                    "/api/settings/update",
                    data,
                    { headers: { "x-auth-token": token } }
                )
                try {
                    setSuccessNotice("Settings updated successfully");

                } catch (err) {
                    setError("Error updating settings")
                }
            } catch (err) {
                setError("Internal server error")
            }
        }
    }

    return (
        <Fragment>
            <ModuleHeader moduleName={"Settings"} />
            <Card className="box-design mt-2">
                <Row className="ml-3 pr-3 mt-3">
                    <Col xs={12} sm={12}>
                        <Form>
                            <Form.Group as={Row} controlId="titleText">
                                <Form.Label column sm="2">
                                    Americommerce API key
                                    </Form.Label>
                                <Col sm="4">
                                    <Form.Control type="text" value={amcomApi} onChange={(e) => handleAmComApi(e.target.value)} />
                                </Col>
                                <Form.Label column sm="2">
                                    Infinite MLM webhook
                                    </Form.Label>
                                <Col sm="4">
                                    <Form.Control type="text" value={mlmWebHook} onChange={(e) => handleMlmWebhook(e.target.value)} />
                                </Col>

                            </Form.Group>
                            <Form.Group as={Row} controlId="api2">
                                <Form.Label column sm="2">
                                    Plugin active state
                                    </Form.Label>
                                <Col sm="4">
                                    <Combobox
                                        defaultValue={activeState}
                                        value={activeState}
                                        data={["Active", "Stopped"]}
                                        onChange={(value) => handleActiveState(value)}
                                    />
                                    {/* <Form.Control type="text" value={activeState} onChange={(e) => handleActiveState(e.target.value)} /> */}
                                </Col>
                                <Col sm="6" >
                                    <Button variant="info" block onClick={handleSettingsUpdate} ><FaUpload /> Save settings </Button>
                                </Col>
                            </Form.Group>


                        </Form>
                    </Col>
                </Row>
            </Card>
        </Fragment>
    )
}
