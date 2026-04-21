import { type FC } from "react";
import type { ButtonProps } from "../types";
import "../styles/Button.css";

const Button: FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  loading = false,
  disabled,
  ...props
}) => {
  const base = "btn";
  const variantClass = `btn-${variant}`;
  return (
    <button
      className={`${base} ${variantClass} ${className}`.trim()}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <span className="btn-spinner">
          <svg
            width="18"
            height="18"
            viewBox="0 0 38 38"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#fff"
          >
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
