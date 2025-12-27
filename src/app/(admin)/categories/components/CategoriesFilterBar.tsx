import React, { useState } from "react";
import { Search, Download, Filter, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { FilterOption } from "@/types";

export interface CategoriesFilters {
  search: string;
  status: string;
}

interface CategoriesFilterBarProps {
  filters: CategoriesFilters;
  onFiltersChange: (filters: CategoriesFilters) => void;
  onExport?: () => void;
  statusOptions: FilterOption[];
  className?: string;
}

const CategoriesFilterBar: React.FC<CategoriesFilterBarProps> = ({
  filters,
  onFiltersChange,
  onExport,
  statusOptions,
  className = "",
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = filters.status !== "all";
  const activeFilterCount = filters.status !== "all" ? 1 : 0;

  const handleFilterChange = (key: keyof CategoriesFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const handleResetFilters = () => {
    onFiltersChange({
      search: filters.search, // Keep search term
      status: "all",
    });
  };

  const handleClearSearch = () => {
    onFiltersChange({
      ...filters,
      search: "",
    });
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
              placeholder="Search categories..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full pl-9 sm:pl-11 pr-10 sm:pr-12 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base transition-all"
            />
            {filters.search && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Toggle and Export */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant={hasActiveFilters ? "primary" : "outline"}
              size="md"
              onClick={() => setShowFilters(!showFilters)}
              leftIcon={<Filter className="w-4 h-4" />}
              className="relative"
            >
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-white text-primary rounded-full text-xs font-bold">
                  {activeFilterCount}
                </span>
              )}
            </Button>
            {onExport && (
              <Button
                variant="outline"
                size="md"
                onClick={onExport}
                leftIcon={<Download className="w-4 h-4" />}
              >
                <span className="hidden sm:inline">Export</span>
                <span className="sm:hidden">Export</span>
              </Button>
            )}
          </div>
        </div>

        {/* Expandable Filters Section */}
        {showFilters && (
          <div className="pt-4 border-t border-gray-200 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="w-full">
                  <Select
                    label="Status"
                    value={filters.status || "all"}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                    options={[
                      { value: "all", label: "All Status" },
                      ...statusOptions,
                    ]}
                    size="sm"
                    fullWidth
                  />
                </div>
              </div>

              {hasActiveFilters && (
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={handleResetFilters}
                    className="w-full sm:w-auto"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesFilterBar;

