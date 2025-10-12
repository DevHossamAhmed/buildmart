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
  XCircle,
  Building2,
} from "lucide-react";

const Activities = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    status: "active",
  });

  const [companies, setCompanies] = useState([
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

  const stats = [
    {
      label: "Total Activities",
      value: "248",
      change: "+12%",
      color: "bg-blue-500",
    },
    {
      label: "Active",
      value: "198",
      change: "+8%",
      color: "bg-green-500",
    },
    {
      label: "Inactive",
      value: "50",
      change: "-3%",
      color: "bg-red-500",
    },
    {
      label: "This Month",
      value: "15",
      change: "+5%",
      color: "bg-yellow-500",
    },
  ];
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
  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const newCompany = {
      id: companies.length + 1,
      ...formData,
      createdAt: new Date().toISOString().split("T")[0],
      createdBy: "Ahmed Mahmoud",
    };
    setCompanies([newCompany, ...companies]);
    setIsDrawerOpen(false);
    setFormData({
      name: "",
      code: "",
      description: "",
      status: "active",
    });
  };

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || company.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <div className="bg-white shadow-sm border-b ">
        <div className="px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Activities
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage and track all activities
              </p>
            </div>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 text-white rounded-lg shadow-md hover:opacity-90 transition-opacity font-medium"
              style={{ backgroundColor: "#d92335" }}
            >
              <Plus className="w-5 h-5" />
              <span>New Activity</span>
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Created By
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCompanies.map((company, index) => (
                  <tr
                    key={company.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {company.name}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {company.code}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {company.description}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                          company.status
                        )}`}
                      >
                        {getStatusIcon(company.status)}
                        {getStatusLabel(company.status)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {company.createdAt}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {company.createdBy}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
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
              <h2 className="text-xl font-bold text-gray-900">New Activity</h2>
              <p className="text-sm text-gray-600 mt-1">
                Fill in the details to create a new activity
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4 ">
                <div className="flex gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Activity Name <span className="text-red-500">*</span>
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Activity Code 
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
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none pr-8 w-full  pl-6 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none text-sm bg-white cursor-pointer"
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
                    placeholder="Add activity description..."
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-3">
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 text-white rounded-lg shadow-md hover:opacity-90 transition-opacity font-medium"
                  style={{ backgroundColor: "#d92335" }}
                >
                  Save 
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Activities;