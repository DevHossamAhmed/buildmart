"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Download,
  CheckCircle,
  XCircle,
} from "lucide-react";
import DrawerComponent from "@/components/ui/DrawerComponent";
import DataTable from "@/components/ui/DataTable";

const WBS = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    status: "active",
  });

  const [WBS, setWBS] = useState([
    {
      id: 1,
      name: "Concrete Pouring",
      code: "ACT-001",
      description: "Pouring and finishing concrete for foundations",
      status: "active",
      createdAt: "2024-01-15",
      createdBy: "Ahmed Mahmoud",
    },
    {
      id: 2,
      name: "Steel Fixing",
      code: "ACT-002",
      description: "Installing and fixing steel reinforcement bars",
      status: "active",
      createdAt: "2024-02-20",
      createdBy: "Sara Ali",
    },
    {
      id: 3,
      name: "Electrical Wiring",
      code: "ACT-003",
      description: "Installing electrical cables and conduits",
      status: "inactive",
      createdAt: "2024-03-10",
      createdBy: "Mohamed Hassan",
    },
    {
      id: 4,
      name: "Plumbing Installation",
      code: "ACT-004",
      description: "Installing pipes and plumbing fixtures",
      status: "active",
      createdAt: "2024-01-25",
      createdBy: "Fatima Mohamed",
    },
    {
      id: 5,
      name: "Plastering",
      code: "ACT-005",
      description: "Applying plaster to walls and ceilings",
      status: "active",
      createdAt: "2024-02-05",
      createdBy: "Omar Khalil",
    },
    {
      id: 6,
      name: "Tile Installation",
      code: "ACT-006",
      description: "Installing ceramic and porcelain tiles",
      status: "inactive",
      createdAt: "2024-03-15",
      createdBy: "Layla Hassan",
    },
    {
      id: 7,
      name: "Painting",
      code: "ACT-007",
      description: "Interior and exterior painting work",
      status: "active",
      createdAt: "2024-01-30",
      createdBy: "Youssef Ibrahim",
    },
    {
      id: 8,
      name: "HVAC Installation",
      code: "ACT-008",
      description: "Installing heating and cooling systems",
      status: "active",
      createdAt: "2024-02-12",
      createdBy: "Mona Salem",
    },
  ]);

  //@ts-expect-error:status
  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-green-100 text-green-700 border-green-300",
      inactive: "bg-red-100 text-red-700 border-red-300",
    };
    //@ts-expect-error:status
    return styles[status] || styles.active;
  };

  //@ts-expect-error:status
  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "inactive":
        return <XCircle className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  //@ts-expect-error:status
  const getStatusLabel = (status) => {
    const labels = {
      active: "Active",
      inactive: "Inactive",
    };
    //@ts-expect-error:status
    return labels[status] || status;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const newWBS = {
      id: WBS.length + 1,
      ...formData,
      createdAt: new Date().toISOString().split("T")[0],
      createdBy: "Ahmed Mahmoud",
    };
    setWBS([newWBS, ...WBS]);
    setIsDrawerOpen(false);
    setFormData({
      name: "",
      code: "",
      description: "",
      status: "active",
    });
  };

  const filteredWBS = WBS.filter((WBS) => {
    const matchesSearch =
      WBS.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      WBS.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      WBS.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || WBS.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleView = (row: any) => {
    console.log("View WBS:", row);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (row: any) => {
    console.log("Edit WBS:", row);
    setFormData({
      name: row.name,
      code: row.code,
      description: row.description,
      status: row.status,
    });
    setIsDrawerOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDelete = (row: any) => {
    if (window.confirm(`Are you sure you want to delete ${row.name}?`)) {
      setWBS(WBS.filter((WBS) => WBS.id !== row.id));
    }
  };

  const columns = [
    {
      header: "Name",
      accessor: "name",
      className: "text-gray-900 font-medium",
    },
    {
      header: "Code",
      accessor: "code",
      className: "text-gray-900 font-medium",
    },
    {
      header: "Description",
      accessor: "description",
      className: "text-gray-600",
    },
    {
      header: "Status",
      accessor: "status",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (value: any) => (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
            value
          )}`}
        >
          {getStatusIcon(value)}
          {getStatusLabel(value)}
        </span>
      ),
    },
    {
      header: "Created At",
      accessor: "createdAt",
      className: "text-gray-600",
    },
    {
      header: "Created By",
      accessor: "createdBy",
      className: "text-gray-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <div className="bg-white shadow-sm border-b ">
        <div className="px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                WBS
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage and track all WBS
              </p>
            </div>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center cursor-pointer justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 text-white rounded-lg shadow-md hover:opacity-90 transition-opacity font-medium"
              style={{ backgroundColor: "#d92335" }}
            >
              <Plus className="w-5 h-5" />
              <span>New WBS</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, code, or description..."
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
                  className="appearance-none pr-8  pl-6 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none text-sm bg-white cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
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
        <DataTable
          columns={columns}
          data={filteredWBS}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showActions={true}
        />
      </div>

      {/* Side Drawer */}
      <DrawerComponent
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="New WBS"
        subtitle="Fill in the details to create a new WBS"
        onSave={handleSave}
        saveButtonText="Save"
        cancelButtonText="Cancel"
      >
        <div className="space-y-4">
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WBS Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                placeholder="Concrete Pouring"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WBS Code
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                placeholder="ACT-001"
              />
            </div>
          </div>

          <div className="relative w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="appearance-none pr-8 w-full pl-6 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none text-sm bg-white cursor-pointer"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pl-4 pr-2 text-gray-700 top-8">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
              placeholder="Add WBS description..."
            />
          </div>
        </div>
      </DrawerComponent>
    </div>
  );
};

export default WBS;