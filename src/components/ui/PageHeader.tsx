import React from "react";
import Button from "./Button";
import { Plus } from "lucide-react";

export interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  onAdd?: () => void;
  addButtonText?: string;
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
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
        {description && (
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">{description}</p>
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

