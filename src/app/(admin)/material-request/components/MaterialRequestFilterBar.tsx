import React, { useState } from "react";
import { Search, Download, Filter, X, Calendar } from "lucide-react";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { FilterOption } from "@/types";

export interface MaterialRequestFilters {
  search: string;
  status: string;
  priority: string;
  project: string;
  requestedBy: string;
  dateFrom: string;
  dateTo: string;
}

interface MaterialRequestFilterBarProps {
  filters: MaterialRequestFilters;
  onFiltersChange: (filters: MaterialRequestFilters) => void;
  onExport?: () => void;
  statusOptions: FilterOption[];
  priorityOptions: FilterOption[];
  projectOptions: FilterOption[];
  requestedByOptions: FilterOption[];
  className?: string;
}

const MaterialRequestFilterBar: React.FC<MaterialRequestFilterBarProps> = ({
  filters,
  onFiltersChange,
  onExport,
  statusOptions,
  priorityOptions,
  projectOptions,
  requestedByOptions,
  className = "",
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters =
    filters.status !== "all" ||
    filters.priority !== "all" ||
    filters.project !== "all" ||
    filters.requestedBy !== "all" ||
    filters.dateFrom !== "" ||
    filters.dateTo !== "";

  const activeFilterCount =
    (filters.status !== "all" ? 1 : 0) +
    (filters.priority !== "all" ? 1 : 0) +
    (filters.project !== "all" ? 1 : 0) +
    (filters.requestedBy !== "all" ? 1 : 0) +
    (filters.dateFrom !== "" ? 1 : 0) +
    (filters.dateTo !== "" ? 1 : 0);

  const handleFilterChange = (key: keyof MaterialRequestFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const handleResetFilters = () => {
    onFiltersChange({
      search: filters.search, // Keep search term
      status: "all",
      priority: "all",
      project: "all",
      requestedBy: "all",
      dateFrom: "",
      dateTo: "",
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
          {/* Search Input - Only for Material ID and Request Title */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search by Material ID or Request Title..."
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
              {/* First Row - Status, Priority, Project */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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
                <div className="w-full">
                  <Select
                    label="Priority"
                    value={filters.priority || "all"}
                    onChange={(e) => handleFilterChange("priority", e.target.value)}
                    options={[
                      { value: "all", label: "All Priority" },
                      ...priorityOptions,
                    ]}
                    size="sm"
                    fullWidth
                  />
                </div>
                <div className="w-full">
                  <Select
                    label="Project"
                    value={filters.project || "all"}
                    onChange={(e) => handleFilterChange("project", e.target.value)}
                    options={[
                      { value: "all", label: "All Projects" },
                      ...projectOptions,
                    ]}
                    size="sm"
                    fullWidth
                  />
                </div>
              </div>

              {/* Second Row - Requested By, Date From, Date To */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="w-full">
                  <Select
                    label="Requested By"
                    value={filters.requestedBy || "all"}
                    onChange={(e) => handleFilterChange("requestedBy", e.target.value)}
                    options={[
                      { value: "all", label: "All Users" },
                      ...requestedByOptions,
                    ]}
                    size="sm"
                    fullWidth
                  />
                </div>
                <div className="w-full">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Date From
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    <input
                      type="date"
                      value={filters.dateFrom}
                      onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
                      className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                    />
                    {filters.dateFrom && (
                      <button
                        onClick={() => handleFilterChange("dateFrom", "")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        title="Clear date"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Date To
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    <input
                      type="date"
                      value={filters.dateTo}
                      onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                      min={filters.dateFrom || undefined}
                      className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                    />
                    {filters.dateTo && (
                      <button
                        onClick={() => handleFilterChange("dateTo", "")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        title="Clear date"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Clear Filters Button */}
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

export default MaterialRequestFilterBar;

