import React from "react";
import "../assets/style.css";


export default function SuccessNotice(props) {
  return (
    <div className="success-notice">
      <span>{props.message}</span>
      <button className="success-close-button" onClick={props.clearSuccessNotice}>X</button>
    </div>
  );
}