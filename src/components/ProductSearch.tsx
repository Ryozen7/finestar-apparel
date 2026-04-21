import React, { useState, useEffect, useCallback, useRef } from "react";
import Input from "./Input";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
  loading: boolean;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ value, onChange, loading }) => {
  const [inputValue, setInputValue] = useState(value);


  // Debounce with useCallback
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debouncedOnChange = useCallback((val: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange(val);
    }, 400);
  }, [onChange]);

  useEffect(() => {
    debouncedOnChange(inputValue);
    // Only run when inputValue changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="product-search-wrapper" style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Input
        type="text"
        placeholder="Search products..."
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        className="product-list-toolbar-input"
      />
      {loading && (
        <span className="product-search-spinner" style={{ marginLeft: 4 }}>
          <svg width="20" height="20" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#888">
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
      )}
    </div>
  );
};

export default ProductSearch;
