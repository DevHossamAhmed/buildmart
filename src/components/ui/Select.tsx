import React, { SelectHTMLAttributes, forwardRef } from "react";
import { InputSize } from "@/types";

interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
  size?: InputSize;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder,
      fullWidth = true,
      size = "md",
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = "w-full border rounded-lg outline-none transition-all appearance-none bg-white";
    const stateClasses = error
      ? "border-error"
      : "border-gray-200";
    
    const sizeClasses: Record<InputSize, string> = {
      sm: "px-3 pr-8 py-1.5 text-xs sm:text-sm",
      md: "px-4 sm:px-5 pr-9 sm:pr-10 py-2 sm:py-2.5 text-sm sm:text-base",
      lg: "px-5 sm:px-6 pr-10 sm:pr-12 py-3 sm:py-4 text-base sm:text-lg",
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
      <div className={widthClass}>
        {label && (
          <label
            htmlFor={props.id}
            className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`${baseClasses} ${stateClasses} ${sizeClasses[size]} ${className}`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 pointer-events-none">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-colors duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {error && (
          <p className="mt-1.5 text-xs sm:text-sm text-error">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-xs sm:text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;

