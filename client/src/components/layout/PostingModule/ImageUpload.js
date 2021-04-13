import React, { useState, useRef } from "react";
import { Button } from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';

const ImageUpload = () => {
  const [image, setImage] = useState("");
  const inputFile = useRef(null);

  const handleFileUpload = e => {
    const { files } = e.target;
    if (files && files.length) {
      const filename = files[0].name;

      var parts = filename.split(".");
      const fileType = parts[parts.length - 1];
      console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.

      setImage(URL.createObjectURL(files[0]));
      console.log("imageimage", image);
    }
  };

  const onButtonClick = () => {
    inputFile.current.click();
  };

  
  return (
    <div>
      <input
        style={{ display: "none" }}
        // accept=".zip,.rar"
        ref={inputFile}
        onChange={handleFileUpload}
        type="file"
      />
      <Button variant="primary" onClick={onButtonClick} block><FaUpload /> Upload manually</Button>
    </div>
  );
};

export default ImageUpload;