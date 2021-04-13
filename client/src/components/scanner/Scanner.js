import React, { useEffect } from 'react'
import Quagga from 'quagga'
import { Modal } from 'react-bootstrap'
import "../../components/assets/style.css"
import useWindowDimensions from './useWindowDimensions';

export default function Scanner({ show, onDetected, handleScanner }) {
    const { height, width } = useWindowDimensions();
    useEffect(() => {
        Quagga.init(
            {
                inputStream: {
                    type: 'LiveStream',
                    constraints: {
                        width: width/2,
                        height:height/2,
                        facingMode: 'environment', // or user
                    },
                },
                locator: {
                    patchSize: 'small',
                    halfSample: true,
                },
                numOfWorkers: 4,
                decoder: {
                    readers: ['ean_reader', 'upc_reader', 'upc_e_reader'],
                },
                locate: true,
            },
            function (err) {
                if (err) {
                    return console.log(err)
                }
                Quagga.start()
            },
        )
        Quagga.onDetected(handleDetected)
        return function cleanup() {
            Quagga.offDetected(onDetected)
            Quagga.stop()
        }
    }, [])
    const handleDetected = (result) => {
        onDetected(result)
    }
    return (
        <Modal size="lg"  show={show} onHide={(e)=>handleScanner(false)} backdrop="static" keyboard={false} centered>
            <Modal.Header closeButton>
                <Modal.Title id="searchResTitle">Scan barcode</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{width:width/2, height:height*3/5.5}}>
                <center>
                    <div id="interactive" className="viewport" style={{ width:width/2, height:height*3/5.5}}>

                    </div>
                </center>
            </Modal.Body>

        </Modal>

    )
}
