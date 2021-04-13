import React, { Fragment, useState } from 'react'
import '../../assets/style.css';
import DownloadedProductData from './DownloadedProductData';
import SearchModule from './SearchModule';
// import { Redirect } from 'react-router-dom';
// import UserContext from "../../../context/UserContext"; 
// import Dummy from '../../assets/dummy-prod.png';
import ModuleHeader from "../ModuleHeader/ModuleHeader";

export default function PostingModule() {
    
    
    const [title,setTitle] = useState("");
    const [upc,setUpc] = useState("");
    const [retail,setRetail] = useState("");
    const [image,setImage] = useState("https://cdn.shopify.com/s/files/1/0514/3520/8854/files/surplus-auction.png?v=1609197903");
    const [description,setDescription] = useState("<p>Enter your description here</p>");
    
    

    return (
        <Fragment>
            
            <div>
                <ModuleHeader moduleName={"Posting Module"}/>
                <SearchModule setTitle={setTitle} setRetail={setRetail} setUpc={setUpc} setDescription={setDescription} setImage={setImage}/>
                {/* Later on I will add context here */}
                <DownloadedProductData 
                title={title}
                upc={upc}
                retail={retail}
                image={image}
                description={description}
                setTitle={setTitle} setRetail={setRetail} setUpc={setUpc} setDescription={setDescription} setImage={setImage}
                />
            </div>
            
        </Fragment >
        
    )
}
