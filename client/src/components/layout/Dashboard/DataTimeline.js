import React, { Fragment, useEffect, useState } from 'react'
import "../../../components/assets/style.css";
import { FaClock } from 'react-icons/fa';
import { Timeline, TimelineEvent } from 'react-event-timeline'

// export default function DashCard({title, value, image}) {
export default function DataTimeline({ curEvents }) {
    const [dateTime, setDateTime] = useState(new Date().toLocaleString())
    useEffect(() => {
        setDateTime(new Date().toLocaleString())
    }, [])

    return (
        <Fragment>
            <div style={{ marginTop: '20px', paddingLeft: '10px', paddingBottom: '10px', minWidth: '100%' }}>
                <h4>Live activity log</h4>
                <hr></hr>
                <Timeline style={{maxHeight:"700px",overflowY:"auto"}}>
                    {curEvents.length>0 ? 
                            
                            curEvents.map((event, index) => {
                                if (event.eventType === "customer") {
                                    return(
                                        <TimelineEvent
                                        key={index}
                                        title="New customer created"
                                        createdAt={dateTime}
                                        icon={<FaClock />}
                                        iconColor="#757575"
                                        buttons={<i />}
                                        container="card"
                                        eventKey={index}
                                        cardHeaderStyle={{ backgroundColor: '#10ac84', color: '#fff' }}>
                                        Customer name: {event.eventData.first_name+event.eventData.last_name}
                                </TimelineEvent>
                                    )
                                }
                                else if (event.eventType === "payment") {
                                    return(
                                        <TimelineEvent
                                        key={index}
                                        title="New payment processed"
                                        createdAt={dateTime}
                                        icon={<FaClock />}
                                        iconColor="#757575"
                                        buttons={<i />}
                                        container="card"
                                        eventKey={index}
                                        cardHeaderStyle={{ backgroundColor: '#10ac84', color: '#fff' }}>
                                        Customer name: {event.eventData.first_name+event.eventData.last_name} <br />
                                        Payment type: {event.eventData.order_payment.payment_type}
                                </TimelineEvent>
                                    )
                                }
                                else if (event.eventType === "order") {
                                    return(
                                        <TimelineEvent
                                        key={index}
                                        title="Order created/updated/processed"
                                        createdAt={dateTime}
                                        icon={<FaClock />}
                                        iconColor="#757575"
                                        buttons={<i />}
                                        container="card"
                                        eventKey={index}
                                        cardHeaderStyle={{ backgroundColor: '#10ac84', color: '#fff' }}>
                                        Customer name: {event.eventData.first_name+event.eventData.last_name}
                                </TimelineEvent>
                                    )
                                }
                                else {
                                    return(
                                        <TimelineEvent
                                        key={index}
                                        title="Error"
                                        createdAt={dateTime}
                                        icon={<FaClock />}
                                        iconColor="#757575"
                                        buttons={<i />}
                                        container="card"
                                        eventKey={index}
                                        style={{
                                            boxShadow: '0 0 6px 1px #BD3B36',
                                            border: '1px solid #777',
                                            borderRadius: 3,
    
                                        }}
                                        cardHeaderStyle={{ backgroundColor: '#c23616', color: '#fff' }}
                                    >
                                        Error updating data
                                    </TimelineEvent>
                                    )
                                }
                            })
                        :<div ></div>
                    }



                </Timeline>
            </div>
        </Fragment >
    )
}
