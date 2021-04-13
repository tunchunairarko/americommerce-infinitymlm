import React, {Fragment,useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaSearch } from 'react-icons/fa';
import { Card } from 'react-bootstrap';
import SearchModal from './SearchModal';
import ScannerController from '../../scanner/ScannerController';

export default function SearchModule({setTitle,setRetail,setUpc,setDescription,setImage}) {
    let [show, setShow] = useState(false);
    const [marketPlace] = useState({
        US:true,
        CA:false,
        UK:false,
        FR:false,
        DE:false,
        ES:false,
        IT:false,
        MX:false,
        JP:false,
        IN:false,
        AU:false,
        NL:false,
        SE:false,
        AE:false,
        SG:false,
    })

    const handleCheckBoxChange = (key) =>{
        // console.log(marketPlace)
        
        marketPlace[key]=!marketPlace[key];
        // console.log(marketPlace)
    }

    const [searchQuery, setSearchQuery] = useState("");
    
    const handleClose = (currentProductData,loaderVisible) => {
        currentProductData.productList=undefined;
        loaderVisible=true;
        if(loaderVisible===true){
            setShow(false);
        }
    };
    const handleShow = () => {setShow(true)};

    
    const handleSearchQuery = (value) => {
        setSearchQuery(searchQuery);
        if(searchQuery){
            handleShow();
        }        
    };
    
    const setUserChosenProductData = (product) =>{
        // console.log("papi")
        // console.log(product)
        setTitle(product.title)
        setRetail(product.price)
        setDescription(product.description)
        setImage(product.image)
        setUpc(product.asinid)
    }


    return (
        <Fragment>
            <Card className="box-design">
                    <Form.Row className="mt-3 pl-2 pr-2">
                        <Form.Group className="pl-2 pr-2 force-100">
                            <InputGroup>
                                <Form.Control
                                    id="searchText"
                                    type="text"
                                    value={searchQuery}
                                    placeholder="Search here.."
                                    onInput={e => setSearchQuery(e.target.value)}
                                    onChange={e => setSearchQuery(e.target.value)}
                                />
                                <InputGroup.Append>
                                    <Button variant="primary" onClick={() => handleSearchQuery(searchQuery)}>
                                        <FaSearch />
                                    </Button>
                                    <ScannerController setSearchQuery={setSearchQuery}/>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row className="mt-2 pl-3 pr-3">
                        {['checkbox'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Check inline label="US" type={type} id={`inline-${type}-1`} defaultChecked onChange={(e) => handleCheckBoxChange('US')}/>
                                <Form.Check inline label="CA" type={type} id={`inline-${type}-2`} onChange={(e) => handleCheckBoxChange('CA')}/>
                                <Form.Check inline label="UK" type={type} id={`inline-${type}-1`} onChange={(e) => handleCheckBoxChange('UK')}/>
                                <Form.Check inline label="FR" type={type} id={`inline-${type}-3`} onChange={(e) => handleCheckBoxChange('FR')}/> 
                                <Form.Check inline label="DE" type={type} id={`inline-${type}-4`} onChange={(e) => handleCheckBoxChange('DE')}/> 
                                <Form.Check inline label="ES" type={type} id={`inline-${type}-5`} onChange={(e) => handleCheckBoxChange('ES')}/>
                                <Form.Check inline label="IT" type={type} id={`inline-${type}-6`} onChange={(e) => handleCheckBoxChange('IT')}/>
                                <Form.Check inline label="MX" type={type} id={`inline-${type}-7`} onChange={(e) => handleCheckBoxChange('MX')}/>
                                <Form.Check inline label="JP" type={type} id={`inline-${type}-8`} onChange={(e) => handleCheckBoxChange('JP')}/>
                                <Form.Check inline label="IN" type={type} id={`inline-${type}-9`} onChange={(e) => handleCheckBoxChange('IN')}/>
                                <Form.Check inline label="AU" type={type} id={`inline-${type}-10`} onChange={(e) => handleCheckBoxChange('AU')}/>
                                <Form.Check inline label="NL" type={type} id={`inline-${type}-11`} onChange={(e) => handleCheckBoxChange('NL')}/>
                                <Form.Check inline label="SE" type={type} id={`inline-${type}-12`} onChange={(e) => handleCheckBoxChange('SE')}/>
                                <Form.Check inline label="AE" type={type} id={`inline-${type}-13`} onChange={(e) => handleCheckBoxChange('AE')}/>
                                <Form.Check inline label="SG" type={type} id={`inline-${type}-14`} onChange={(e) => handleCheckBoxChange('SG')}/>
                            </div>
                        ))}

                    </Form.Row>
                </Card>
                {/* <SearchModal show={show} handleClose={handleClose} searchQuery={searchQuery} onProductChosen={setUserChosenProductData} marketplace={marketPlace}/> */}
                <SearchModal show={show} handleClose={handleClose} searchQuery={searchQuery} onProductChosen={setUserChosenProductData} marketplace={marketPlace}/>
        </Fragment>
    )
}
