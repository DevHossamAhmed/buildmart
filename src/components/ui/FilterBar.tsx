import React from "react";
import { Filter } from "lucide-react";
import Button from "./Button";
import Select from "./Select";
import { FilterConfig } from "@/types";

interface FilterBarProps {
  filters: FilterConfig[];
  values: Record<string, any>;
  onChange: (key: string, value: any) => void;
  onReset?: () => void;
  className?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  values,
  onChange,
  onReset,
  className = "",
}) => {
  const hasActiveFilters = Object.values(values).some(
    (value) => value !== "" && value !== null && value !== undefined
  );

  return (
    <div className={`flex flex-wrap items-center gap-2 sm:gap-3 ${className}`}>
      <div className="flex items-center gap-1.5 sm:gap-2 text-gray-700">
        <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-xs sm:text-sm font-medium">Filters:</span>
      </div>
      
      {filters.map((filter) => (
        <div key={filter.key} className="w-full sm:w-auto min-w-[120px] sm:min-w-[150px]">
          {filter.type === "select" && (
            <Select
              value={values[filter.key] || ""}
              onChange={(e) => onChange(filter.key, e.target.value)}
              options={filter.options || []}
              placeholder={`All ${filter.label}`}
              size="sm"
            />
          )}
        </div>
      ))}

      {hasActiveFilters && onReset && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="w-full sm:w-auto"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export default FilterBar;

