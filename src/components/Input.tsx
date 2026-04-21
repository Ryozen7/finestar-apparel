import React from "react";
import type { InputProps } from "../types";
import "../styles/Input.css";

const Input: React.FC<InputProps> = ({
  label,
  containerStyle,
  labelStyle,
  ...props
}) => (
  <div className="input-container" style={containerStyle}>
    {label && (
      <label className="input-label" style={labelStyle}>
        {label}
      </label>
    )}
    <input {...props} className="input-field" style={props.style} />
  </div>
);

export default Input;
