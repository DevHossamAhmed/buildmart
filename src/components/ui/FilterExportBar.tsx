import React, { useState } from "react";
import { Search, Download, Filter, X, ChevronDown } from "lucide-react";
import Button from "./Button";
import Select from "./Select";
import { FilterOption } from "@/types";

interface FilterExportBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: {
    key: string;
    label: string;
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
  }[];
  onExport?: () => void;
  exportLabel?: string;
  className?: string;
}

const FilterExportBar: React.FC<FilterExportBarProps> = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters = [],
  onExport,
  exportLabel = "Export",
  className = "",
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const hasActiveFilters = filters.some((filter) => filter.value && filter.value !== "all");

  const handleResetFilters = () => {
    filters.forEach((filter) => {
      if (filter.onChange) {
        filter.onChange("all");
      }
    });
    onSearchChange("");
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5 ${className}`}>
      <div className="flex flex-col gap-4">
        {/* Main Search and Actions Row */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 sm:pl-11 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base transition-all"
            />
            {searchValue && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Toggle and Export */}
          <div className="flex items-center gap-2 sm:gap-3">
            {filters.length > 0 && (
              <Button
                variant={hasActiveFilters ? "primary" : "outline"}
                size="md"
                onClick={() => setShowFilters(!showFilters)}
                leftIcon={<Filter className="w-4 h-4" />}
                className="relative"
              >
                Filters
                {hasActiveFilters && (
                  <span className="ml-1.5 px-1.5 py-0.5 bg-white text-primary rounded-full text-xs font-bold">
                    {filters.filter((f) => f.value && f.value !== "all").length}
                  </span>
                )}
              </Button>
            )}
            {onExport && (
              <Button
                variant="outline"
                size="md"
                onClick={onExport}
                leftIcon={<Download className="w-4 h-4" />}
              >
                <span className="hidden sm:inline">{exportLabel}</span>
                <span className="sm:hidden">Export</span>
              </Button>
            )}
          </div>
        </div>

        {/* Expandable Filters Section */}
        {showFilters && filters.length > 0 && (
          <div className="pt-4 border-t border-gray-200 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-end">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full">
                {filters.map((filter) => (
                  <div key={filter.key} className="w-full">
                    <Select
                      label={filter.label}
                      value={filter.value || "all"}
                      onChange={(e) => filter.onChange(e.target.value)}
                      options={[
                        { value: "all", label: `All ${filter.label}` },
                        ...filter.options,
                      ]}
                      size="sm"
                      fullWidth
                    />
                  </div>
                ))}
              </div>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="md"
                  onClick={handleResetFilters}
                  className="w-full sm:w-auto whitespace-nowrap"
                >
                  Clear All
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterExportBar;

