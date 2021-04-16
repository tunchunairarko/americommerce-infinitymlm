import React, {Fragment,useEffect,useState} from 'react'
import { Row, Col, Card} from 'react-bootstrap'
import "../../../components/assets/style.css";
import { FaClock, FaUndo } from 'react-icons/fa';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

// export default function DashCard({title, value, image}) {
export default function DashCard({title, activeState}) {
    const [dateTime,setDateTime]=useState("")
    const [activeStateVal,setActiveStateVal]=useState(true)
    
    useEffect(()=>{
        setDateTime(new Date().toLocaleString())
    },[])

    useEffect(()=>{
        if(activeState=="Active"){
            setActiveStateVal(true)
        }
        else{
            setActiveStateVal(false)
        }
    },[activeState])

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
                        <BootstrapSwitchButton checked={activeStateVal} size="sm" disabled onLabel="Active" offLabel="Stopped" onstyle="success" offstyle="danger"/>
                    </Col>
                    <Col className="col-7">
                        <div className="numbers">
                            <Card.Title className="dashboard-card-title">{title}</Card.Title>
                            <Card.Subtitle className="dashboard-card-subtitle">{"Last update: "+dateTime}</Card.Subtitle>
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
