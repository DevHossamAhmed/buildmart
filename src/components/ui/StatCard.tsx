import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon?: LucideIcon;
  iconColor?: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  change,
  icon: Icon,
  iconColor = "bg-blue-500",
  trend,
  className = "",
}) => {
  const getTrendColor = () => {
    if (trend === "up") return "text-green-600";
    if (trend === "down") return "text-red-600";
    return "text-gray-600";
  };

  const getTrendIcon = () => {
    if (trend === "up")
      return (
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      );
    if (trend === "down")
      return (
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
          />
        </svg>
      );
    return null;
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6 hover:shadow-md transition-all duration-200 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1.5 sm:mb-2">
            {label}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5 sm:mb-2">
            {value}
          </p>
          {change && (
            <div className={`flex items-center gap-1 text-xs ${getTrendColor()}`}>
              {getTrendIcon()}
              <span className="font-medium">{change}</span>
              <span className="text-gray-500">from last month</span>
            </div>
          )}
        </div>
        {Icon && (
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${iconColor} bg-opacity-10 flex items-center justify-center flex-shrink-0`}
          >
            <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${iconColor.replace("bg-", "text-")}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;

