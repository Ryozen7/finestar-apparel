import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
}

const Input: React.FC<InputProps> = ({ label, containerStyle, labelStyle, ...props }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, ...containerStyle }}>
    {label && <label style={{ fontWeight: 500, marginBottom: 2, ...labelStyle }}>{label}</label>}
    <input {...props} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', ...props.style }} />
  </div>
);

export default Input;
