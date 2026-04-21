import React from 'react';


export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  loading?: boolean;
}


const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', loading = false, disabled, ...props }) => {
  const base = 'btn';
  const variantClass = `btn-${variant}`;
  return (
    <button
      className={`${base} ${variantClass} ${className}`.trim()}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <span className="btn-spinner" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 6 }}>
          <svg width="18" height="18" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
            <g fill="none" fillRule="evenodd">
              <g transform="translate(1 1)" strokeWidth="3">
                <circle strokeOpacity=".3" cx="18" cy="18" r="18" />
                <path d="M36 18c0-9.94-8.06-18-18-18">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </path>
              </g>
            </g>
          </svg>
        </span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
