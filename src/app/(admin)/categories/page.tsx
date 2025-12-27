/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  FolderOpen,
  Layers,
  Package,
  Tag,
  Edit2,
  Trash2,
  Eye,
  Upload,
  Plus,
} from "lucide-react";
import PageHeaderWrapper from "@/components/ui/PageHeaderWrapper";
import StatCard from "@/components/ui/StatCard";
import Pagination from "@/components/ui/Pagination";
import Button from "@/components/ui/Button";
import CategoriesFilterBar, {
  CategoriesFilters,
} from "./components/CategoriesFilterBar";
import {
  CreateCategoryModal,
  ImportCategoryModal,
} from "./components/modals";

const CategoriesPage = () => {
  const [filters, setFilters] = useState<CategoriesFilters>({
    search: "",
    status: "all",
  });
  const [showImportModal, setShowImportModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Sample Categories Data
  const categoriesData = [
    {
      id: 1,
      name: "Construction Materials",
      description: "Essential building materials and supplies",
      itemsCount: 245,
      subcategories: 12,
      status: "active",
      color: "blue",
      icon: "🏗️",
    },
    {
      id: 2,
      name: "Electrical Equipment",
      description: "Wiring, cables, and electrical components",
      itemsCount: 189,
      subcategories: 8,
      status: "active",
      color: "yellow",
      icon: "⚡",
    },
    {
      id: 3,
      name: "Plumbing Supplies",
      description: "Pipes, fittings, and plumbing tools",
      itemsCount: 156,
      subcategories: 10,
      status: "active",
      color: "cyan",
      icon: "🚰",
    },
    {
      id: 4,
      name: "Safety Equipment",
      description: "Personal protective equipment and safety gear",
      itemsCount: 98,
      subcategories: 6,
      status: "active",
      color: "red",
      icon: "🦺",
    },
    {
      id: 5,
      name: "Hand Tools",
      description: "Manual tools and equipment",
      itemsCount: 312,
      subcategories: 15,
      status: "active",
      color: "orange",
      icon: "🔧",
    },
    {
      id: 6,
      name: "Power Tools",
      description: "Electric and battery-powered tools",
      itemsCount: 127,
      subcategories: 9,
      status: "inactive",
      color: "purple",
      icon: "🔌",
    },
  ];

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-700 border-green-300"
      : "bg-gray-100 text-gray-700 border-gray-300";
  };

  const getCategoryColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: "bg-blue-100 text-blue-700",
      yellow: "bg-yellow-100 text-yellow-700",
      cyan: "bg-cyan-100 text-cyan-700",
      red: "bg-red-100 text-red-700",
      orange: "bg-orange-100 text-orange-700",
      purple: "bg-purple-100 text-purple-700",
      green: "bg-green-100 text-green-700",
    };
    return colors[color] || colors.blue;
  };

  const statusFilterOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const filteredCategories = useMemo(() => {
    return categoriesData.filter((category) => {
      const matchesSearch =
        !filters.search ||
        category.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        category.description.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus =
        filters.status === "all" || category.status === filters.status;

      return matchesSearch && matchesStatus;
    });
  }, [categoriesData, filters]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCategories.slice(startIndex, endIndex);
  }, [filteredCategories, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExport = () => {
    console.log("Exporting categories...", filteredCategories);
  };

  const handleFiltersChange = (newFilters: CategoriesFilters) => {
    setFilters(newFilters);
  };

  // Stats
  const stats = [
    {
      label: "Total Categories",
      value: String(categoriesData.length),
      icon: FolderOpen,
      iconColor: "text-blue-500",
      trend: "up" as const,
    },
    {
      label: "Subcategories",
      value: String(
        categoriesData.reduce((sum, cat) => sum + cat.subcategories, 0)
      ),
      icon: Layers,
      iconColor: "text-green-500",
      trend: "up" as const,
    },
    {
      label: "Total Items",
      value: String(
        categoriesData.reduce((sum, cat) => sum + cat.itemsCount, 0)
      ),
      icon: Package,
      iconColor: "text-purple-500",
      trend: "up" as const,
    },
    {
      label: "Active Categories",
      value: String(
        categoriesData.filter((c) => c.status === "active").length
      ),
      icon: Tag,
      iconColor: "text-orange-500",
      trend: "neutral" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <PageHeaderWrapper
        title="Categories"
        description="Manage your product categories and subcategories"
        sticky={true}
        zIndex={40}
        actions={
          <>
            <Button
              variant="outline"
              size="md"
              leftIcon={<Upload className="w-4 h-4" />}
              onClick={() => setShowImportModal(true)}
            >
              Import Categories
            </Button>
            <Button
              variant="primary"
              size="md"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setShowManualModal(true)}
              style={{ backgroundColor: "#d92335" }}
            >
              Add Category
            </Button>
          </>
        }
      />

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, idx) => (
              <StatCard
                key={idx}
                label={stat.label}
                value={stat.value}
                icon={stat.icon}
                iconColor={stat.iconColor}
                trend={stat.trend}
              />
            ))}
          </div>

          {/* Professional Filter Bar */}
          <CategoriesFilterBar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onExport={handleExport}
            statusOptions={statusFilterOptions}
          />

          {/* Enhanced Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Subcategories
                    </th>
                    <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 sm:px-6 py-3.5 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedCategories.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 sm:px-6 py-12 sm:py-16 text-center"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <FolderOpen className="w-12 h-12 text-gray-400 mb-3" />
                          <p className="text-sm sm:text-base font-medium text-gray-900 mb-1">
                            No categories found
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {filters.search || filters.status !== "all"
                              ? "Try adjusting your filters"
                              : "Create your first category"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginatedCategories.map((category) => (
                      <tr
                        key={category.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0 ${getCategoryColor(
                                category.color
                              )}`}
                            >
                              {category.icon}
                            </div>
                            <p className="text-sm font-semibold text-gray-900">
                              {category.name}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <p className="text-sm text-gray-600 max-w-xs">
                            {category.description}
                          </p>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <p className="text-sm font-medium text-gray-900">
                            {category.itemsCount}
                          </p>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <p className="text-sm font-medium text-gray-900">
                            {category.subcategories}
                          </p>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              category.status
                            )}`}
                          >
                            {category.status.charAt(0).toUpperCase() +
                              category.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-150"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors duration-150"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-150"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredCategories.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredCategories.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={setItemsPerPage}
                itemsPerPageOptions={[10, 25, 50, 100]}
                showItemsPerPage={true}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateCategoryModal
        isOpen={showManualModal}
        onClose={() => setShowManualModal(false)}
        onSubmit={(data) => {
          console.log("Category created:", data);
          setShowManualModal(false);
        }}
        categoriesData={categoriesData}
      />

      <ImportCategoryModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onSubmit={(data) => {
          console.log("Import data:", data);
          setShowImportModal(false);
        }}
      />
    </div>
  );
};

export default CategoriesPage;
