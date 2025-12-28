import React from "react";
import Button from "./Button";
import { Plus } from "lucide-react";

export interface PageHeaderProps {
  /** Page title - can be string or React element */
  title: React.ReactNode;
  /** Optional page description - can be string or React element */
  description?: React.ReactNode;
  /** Optional custom actions (buttons, etc.) */
  actions?: React.ReactNode;
  /** Optional add button handler */
  onAdd?: () => void;
  /** Optional add button text (default: "Add New") */
  addButtonText?: string;
  /** Additional CSS classes */
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions,
  onAdd,
  addButtonText = "Add New",
  className = "",
}) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 ${className}`}>
      <div>
        {typeof title === 'string' ? (
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            {title}
          </h1>
        ) : (
          <div>{title}</div>
        )}
        
        {description && (
          typeof description === 'string' ? (
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">
              {description}
            </p>
          ) : (
            <div className="mt-1 sm:mt-2">{description}</div>
          )
        )}
      </div>
      
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        {actions}
        {onAdd && (
          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="w-4 h-4 sm:w-5 sm:h-5" />}
            onClick={onAdd}
            className="w-full sm:w-auto"
            style={{ backgroundColor: "#d92335" }}
          >
            {addButtonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;