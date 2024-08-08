import React from "react";
import "./style.css";

function Button({ text, onClick, green, disabled }) {
  return (
    <div className={green ? "btn btn-green" : "btn"} onClick={onClick} disabled={disabled}>
      {text}
    </div>
  );
}

export default Button;
