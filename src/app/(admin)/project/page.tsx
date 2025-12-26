"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Calendar,
  MapPin,
  Users,
  Package,
  AlertCircle,
  TrendingUp,
  Clock,
  CheckCircle2,
  MoreVertical,
  Eye,
  Edit2,
  Trash2,
  Archive,
  GitBranch,
} from "lucide-react";

const ProjectsDashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const router = useRouter();
  const [formData, setFormData] = useState({
    projectName: "",
    projectCode: "",
    location: "",
    startDate: "",
    endDate: "",
    projectManager: "",
    status: "active",
    budget: "",
    description: "",
    projectPortofolioDirector: "",
    projectDirector: "",
  });

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
      change: "+3",
      icon: TrendingUp,
      color: "bg-blue-500",
    },
    {
      label: "Total Budget",
      value: "32.5M SAR",
      change: "+15%",
      icon: Package,
      color: "bg-green-500",
    },
    {
      label: "Pending Requests",
      value: "40",
      change: "-5",
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      label: "Completed",
      value: "8",
      change: "+2",
      icon: CheckCircle2,
      color: "bg-purple-500",
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
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
    setFormData({
      projectName: "",
      projectCode: "",
      location: "",
      startDate: "",
      endDate: "",
      projectManager: "",
      status: "active",
      budget: "",
      description: "",
      projectPortofolioDirector: "",
      projectDirector: "",
    });
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-6 ">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Projects
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage and track all construction projects
              </p>
            </div>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg shadow-md hover:opacity-90 transition-opacity font-medium"
              style={{ backgroundColor: "#d92335" }}
            >
              <Plus className="w-5 h-5" />
              <span>New Project</span>
            </button>
          </div>
        </div>
      </div>

      <div className="py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-sm p-5 border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p
                      className={`text-xs mt-1 flex items-center gap-1 ${
                        stat.change.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      <TrendingUp className="w-3 h-3" />
                      {stat.change} this month
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-lg ${stat.color} bg-opacity-10 flex items-center justify-center`}
                  >
                    <Icon
                      className={`w-6 h-6 ${stat.color.replace(
                        "bg-",
                        "text-"
                      )}`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects by name, code, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none text-sm"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none text-sm bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="planning">Planning</option>
                <option value="on-hold">On Hold</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
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
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
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
                  className="p-2 flex gap-1.5 bg-red-500 text-white text-[14px]  items-center   cursor-pointer  rounded-lg transition-colors"
                >
                  <GitBranch className="w-4 h-4" /> Work Flow
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side Drawer */}
      {isDrawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/10 bg-opacity-50 z-[99999] transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          <div className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-[100000] flex flex-col">
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <span className="text-xl font-bold">×</span>
              </button>
            </div>

            <div className="p-6 pt-16 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Create New Project
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Fill in the project details
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none"
                    placeholder="e.g., Building A Construction"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="projectCode"
                      value={formData.projectCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none"
                      placeholder="BA-2025"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none"
                    >
                      <option value="planning">Planning</option>
                      <option value="active">Active</option>
                      <option value="on-hold">On Hold</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13820.901577242525!2d31.1590912!3d30.001683800000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2seg!4v1761320431231!5m2!1sar!2seg"
                    width="100%"
                    height="150"
                    loading="lazy"
                  ></iframe>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Portofolio Director{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="projectPortofolioDirector"
                    value={formData.projectPortofolioDirector}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none"
                    placeholder="Project Portofolio Director"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Director <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="projectDirector"
                    value={formData.projectDirector}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none"
                    placeholder="Project Director"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Manager <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="projectManager"
                    value={formData.projectManager}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none"
                    placeholder="Project Manager"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget (SAR) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    //@ts-expect-error:rows
                    rows="4"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none"
                    placeholder="Project description and additional details..."
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-3">
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 text-white rounded-lg shadow-md hover:opacity-90 transition-opacity font-medium"
                  style={{ backgroundColor: "#d92335" }}
                >
                  Create Project
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectsDashboard;
