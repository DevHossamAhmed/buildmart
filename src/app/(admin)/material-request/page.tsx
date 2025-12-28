"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Edit2,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  FileText,
  Loader,
  Package,
  CheckCircle2,
  X,
} from "lucide-react";
import Link from "next/link";
import PageHeaderWrapper from "@/components/ui/PageHeaderWrapper";
import StatCard from "@/components/ui/StatCard";
import Pagination from "@/components/ui/Pagination";
import MaterialRequestFilterBar, {
  MaterialRequestFilters,
} from "./components/MaterialRequestFilterBar";
import CreateMaterialRequest, {
  MaterialRequestFormData,
  BoqItem,
} from "./components/modals/CreateMaterialRequest";

const MaterialRequestDashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<MaterialRequestFilters>({
    search: "",
    status: "all",
    priority: "all",
    project: "all",
    requestedBy: "all",
    dateFrom: "",
    dateTo: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [requests, setRequests] = useState([
    {
      id: "MR-001",
      materialName: "Steel Rebar Grade 60",
      quantity: 500,
      unit: "kg",
      category: "Construction",
      priority: "high",
      status: "draft",
      projectName: "Building A",
      requestedBy: "Mahmoud Ahmed",
      requestedDate: "2025-02-10",
      updatedAt: "2025-02-10",
      duedate: "15-10-2025",
      rfbs: 0,
    },
    {
      id: "MR-002",
      materialName: "Cement Portland Type I",
      quantity: 100,
      unit: "bags",
      category: "Construction",
      priority: "normal",
      status: "in_progress",
      projectName: "Building B",
      requestedBy: "Sara Ali",
      requestedDate: "2025-02-08",
      updatedAt: "2025-02-09",
      duedate: "17-10-2025",
      rfbs: 6,
    },
    {
      id: "MR-003",
      materialName: "Electrical Cables 2.5mm",
      quantity: 200,
      unit: "meters",
      category: "Electrical",
      priority: "urgent",
      status: "pending",
      projectName: "Renovation Project",
      requestedBy: "Ahmed Hassan",
      requestedDate: "2025-02-09",
      updatedAt: "2025-02-09",
      duedate: "20-10-2025",
      rfbs: 0,
    },
    {
      id: "MR-004",
      materialName: "PVC Pipes 4 inch",
      quantity: 50,
      unit: "meters",
      category: "Plumbing",
      priority: "normal",
      status: "completed",
      projectName: "Building C",
      requestedBy: "Mahmoud Ahmed",
      requestedDate: "2025-02-05",
      updatedAt: "2025-02-08",
      duedate: "25-10-2025",
      rfbs: 5,
    },
    {
      id: "MR-005",
      materialName: "Paint - White Latex",
      quantity: 30,
      unit: "gallons",
      category: "Finishing",
      priority: "low",
      status: "closed",
      projectName: "Office Renovation",
      requestedBy: "Fatima Mohamed",
      requestedDate: "2025-02-07",
      updatedAt: "2025-02-08",
      duedate: "30-10-2025",
      rfbs: 4,
    },
    {
      id: "MR-006",
      materialName: "Wood Planks Oak",
      quantity: 150,
      unit: "units",
      category: "Finishing",
      priority: "high",
      status: "draft",
      projectName: "Interior Design Phase 1",
      requestedBy: "Omar Khalil",
      requestedDate: "2025-02-11",
      updatedAt: "2025-02-11",
      duedate: "18-10-2025",
      rfbs: 0,
    },
    {
      id: "MR-007",
      materialName: "Concrete Mix M25",
      quantity: 5,
      unit: "tons",
      category: "Construction",
      priority: "urgent",
      status: "in_progress",
      projectName: "Foundation Work",
      requestedBy: "Youssef Ibrahim",
      requestedDate: "2025-02-09",
      updatedAt: "2025-02-10",
      duedate: "14-10-2025",
      rfbs: 10,
    },
    {
      id: "MR-008",
      materialName: "Glass Panels 10mm",
      quantity: 20,
      unit: "units",
      category: "Finishing",
      priority: "normal",
      status: "pending",
      projectName: "Facade Installation",
      requestedBy: "Layla Hassan",
      requestedDate: "2025-02-08",
      updatedAt: "2025-02-09",
      duedate: "22-10-2025",
      rfbs: 0,
    },
  ]);

  const stats = [
    {
      label: "Total Requests",
      value: "248",
      change: "+12%",
      icon: Package,
      iconColor: "text-blue-500",
      trend: "up" as const,
    },
    {
      label: "In Progress",
      value: "45",
      change: "+5%",
      icon: Loader,
      iconColor: "text-yellow-500",
      trend: "up" as const,
    },
    {
      label: "Completed",
      value: "178",
      change: "+8%",
      icon: CheckCircle2,
      iconColor: "text-green-500",
      trend: "up" as const,
    },
    {
      label: "Closed",
      value: "25",
      change: "-3%",
      icon: X,
      iconColor: "text-red-500",
      trend: "down" as const,
    },
  ];

  //@ts-expect-error:status
  const getStatusBadge = (status) => {
    const styles = {
      draft: "bg-gray-100 text-gray-700 border-gray-300",
      in_progress: "bg-blue-100 text-blue-700 border-blue-300",
      completed: "bg-green-100 text-green-700 border-green-300",
      pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
      closed: "bg-red-100 text-red-700 border-red-300",
    };
    //@ts-expect-error:status
    return styles[status] || styles.draft;
  };
  //@ts-expect-error:status
  const getStatusIcon = (status) => {
    switch (status) {
      case "draft":
        return <FileText className="w-4 h-4" />;
      case "in_progress":
        return <Loader className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "closed":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };
  //@ts-expect-error:status
  const getStatusLabel = (status) => {
    const labels = {
      draft: "Draft",
      in_progress: "In Progress",
      pending: "Pending",
      completed: "Completed",
      closed: "Closed",
    };
    //@ts-expect-error:status
    return labels[status] || status;
  };

  //@ts-expect-error:priority
  const getPriorityBadge = (priority) => {
    const styles = {
      urgent: "bg-red-100 text-red-700 border-red-300",
      high: "bg-orange-100 text-orange-700 border-orange-300",
      normal: "bg-blue-100 text-blue-700 border-blue-300",
      low: "bg-slate-100 text-slate-700 border-slate-300",
    };
    //@ts-expect-error:priority
    return styles[priority] || styles.normal;
  };
  //@ts-expect-error:priority
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "urgent":
        return <AlertCircle className="w-4 h-4" />;
      case "high":
        return <AlertCircle className="w-4 h-4" />;
      case "normal":
        return <Clock className="w-4 h-4" />;
      case "low":
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  //@ts-expect-error:status
  const getRFBsDisplay = (status, rfbs) => {
    if (status === "pending" || status === "draft") {
      return "- - -";
    }
    return `${String(rfbs).padStart(2, "0")} RFPs`;
  };

  const handleSubmit = (formData: MaterialRequestFormData, boqItems: BoqItem[]) => {
    const newRequest = {
      id: `MR-${String(requests.length + 1).padStart(3, "0")}`,
      ...formData,
      status: "draft",
      requestedBy: "Mahmoud Ahmed",
      updatedAt: new Date().toISOString().split("T")[0],
      rfbs: Math.floor(Math.random() * 10) + 1,
    };
    //@ts-expect-error:newRequest
    setRequests([newRequest, ...requests]);
    setIsDrawerOpen(false);
  };

  const handleSaveDraft = (formData: MaterialRequestFormData, boqItems: BoqItem[]) => {
    const newRequest = {
      id: `MR-${String(requests.length + 1).padStart(3, "0")}`,
      ...formData,
      status: "draft",
      requestedBy: "Mahmoud Ahmed",
      updatedAt: new Date().toISOString().split("T")[0],
      rfbs: 0,
    };
    //@ts-expect-error:newRequest
    setRequests([newRequest, ...requests]);
    setIsDrawerOpen(false);
  };

  // Extract unique values for filter options
  const projectOptions = useMemo(() => {
    const uniqueProjects = Array.from(
      new Set(requests.map((req) => req.projectName))
    );
    return uniqueProjects.map((project) => ({
      value: project,
      label: project,
    }));
  }, [requests]);

  const requestedByOptions = useMemo(() => {
    const uniqueUsers = Array.from(
      new Set(requests.map((req) => req.requestedBy))
    );
    return uniqueUsers.map((user) => ({
      value: user,
      label: user,
    }));
  }, [requests]);

  const statusFilterOptions = [
    { value: "draft", label: "Draft" },
    { value: "in_progress", label: "In Progress" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "closed", label: "Closed" },
  ];

  const priorityFilterOptions = [
    { value: "urgent", label: "Urgent" },
    { value: "high", label: "High" },
    { value: "normal", label: "Normal" },
    { value: "low", label: "Low" },
  ];

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      // Search only Material ID and Request Title (materialName)
      const matchesSearch =
        !filters.search ||
        req.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        req.materialName.toLowerCase().includes(filters.search.toLowerCase());

      // Status filter
      const matchesStatus =
        filters.status === "all" || req.status === filters.status;

      // Priority filter
      const matchesPriority =
        filters.priority === "all" || req.priority === filters.priority;

      // Project filter
      const matchesProject =
        filters.project === "all" || req.projectName === filters.project;

      // Requested By filter
      const matchesRequestedBy =
        filters.requestedBy === "all" ||
        req.requestedBy === filters.requestedBy;

      // Date range filter (checking requestedDate)
      let matchesDateRange = true;
      if (filters.dateFrom || filters.dateTo) {
        const requestDate = new Date(req.requestedDate);
        if (filters.dateFrom) {
          const fromDate = new Date(filters.dateFrom);
          fromDate.setHours(0, 0, 0, 0);
          if (requestDate < fromDate) {
            matchesDateRange = false;
          }
        }
        if (filters.dateTo) {
          const toDate = new Date(filters.dateTo);
          toDate.setHours(23, 59, 59, 999);
          if (requestDate > toDate) {
            matchesDateRange = false;
          }
        }
      }

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesProject &&
        matchesRequestedBy &&
        matchesDateRange
      );
    });
  }, [requests, filters]);

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
    // Export functionality
    console.log("Exporting data...", filteredRequests);
    // You can implement actual export logic here (CSV, Excel, etc.)
  };

  const handleFiltersChange = (newFilters: MaterialRequestFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Enhanced Header */}
      <PageHeaderWrapper
        title="Material Requests"
        description="Manage and track all material requests"
        onAdd={() => setIsDrawerOpen(true)}
        addButtonText="New Request"
      />

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          {stats.map((stat, idx) => (
            <StatCard
              key={idx}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              iconColor={stat.iconColor}
              trend={stat.trend}
            />
          ))}
        </div>

        {/* Professional Filter and Export Bar */}
        <div className="mb-6">
          <MaterialRequestFilterBar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onExport={handleExport}
            statusOptions={statusFilterOptions}
            priorityOptions={priorityFilterOptions}
            projectOptions={projectOptions}
            requestedByOptions={requestedByOptions}
          />
        </div>

        {/* Enhanced Table with Pagination */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Request ID
                  </th>
                  <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Request TITLE
                  </th>
                  <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    PRIORITY
                  </th>
                  <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Requested By
                  </th>
                  <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Requested Date
                  </th>
                  <th className="px-4 sm:px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    RFPs
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
                      colSpan={10}
                      className="px-4 sm:px-6 py-12 sm:py-16 text-center"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <Package className="w-12 h-12 text-gray-400 mb-3" />
                        <p className="text-sm sm:text-base font-medium text-gray-900 mb-1">
                          No requests found
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {filters.search || filters.status !== "all"
                            ? "Try adjusting your filters"
                            : "Create your first material request"}
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
                      <td className="px-4 sm:px-6 py-4 text-sm font-semibold text-gray-900">
                        {request.id}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">
                        <div className="font-medium">{request.materialName}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-600">
                        {request.duedate}
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                            request.status
                          )}`}
                        >
                          {getStatusIcon(request.status)}
                          {getStatusLabel(request.status)}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getPriorityBadge(
                            request.priority
                          )}`}
                        >
                          {getPriorityIcon(request.priority)}
                          {request.priority.charAt(0).toUpperCase() +
                            request.priority.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-600">
                        {request.projectName}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-600">
                        {request.requestedBy}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-600">
                        {request.requestedDate}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-600 font-medium">
                        {getRFBsDisplay(request.status, request.rfbs)}
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex justify-center items-center gap-2">
                          {(request.status === "in_progress" ||
                            request.status === "completed" ||
                            request.status === "closed") && (
                            <Link
                              href={`/RFBs/${request.id}`}
                              className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-150"
                              title="View RFBs"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                          )}

                          {(request.status === "pending" ||
                            request.status === "draft") && (
                            <button
                              className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors duration-150"
                              title="Edit Request"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          )}
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

      {/* Create Material Request Modal */}
      <CreateMaterialRequest
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSubmit={handleSubmit}
        onSaveDraft={handleSaveDraft}
      />
    </div>
  );
};

export default MaterialRequestDashboard;
