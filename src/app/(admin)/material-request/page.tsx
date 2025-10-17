"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Download,
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  FileText,
  Loader,
} from "lucide-react";
import Link from "next/link";

const MaterialRequestDashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [boqItems, setBoqItems] = useState([
    {
      id: 1,
      category: "",
      description: "",
      quantity: 0,
      unit: "",
    },
  ]);
  const [formData, setFormData] = useState({
    materialName: "",
    quantity: "",
    unit: "units",
    category: "",
    priority: "normal",
    description: "",
    projectName: "",
    requestedDate: "",
    duedate: "",
    estValue: "",
  });

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
      rfbs: 3,
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
      rfbs: 0,
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
      rfbs: 0,
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
      rfbs: 2,
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
      rfbs: 0,
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
      color: "bg-blue-500",
    },
    {
      label: "In Progress",
      value: "45",
      change: "+5%",
      color: "bg-yellow-500",
    },
    { label: " Completed", value: "178", change: "+8%", color: "bg-green-500" },
    { label: " Closed", value: "25", change: "-3%", color: "bg-red-500" },
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
    if (
      status === "in_progress" ||
      status === "pending" ||
      status === "closed"
    ) {
      return "- - -";
    }
    return `${String(rfbs).padStart(2, "0")} RFBs`;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
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
    setFormData({
      materialName: "",
      quantity: "",
      unit: "units",
      category: "",
      priority: "normal",
      description: "",
      projectName: "",
      requestedDate: "",
      duedate: "",
      estValue: "",
    });
  };

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.materialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleBoqChange = (id: number, field: string, value: string) => {
    setBoqItems(
      boqItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === "unitPrice" || field === "unit") {
            const quantity = parseFloat(formData.quantity) || 0;
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const addBoqRow = () => {
    const newId = Math.max(...boqItems.map((item) => item.id), 0) + 1;
    setBoqItems([
      ...boqItems,
      {
        id: newId,
        category: "",
        unit: "",
        quantity: 0,
        description: "",
      },
    ]);
  };

  const removeBoqRow = (id: number) => {
    if (boqItems.length > 1) {
      setBoqItems(boqItems.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <div className="bg-white shadow-sm border-b ">
        <div className="px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Material Requests
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage and track all material requests
              </p>
            </div>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 text-white rounded-lg shadow-md hover:opacity-90 transition-opacity font-medium"
              style={{ backgroundColor: "#d92335" }}
            >
              <Plus className="w-5 h-5" />
              <span>New Request</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, idx) => (
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
                    className={`text-xs mt-1 ${
                      stat.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change} from last month
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-full ${stat.color} bg-opacity-20 flex items-center justify-center`}
                >
                  <div className={`w-2 h-2 rounded-full ${stat.color}`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by material, ID, or project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none text-sm"
              />
            </div>
            <div className="flex gap-3">
              <div className="relative w-max">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none pr-4  pl-6 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none text-sm bg-white cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="in_progress">In Progress</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="closed">Closed</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pl-4 pr-2 text-gray-700">
                  <svg className="h-4 w-4 fill-current " viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-gray-700">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Request ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Request TITLE
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    PRIORITY
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Requested By
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Requested Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    RFBs
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {request.id}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {request.materialName}
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-600">
                      {request.duedate}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                          request.status
                        )}`}
                      >
                        {getStatusIcon(request.status)}
                        {getStatusLabel(request.status)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
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
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {request.projectName}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {request.requestedBy}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {request.requestedDate}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 ">
                      {getRFBsDisplay(request.status, request.rfbs)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center items-center gap-2">
                        {(request.status === "in_progress" ||
                          request.status === "completed" ||
                          request.status === "closed") && (
                          <button className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                            <Link
                              href={`/RFBs/${request.id}`}
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                          </button>
                        )}

                        {(request.status === "pending" ||
                          request.status === "draft") && (
                          <button className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Side Drawer */}
      {isDrawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/10 bg-opacity-50 z-[99999] transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          <div className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-[100000] flex flex-col animate-slide-in">
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
                New Material Request
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Fill in the details to create a new request
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Request Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="materialName"
                    value={formData.materialName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                    placeholder="e.g., Steel Rebar Grade 60"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Name
                    </label>
                    <select
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                    >
                      <option value="">Select Project</option>
                      <option value="PRJ-2024-001 - Structural Steel Installation">
                        PRJ-2024-001 - Structural Steel Installation
                      </option>
                      <option value="PRJ-2024-002 - HVAC System Upgrade">
                        PRJ-2024-002 - HVAC System Upgrade
                      </option>
                      <option value="PRJ-2024-003 - Electrical Infrastructure">
                        PRJ-2024-003 - Electrical Infrastructure
                      </option>
                      <option value="PRJ-2024-004 - Foundation & Concrete Works">
                        PRJ-2024-004 - Foundation & Concrete Works
                      </option>
                      <option value="PRJ-2024-005 - Plumbing & Drainage System">
                        PRJ-2024-005 - Plumbing & Drainage System
                      </option>
                      <option value="PRJ-2024-006 - Facade & Cladding Works">
                        PRJ-2024-006 - Facade & Cladding Works
                      </option>
                      <option value="PRJ-2024-007 - MEP Integration Phase 1">
                        PRJ-2024-007 - MEP Integration Phase 1
                      </option>
                      <option value="PRJ-2024-008 - Fire Safety Systems">
                        PRJ-2024-008 - Fire Safety Systems
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                    >
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="duedate"
                    value={formData.duedate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Est.Value <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="amount"
                    name="estValue"
                    value={formData.estValue}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description / Notes
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                    placeholder="Add any additional information or special requirements..."
                  />
                </div>
                <div className="w-full h-[1px] bg-gray-300 mx-auto mt-[20px]"></div>
                <div className="w-full flex justify-between">
                  <h2 className="pt-1">BOQs</h2>
                  <button className="bg-red-500 text-white p-1 rounded-md">
                    Import
                  </button>
                </div>
                {/* BOQ Table */}
                <div className="overflow-x-auto border border-gray-300 rounded-lg">
                  <table className="w-full text-sm table-fixed">
                    <thead className="bg-gray-100 border-b border-gray-300">
                      <tr>
                        <th className="w-[20%] px-1 py-1 text-left text-[10px] font-semibold text-gray-700 border-r border-gray-300">
                          Category
                        </th>
                        <th className="w-[15%] px-1 py-1 text-left text-[10px] font-semibold text-gray-700 border-r border-gray-300">
                          Description
                        </th>
                        <th className="w-[12%] px-1 py-1 text-left text-[10px] font-semibold text-gray-700 border-r border-gray-300">
                          Quantity
                        </th>
                        <th className="w-[15%] px-1 py-1 text-left text-[10px] font-semibold text-gray-700 border-r border-gray-300">
                          Unit
                        </th>
                        <th className="w-[10%] px-1 py-1 text-center text-[10px] font-semibold text-gray-700"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {boqItems.map((boqItem) => (
                        <tr
                          key={boqItem.id}
                          className="border-b border-gray-200"
                        >
                          <td className="px-2 py-2 border-r border-gray-200">
                            <select
                              value={boqItem.category}
                              onChange={(e) =>
                                handleBoqChange(
                                  boqItem.id,
                                  "category",
                                  e.target.value
                                )
                              }
                              className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-red-500 focus:outline-none"
                            >
                              <option value="">Select</option>
                              <option value="Construction">Construction</option>
                              <option value="Electrical">Electrical</option>
                              <option value="Plumbing">Plumbing</option>
                              <option value="Finishing">Finishing</option>
                              <option value="Safety">Safety</option>
                            </select>
                          </td>
                          <td className="px-2 py-2 border-r border-gray-200">
                            <input
                              type="text"
                              value={boqItem.description}
                              onChange={(e) =>
                                handleBoqChange(
                                  boqItem.id,
                                  "description",
                                  e.target.value
                                )
                              }
                              className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-red-500 focus:outline-none"
                              placeholder="Description"
                            />
                          </td>
                          <td className="px-2 py-2 border-r border-gray-200">
                            <input
                              type="number"
                              value={boqItem.quantity}
                              onChange={(e) =>
                                handleBoqChange(
                                  boqItem.id,
                                  "quantity",
                                  e.target.value
                                )
                              }
                              className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-red-500 focus:outline-none"
                              placeholder="0.00"
                            />
                          </td>
                          <td className="px-2 py-2 border-r border-gray-200">
                            <select
                              value={boqItem.unit}
                              onChange={(e) =>
                                handleBoqChange(
                                  boqItem.id,
                                  "unit",
                                  e.target.value
                                )
                              }
                              className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-red-500 focus:outline-none"
                            >
                              <option value="">Select</option>
                              <option value="units">Units</option>
                              <option value="kg">Kg</option>
                              <option value="tons">Tons</option>
                              <option value="meters">Meters</option>
                              <option value="bags">Bags</option>
                              <option value="gallons">Gallons</option>
                            </select>
                          </td>
                          <td className="px-2 py-2 text-center">
                            <button
                              onClick={() => removeBoqRow(boqItem.id)}
                              className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                              disabled={boqItems.length === 1}
                            >
                              <Trash2 className="w-4 h-4 mx-auto" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  onClick={addBoqRow}
                  className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-red-500 hover:text-red-500 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Row
                </button>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-3">
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Save as Draft
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 text-white rounded-lg shadow-md hover:opacity-90 transition-opacity font-medium"
                  style={{ backgroundColor: "#d92335" }}
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MaterialRequestDashboard;
