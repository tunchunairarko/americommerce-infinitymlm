import React, { useState } from 'react'
import Scanner from './Scanner'
import { Button} from 'react-bootstrap'
import "../../components/assets/style.css"
import Quagga from 'quagga'
import { FaBarcode } from 'react-icons/fa';

export default function ScannerController({setSearchQuery}) {
    const [scanning, setScanning] = useState(false)
    

    const scan = () => {
        setScanning(!scanning)
    }

    const onDetected = (result) => {
        Quagga.stop()
        // console.log(result['codeResult']['code'])
        setSearchQuery(result['codeResult']['code'])
        handleScanner(false)
    }

    const handleScanner = (value) => {
        setScanning(value)
    }

    return (
        <div>
            <Button variant="success" onClick={scan}>
                <FaBarcode />
            </Button>
            
            {scanning ? <Scanner show={scanning} onDetected={onDetected} handleScanner={handleScanner} /> : null}
        </div>
    )
}
