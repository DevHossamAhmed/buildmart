import React from "react";
import { BadgeVariant, Status } from "@/types";
import { STATUS_COLORS } from "@/constants";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant | Status;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  className = "",
}) => {
  const getVariantClasses = (): string => {
    // Check if it's a status variant
    if (variant in STATUS_COLORS) {
      const statusColors = STATUS_COLORS[variant as Status];
      return `${statusColors.bg} ${statusColors.text} ${statusColors.border}`;
    }

    // Standard variants
    const variantClasses: Record<BadgeVariant, string> = {
      default: "bg-gray-100 text-gray-700 border-gray-300",
      success: "bg-success-light text-success-dark border-success",
      error: "bg-error-light text-error-dark border-error",
      warning: "bg-warning-light text-warning-dark border-warning",
      info: "bg-info-light text-info-dark border-info",
    };
    return variantClasses[variant as BadgeVariant] || variantClasses.default;
  };

  const sizeClasses = {
    sm: "px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs",
    md: "px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs sm:text-sm",
    lg: "px-2.5 sm:px-3 py-1 sm:py-1.5 text-sm sm:text-base",
  };

  return (
    <span
      className={`inline-flex items-center font-medium border rounded-full ${getVariantClasses()} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;

