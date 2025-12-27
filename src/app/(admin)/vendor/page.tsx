"use client";
import Link from "next/link";
import React, { useState, useMemo, useEffect } from "react";
import {
  Handshake,
  Eye,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
} from "lucide-react";
import PageHeaderWrapper from "@/components/ui/PageHeaderWrapper";
import StatCard from "@/components/ui/StatCard";
import Pagination from "@/components/ui/Pagination";
import Button from "@/components/ui/Button";
import VendorFilterBar, { VendorFilters } from "./components/VendorFilterBar";

interface MaterialRequest {
  id: string;
  rfpNumber: string;
  projectName: string;
  department: string;
  requestDate: string;
  dueDate: string;
  status: "pending" | "reviewed" | "responded" | "expired";
  itemsCount: number;
  priority: "high" | "medium" | "low";
  description?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  items?: {
    id: string;
    name: string;
    specification: string;
    quantity: number;
    unit: string;
    notes?: string;
  }[];
  attachments?: {
    id: string;
    name: string;
    size: string;
    type: string;
  }[];
}

const mockRequests: MaterialRequest[] = [
  {
    id: "1",
    rfpNumber: "RFP-2024-001",
    projectName: "New Office Building - Phase 1",
    department: "Construction",
    requestDate: "2024-11-20",
    dueDate: "2024-12-05",
    status: "pending",
    itemsCount: 15,
    priority: "high",
    description:
      "We require high-quality construction materials for the foundation and structural work of our new office building project. All materials must meet local building codes and international standards.",
    contactPerson: "Ahmed Hassan",
    contactEmail: "ahmed.hassan@buildmart.com",
    contactPhone: "+20 100 123 4567",
  },
  {
    id: "2",
    rfpNumber: "RFP-2024-002",
    projectName: "Residential Complex - Tower A",
    department: "Procurement",
    requestDate: "2024-11-22",
    dueDate: "2024-12-10",
    status: "reviewed",
    itemsCount: 8,
    priority: "medium",
    description:
      "Request for finishing materials for residential units including tiles, paints, and fixtures.",
    contactPerson: "Fatma Ali",
    contactEmail: "fatma.ali@buildmart.com",
    contactPhone: "+20 100 987 6543",
  },
  {
    id: "3",
    rfpNumber: "RFP-2024-003",
    projectName: "Mall Renovation",
    department: "Maintenance",
    requestDate: "2024-11-18",
    dueDate: "2024-11-30",
    status: "responded",
    itemsCount: 22,
    priority: "low",
    description:
      "Maintenance and renovation materials for existing mall facility.",
    contactPerson: "Mohamed Ibrahim",
    contactEmail: "mohamed.ibrahim@buildmart.com",
    contactPhone: "+20 100 555 7890",
  },
];

const VendorPage = () => {
  const [filters, setFilters] = useState<VendorFilters>({
    search: "",
    status: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      reviewed: "bg-blue-100 text-blue-800 border-blue-300",
      responded: "bg-green-100 text-green-800 border-green-300",
      expired: "bg-red-100 text-red-800 border-red-300",
    };
    const icons = {
      pending: <Clock className="text-[12px]" />,
      reviewed: <Eye className="text-[12px]" />,
      responded: <CheckCircle className="text-[12px]" />,
      expired: <XCircle className="text-[12px]" />,
    };
    return (
      <span
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-semibold border ${
          styles[status as keyof typeof styles]
        }`}
      >
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      high: "bg-red-50 text-red-700 border-red-200",
      medium: "bg-orange-50 text-orange-700 border-orange-200",
      low: "bg-gray-50 text-gray-700 border-gray-200",
    };
    return (
      <span
        className={`px-2 py-1 rounded text-[11px] font-medium border ${
          styles[priority as keyof typeof styles]
        }`}
      >
        {priority.toUpperCase()}
      </span>
    );
  };

  const filteredRequests = useMemo(() => {
    return mockRequests.filter((req) => {
      const matchesSearch =
        !filters.search ||
        req.rfpNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
        req.projectName.toLowerCase().includes(filters.search.toLowerCase());
      const matchesFilter = filters.status === "all" || req.status === filters.status;
      return matchesSearch && matchesFilter;
    });
  }, [mockRequests, filters]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const paginatedRequests = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredRequests.slice(startIndex, endIndex);
  }, [filteredRequests, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExport = () => {
    console.log("Exporting requests...", filteredRequests);
  };

  const handleFiltersChange = (newFilters: VendorFilters) => {
    setFilters(newFilters);
  };

  const stats = {
    total: mockRequests.length,
    pending: mockRequests.filter((r) => r.status === "pending").length,
    reviewed: mockRequests.filter((r) => r.status === "reviewed").length,
    responded: mockRequests.filter((r) => r.status === "responded").length,
  };

  const statsData = [
    {
      label: "Total Requests",
      value: String(stats.total),
      icon: Handshake,
      iconColor: "text-blue-500",
      trend: "up" as const,
    },
    {
      label: "Pending",
      value: String(stats.pending),
      icon: Clock,
      iconColor: "text-yellow-500",
      trend: "neutral" as const,
    },
    {
      label: "Reviewed",
      value: String(stats.reviewed),
      icon: Eye,
      iconColor: "text-blue-500",
      trend: "up" as const,
    },
    {
      label: "Responded",
      value: String(stats.responded),
      icon: CheckCircle,
      iconColor: "text-green-500",
      trend: "up" as const,
    },
  ];

  const statusFilterOptions = [
    { value: "pending", label: "Pending" },
    { value: "reviewed", label: "Reviewed" },
    { value: "responded", label: "Responded" },
    { value: "expired", label: "Expired" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <PageHeaderWrapper
        title="Vendor Portal - Material Requests"
        description="Review and respond to incoming RFPs and material requests"
        sticky={true}
        zIndex={40}
      />

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          {statsData.map((stat, idx) => (
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
        <VendorFilterBar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onExport={handleExport}
          statusOptions={statusFilterOptions}
          className="mb-6"
        />

        {/* Enhanced Requests Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    RFP Number
                  </th>
                  <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Project Name
                  </th>
                  <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Request Date
                  </th>
                  <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Priority
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
                {paginatedRequests.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-4 sm:px-6 py-12 sm:py-16 text-center"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <Handshake className="w-12 h-12 text-gray-400 mb-3" />
                        <p className="text-sm sm:text-base font-medium text-gray-900 mb-1">
                          No requests found
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {filters.search || filters.status !== "all"
                            ? "Try adjusting your filters"
                            : "No material requests available"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedRequests.map((request) => (
                    <tr
                      key={request.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-red-600">
                          {request.rfpNumber}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className="text-sm text-gray-800 font-medium">
                          {request.projectName}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {request.department}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {request.requestDate}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {request.dueDate}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-800 font-medium">
                          {request.itemsCount} items
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        {getPriorityBadge(request.priority)}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(request.status)}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <Link href={`vendor/RFBs-details/${request.id}`}>
                            <button
                              className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                              title="View Details"
                            >
                              <Eye className="text-[16px]" />
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredRequests.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredRequests.length}
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
  );
};

export default VendorPage;
