import React, { Fragment, useEffect, useState } from 'react'
import { Modal, Button, Row, Image } from 'react-bootstrap'
import Axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import Loader from 'react-loader-spinner';
import "../../../components/assets/style.css"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useAlert } from 'react-alert';

// const SearchModal = ({ show, handleClose, searchQuery, onProductChosen, marketplace }) => {
const SearchModal = ({ show, handleClose, searchQuery, onProductChosen, marketplace }) => {
    const alert = useAlert()
    const [userChosenProduct, setUserChosenProduct] = useState({});
    const [loaderVisible, setLoaderVisible] = useState(true);
    //popup theke data niye ekhon form e boshaite hobe
    const [currentProductData, setCurrentProductData] = useState({
        productList: undefined,
    });
    
    useEffect(() => {
        const getProductList = async () => {            
            if(show===true){
                if(!currentProductData.productList){
                    setLoaderVisible(true)
                    if (searchQuery) {
                        // console.log(searchQuery)
                        let token = localStorage.getItem("auth-token");
                        if (token == null) {
                            localStorage.setItem("auth-token", "");
                            token = "";
                        }
                        else {
                            const tokenResponse = await Axios.post(
                                "/api/users/tokenIsValid",
                                null,
                                { headers: { "x-auth-token": token } }
                            );
                            // console.log(searchQuery)
                            
                            if (tokenResponse.data) {
                                const body = { searchQuery, marketplace };
                                // const body = { searchQuery };
                                try{
                                    const productRes = await Axios.post(
                                        "/api/products/productlist", 
                                        body,
                                        { headers: { "x-auth-token": token } }
                                    )
                                    
                                    if(productRes.data && productRes.data.length>0){
                                        setCurrentProductData({
                                            productList: productRes.data,
                                        });
                                        // console.log(productRes.data)
                                        // checkIfProductListIsOne(productRes.data)
                                        setLoaderVisible(false);
                                    }
                                    else{
                                        handleClose(currentProductData,loaderVisible)
                                        alert.error(<div style={{ 'font-size': '0.70em' }}>Error retrieving product</div>)
                                    }
                                }catch(error){
                                    console.log(error)
                                    handleClose(currentProductData,loaderVisible)
                                    alert.error(<div style={{ 'font-size': '0.70em' }}>Error retrieving product</div>)
                                }
                            }
        
                        }
                    }
                }
            }
        }        
        getProductList();
    },[show])
    useEffect(() =>{
        const nandakore = async () => {
            
            if(currentProductData.productList){
                if(currentProductData.productList.length==1){
                    onProductChosen(currentProductData.productList[0])
                    setCurrentProductData({
                        productList: undefined,
                    });
                    handleClose(currentProductData,loaderVisible);
                }
            }
            
        }
        nandakore();
    },[currentProductData])
    
    // const checkIfProductListIsOne = (productList)=>{
        
    //     if(productList){
    //         if(productList.length===1){
    //             // console.log(productList[0])
    //             onProductChosen(productList[0])
    //             handleClose(currentProductData,loaderVisible);
    //         }
    //     }
    // }
    
    const finishAll = (data) =>{
        console.log(data)
        onProductChosen(data[0])
        setCurrentProductData({
            productList: undefined,
        });
        handleClose(currentProductData,loaderVisible);
    }

    const chooseProduct = async (e) => {
        e.preventDefault();
        if (userChosenProduct) {
            const searchQuery = userChosenProduct['asinid'];
            const body = { searchQuery };
            try{
                const productRes = await Axios.post(
                    "/api/products/productlist", 
                    body
                ).then((result)=> finishAll(result.data))
                
            }catch(error){
                console.log(error)
                onProductChosen(userChosenProduct)
                setCurrentProductData({
                    productList: undefined,
                });
                handleClose(currentProductData,loaderVisible);
            }
            
        }
    }
    

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) =>{setUserChosenProduct(currentProductData.productList[rowIndex])},
        style: (row, rowIndex) => {
          const backgroundColor = rowIndex > 1 ? '#00BFFF' : '#00FFFF';
          return { backgroundColor };
        }
      };

      const columns=[
        {
            dataField: 'image',
            text: 'Image',
            formatter:imageFormatter
        },
        {
            dataField: 'asinid',
            text: 'UPC/ASIN'
        },
        {
            dataField: 'title',
            text: 'Title'
        },
        {
            dataField: 'price',
            text: 'Price'
        },
        {
            dataField: 'source',
            text: 'Source'
        }
    ]
    function imageFormatter(cell, row){
        return (<Image src={cell} fluid/>) ;
      }
      
    return (
        <Fragment>
            <Modal size="lg" show={show} onHide={(e)=>handleClose(currentProductData,loaderVisible)} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title id="searchResTitle">Search result for {searchQuery}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentProductData.productList ? (
                        <BootstrapTable
                        keyField="key"
                        data={ currentProductData.productList }
                        columns={ columns }
                        selectRow={ selectRow }
                        wrapperClasses="table-responsive"
                        rowClasses="text-nowrap"
                        
                      />
                    ) : (
                        
                        <Row className="justify-content-md-center">
                            <Loader
                            className="searchLoader"
                            type="TailSpin"
                            color="#00BFFF"
                            height={100}
                            width={100}
                            visible={loaderVisible} />
                        </Row>                        

                        )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={(e)=>handleClose(currentProductData,loaderVisible)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={chooseProduct}>Choose</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
};

export default SearchModal;
