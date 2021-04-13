import React, { Fragment, useEffect, useState } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import "../../../components/assets/style.css";
import { FaClock, FaUndo } from 'react-icons/fa';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { Timeline, TimelineEvent } from 'react-event-timeline'

// export default function DashCard({title, value, image}) {
export default function DataTimeline({ title, activeState }) {
    const [dateTime, setDateTime] = useState("")
    useEffect(() => {
        setDateTime(new Date().toLocaleString())
    }, [])

    return (
        <Fragment>
            <div style={{marginTop:'20px',paddingLeft:'10px',paddingBottom:'10px', minWidth:'100%'}}>
                <h4>Live activity log</h4>
                <hr></hr>
                <Timeline>
                    <TimelineEvent
                        title="New customer created"
                        createdAt={dateTime}
                        icon={<FaClock />}
                        iconColor="#757575"
                        buttons={<i />}
                        container="card"
                        
                        cardHeaderStyle={{ backgroundColor: '#10ac84', color: '#fff' }}
                    >
                        Customer name: Jackson Deville
                            </TimelineEvent>
                    <TimelineEvent
                        title="Customer creation error"
                        createdAt={dateTime}
                        icon={<FaClock />}
                        iconColor="#757575"
                        buttons={<i />}
                        container="card"
                        style={{
                            boxShadow: '0 0 6px 1px #BD3B36',
                            border: '1px solid #777',
                            borderRadius: 3,

                        }}
                        cardHeaderStyle={{ backgroundColor: '#c23616', color: '#fff' }}
                    >
                        Error log: API Timeout reached
                            </TimelineEvent>
                </Timeline>
            </div>
        </Fragment >
    )
}
