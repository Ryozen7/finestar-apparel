import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const base = 'btn';
  const variantClass = `btn-${variant}`;
  return (
    <button className={`${base} ${variantClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
};

export default Button;
