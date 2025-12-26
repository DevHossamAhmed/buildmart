import React, { InputHTMLAttributes, forwardRef } from "react";
import { InputSize } from "@/types";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  size?: InputSize;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = true,
      size = "md",
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = "w-full border rounded-lg outline-none transition-all placeholder-gray-400";
    const stateClasses = error
      ? "border-error"
      : "border-gray-200";
    const backgroundClasses = "bg-white text-gray-900";
    
    const sizeClasses: Record<InputSize, string> = {
      sm: "px-3 py-1.5 text-xs sm:text-sm",
      md: "px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base",
      lg: "px-5 sm:px-6 py-3 sm:py-4 text-base sm:text-lg",
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
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`${baseClasses} ${stateClasses} ${backgroundClasses} ${sizeClasses[size]} ${
              leftIcon ? "pl-10" : ""
            } ${rightIcon ? "pr-10" : ""} ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
              {rightIcon}
            </div>
          )}
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

Input.displayName = "Input";

export default Input;

