"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  TrendingUp,
  Clock,
  CheckCircle2,
  Package,
  AlertCircle,
  Eye,
  Edit2,
  Trash2,
  GitBranch,
  MapPin,
  Users,
  Calendar,
} from "lucide-react";
import PageHeaderWrapper from "@/components/ui/PageHeaderWrapper";
import StatCard from "@/components/ui/StatCard";
import Pagination from "@/components/ui/Pagination";
import Button from "@/components/ui/Button";
import ProjectFilterBar, { ProjectFilters } from "./components/ProjectFilterBar";
import { CreateProjectModal } from "./components/modals";

const ProjectsDashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<ProjectFilters>({
    search: "",
    status: "all",
  });
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [projects, setProjects] = useState([
    {
      id: "PRJ-001",
      name: "Building A Construction",
      code: "BA-2025",
      location: "Downtown, Cairo",
      manager: "Mahmoud Ahmed",
      status: "active",
      progress: 65,
      startDate: "2025-01-15",
      endDate: "2025-06-30",
      budget: 5000000,
      spent: 3250000,
      totalRequests: 45,
      pendingRequests: 12,
      team: 25,
    },
    {
      id: "PRJ-002",
      name: "Office Renovation",
      code: "OR-2025",
      location: "New Cairo",
      manager: "Sara Ali",
      status: "active",
      progress: 40,
      startDate: "2025-02-01",
      endDate: "2025-04-15",
      budget: 1500000,
      spent: 600000,
      totalRequests: 28,
      pendingRequests: 8,
      team: 12,
    },
    {
      id: "PRJ-003",
      name: "Shopping Mall Phase 2",
      code: "SM-2025",
      location: "6th October City",
      manager: "Ahmed Hassan",
      status: "planning",
      progress: 15,
      startDate: "2025-03-01",
      endDate: "2025-12-31",
      budget: 15000000,
      spent: 2250000,
      totalRequests: 18,
      pendingRequests: 15,
      team: 45,
    },
    {
      id: "PRJ-004",
      name: "Residential Complex",
      code: "RC-2024",
      location: "Nasr City",
      manager: "Fatima Mohamed",
      status: "completed",
      progress: 100,
      startDate: "2024-06-01",
      endDate: "2024-12-31",
      budget: 8000000,
      spent: 7800000,
      totalRequests: 95,
      pendingRequests: 0,
      team: 35,
    },
    {
      id: "PRJ-005",
      name: "School Building",
      code: "SB-2025",
      location: "Heliopolis",
      manager: "Omar Khalil",
      status: "on-hold",
      progress: 25,
      startDate: "2025-01-20",
      endDate: "2025-08-30",
      budget: 3000000,
      spent: 750000,
      totalRequests: 15,
      pendingRequests: 5,
      team: 18,
    },
  ]);

  const stats = [
    {
      label: "Active Projects",
      value: "12",
      icon: TrendingUp,
      iconColor: "text-blue-500",
      trend: "up" as const,
    },
    {
      label: "Total Budget",
      value: "32.5M SAR",
      icon: Package,
      iconColor: "text-green-500",
      trend: "up" as const,
    },
    {
      label: "Pending Requests",
      value: "40",
      icon: Clock,
      iconColor: "text-yellow-500",
      trend: "down" as const,
    },
    {
      label: "Completed",
      value: "8",
      icon: CheckCircle2,
      iconColor: "text-purple-500",
      trend: "up" as const,
    },
  ];

  //@ts-expect-error:status
  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-green-100 text-green-800 border-green-300",
      planning: "bg-blue-100 text-blue-800 border-blue-300",
      "on-hold": "bg-yellow-100 text-yellow-800 border-yellow-300",
      completed: "bg-purple-100 text-purple-800 border-purple-300",
      cancelled: "bg-red-100 text-red-800 border-red-300",
    };
    //@ts-expect-error:status
    return styles[status] || styles.active;
  };

  //@ts-expect-error:progress
  const getProgressColor = (progress) => {
    if (progress >= 75) return "bg-green-500";
    if (progress >= 50) return "bg-blue-500";
    if (progress >= 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  //@ts-expect-error:amount
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-EG", {
      style: "currency",
      currency: "SAR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const statusFilterOptions = [
    { value: "active", label: "Active" },
    { value: "planning", label: "Planning" },
    { value: "on-hold", label: "On Hold" },
    { value: "completed", label: "Completed" },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        !filters.search ||
        project.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.code.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.location.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus =
        filters.status === "all" || project.status === filters.status;
      return matchesSearch && matchesStatus;
    });
  }, [projects, filters]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExport = () => {
    console.log("Exporting projects...", filteredProjects);
  };

  const handleFiltersChange = (newFilters: ProjectFilters) => {
    setFilters(newFilters);
  };

  const handleSave = (formData: any) => {
    const newProject = {
      id: `PRJ-${String(projects.length + 1).padStart(3, "0")}`,
      name: formData.projectName,
      code: formData.projectCode,
      location: formData.location,
      manager: formData.projectManager,
      status: formData.status,
      progress: 0,
      startDate: formData.startDate,
      endDate: formData.endDate,
      budget: parseFloat(formData.budget),
      spent: 0,
      totalRequests: 0,
      pendingRequests: 0,
      team: 0,
    };
    setProjects([newProject, ...projects]);
    setIsDrawerOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Enhanced Header */}
      <PageHeaderWrapper
        title="Projects"
        description="Manage and track all construction projects"
        sticky={true}
        zIndex={40}
        actions={
          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="w-5 h-5" />}
            onClick={() => setIsDrawerOpen(true)}
            style={{ backgroundColor: "#d92335" }}
          >
            New Project
          </Button>
        }
      />

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
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
        <ProjectFilterBar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onExport={handleExport}
          statusOptions={statusFilterOptions}
          className="mb-6"
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
          {paginatedProjects.length === 0 ? (
            <div className="col-span-full bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm sm:text-base font-medium text-gray-900 mb-1">
                No projects found
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                {filters.search || filters.status !== "all"
                  ? "Try adjusting your filters"
                  : "Create your first project"}
              </p>
            </div>
          ) : (
            paginatedProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                {/* Card Header */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-600">{project.code}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                      project.status
                    )}`}
                  >
                    {project.status.charAt(0).toUpperCase() +
                      project.status.slice(1).replace("-", " ")}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Progress
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getProgressColor(
                          project.progress
                        )} transition-all duration-300`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="truncate">{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{project.team} members</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{project.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Package className="w-4 h-4 text-gray-400" />
                      <span>{project.totalRequests} requests</span>
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-600">Budget</span>
                      <span className="text-xs font-medium text-gray-900">
                        {formatCurrency(project.budget)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Spent</span>
                      <span className="text-xs font-medium text-gray-900">
                        {formatCurrency(project.spent)}
                      </span>
                    </div>
                    <div className="mt-2 w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{
                          width: `${(project.spent / project.budget) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Manager & Pending */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                        {project.manager
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-900">
                          {project.manager}
                        </p>
                        <p className="text-xs text-gray-500">Project Manager</p>
                      </div>
                    </div>
                    {project.pendingRequests > 0 && (
                      <div className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                        <AlertCircle className="w-3 h-3" />
                        <span className="text-xs font-medium">
                          {project.pendingRequests} pending
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() =>
                      router.push(`/approval-work-flow/${project.id}`)
                    }
                    className="p-2 flex gap-1.5 bg-red-500 text-white text-[14px] items-center cursor-pointer rounded-lg transition-colors hover:bg-red-600"
                  >
                    <GitBranch className="w-4 h-4" /> Work Flow
                  </button>
                  <button
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredProjects.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredProjects.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={setItemsPerPage}
            itemsPerPageOptions={[10, 25, 50, 100]}
            showItemsPerPage={true}
          />
        )}
      </div>

      {/* Modal */}
      <CreateProjectModal
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSubmit={handleSave}
      />
    </div>
  );
};

export default ProjectsDashboard;
