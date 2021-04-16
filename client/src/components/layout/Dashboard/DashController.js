import React, {Fragment, useState, useEffect} from 'react'
import { Row, Col, Card} from 'react-bootstrap'
import "../../../components/assets/style.css";
import { FaClock, FaUndo } from 'react-icons/fa';
import Axios from "axios";
import { useCookies } from "react-cookie";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { useAlert } from 'react-alert';
// export default function DashCard({title, value, image}) {
export default function DashController({title, activeState, setActiveState}) {
    const [cookies] = useCookies(["user"]);
    const [activeStateVal,setActiveStateVal]=useState(true)
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

    useEffect(()=>{
        if(activeState=="Active"){
            setActiveStateVal(true)
        }
        else{
            setActiveStateVal(false)
        }
    },[activeState])

    const handleActiveStateChange = async(val) =>{
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
                    let data ={username:username, activeState:"Active"}
                    if(val==false){
                        data = { username:username, activeState:"Stopped" }
                    }
                    
                    const resp = await Axios.post(
                        "/api/settings/changestate",
                        data,
                        {headers: {"x-auth-token":token}}
                    )
                    val ? setActiveState("Active") : setActiveState("Stopped")
                    setSuccessNotice("Updated settings")
                }
            
            }catch(error){
                setError("Error updating settings")
                // alert.error(<div style={{ 'fontSize': '0.70em' }}>Error updating settings</div>)
            }
    }

    return (
        <Fragment>
            <Card className="card-stats">
            <Card.Body align="right">
                <Row>
                    <Col className="col-5" align="left">
                        {/* <Card.Img
                        align="left"
                        src={image}
                        className="dashboard-card-img"                  
                        alt="Card image cap"
                        /> */}
                        <BootstrapSwitchButton 
                        checked={activeStateVal} 
                        size="sm" 
                        onLabel="Active" 
                        offLabel="Stopped" 
                        onstyle="success" 
                        offstyle="danger"
                        onChange={(checked) => {
                            handleActiveStateChange(checked)
                        }}
                        />
                    </Col>
                    <Col className="col-7">
                        <div className="numbers">
                            <Card.Title className="dashboard-card-title">{title}</Card.Title>
                            <Card.Subtitle className="dashboard-card-subtitle">{ activeStateVal ? "Active" : "Off"}</Card.Subtitle>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
            {/* <Card.Footer className="dashboard-card-footer">
                <small className="text-muted"><FaClock /> updated 5 minutes ago. </small>
            </Card.Footer> */}
            
          </Card>
        </Fragment>
    )
}
