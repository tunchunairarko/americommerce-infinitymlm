import React, { Fragment, useEffect, useState } from 'react'
import "../../../components/assets/style.css";
import { FaClock } from 'react-icons/fa';
import { Timeline, TimelineEvent } from 'react-event-timeline'

// export default function DashCard({title, value, image}) {
export default function DataTimeline({ curEvents }) {
    const [dateTime, setDateTime] = useState("")
    useEffect(() => {
        setDateTime(new Date().toLocaleString())
    }, [])

    return (
        <Fragment>
            <div style={{ marginTop: '20px', paddingLeft: '10px', paddingBottom: '10px', minWidth: '100%' }}>
                <h4>Live activity log</h4>
                <hr></hr>
                <Timeline>
                    {
                        curEvents.map((event, index) => {
                            if (event.eventType === "customer") {
                                <TimelineEvent
                                    title="New customer created"
                                    createdAt={dateTime}
                                    icon={<FaClock />}
                                    iconColor="#757575"
                                    buttons={<i />}
                                    container="card"
                                    eventKey={index}
                                    cardHeaderStyle={{ backgroundColor: '#10ac84', color: '#fff' }}>
                                    Customer name: {event.eventData.customer.first_name+event.eventData.customer.last_name}
                            </TimelineEvent>
                            }
                            else if (event.eventType === "payment") {
                                <TimelineEvent
                                    title="New payment processed"
                                    createdAt={dateTime}
                                    icon={<FaClock />}
                                    iconColor="#757575"
                                    buttons={<i />}
                                    container="card"
                                    eventKey={index}
                                    cardHeaderStyle={{ backgroundColor: '#10ac84', color: '#fff' }}>
                                    Customer name: {event.eventData.customer.first_name+event.eventData.customer.last_name} <br />
                                    Payment type: {event.eventData.order_payment.payment_type}
                            </TimelineEvent>
                            }
                            else if (event.eventType === "order") {
                                <TimelineEvent
                                    title="Order created/updated/processed"
                                    createdAt={dateTime}
                                    icon={<FaClock />}
                                    iconColor="#757575"
                                    buttons={<i />}
                                    container="card"
                                    eventKey={index}
                                    cardHeaderStyle={{ backgroundColor: '#10ac84', color: '#fff' }}>
                                    Customer name: {event.eventData.customer.first_name+event.eventData.customer.last_name}
                            </TimelineEvent>
                            }
                            else {
                                <TimelineEvent
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
                                    Error log: API Timeout reached
                                </TimelineEvent>
                            }
                        })
                    }



                </Timeline>
            </div>
        </Fragment >
    )
}
