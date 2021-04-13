import React from "react";
import "../assets/style.css";


export default function ErrorNotice(props) {
  return (
    <div className="error-notice">
      <span>{props.message}</span>
      <button className="error-close-button" onClick={props.clearError}>X</button>
    </div>
  );
}