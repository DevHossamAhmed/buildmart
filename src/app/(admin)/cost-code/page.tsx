"use client";
import React, { useState } from "react";
import {
  FaDollarSign,
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaTimes,
  FaCheck,
  FaFilter,
  FaFileExport,

} from "react-icons/fa";

interface CostCode {
  id: string;
  code: string;
  name: string;
  category: string;
  description: string;
  status: "active" | "inactive";
  createdDate: string;
  usageCount: number;
}

const mockCostCodes: CostCode[] = [
  {
    id: "1",
    code: "CC-001",
    name: "Labor Costs",
    category: "Direct Costs",
    description: "All labor-related expenses including wages and benefits",
    status: "active",
    createdDate: "2024-01-15",
    usageCount: 45,
  },
  {
    id: "2",
    code: "CC-002",
    name: "Materials - Concrete",
    category: "Materials",
    description: "Concrete, cement, and related materials",
    status: "active",
    createdDate: "2024-02-10",
    usageCount: 32,
  },
  {
    id: "3",
    code: "CC-003",
    name: "Equipment Rental",
    category: "Equipment",
    description: "Rental costs for construction equipment",
    status: "active",
    createdDate: "2024-01-20",
    usageCount: 28,
  },
  {
    id: "4",
    code: "CC-004",
    name: "Overhead Expenses",
    category: "Indirect Costs",
    description: "Administrative and general overhead costs",
    status: "active",
    createdDate: "2024-03-05",
    usageCount: 15,
  },
  {
    id: "5",
    code: "CC-005",
    name: "Safety Equipment",
    category: "Safety",
    description: "Personal protective equipment and safety gear",
    status: "inactive",
    createdDate: "2024-02-28",
    usageCount: 8,
  },
];

const CostCodePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedCostCode, setSelectedCostCode] = useState<CostCode | null>(
    null
  );

  const categories = [
    "Direct Costs",
    "Materials",
    "Equipment",
    "Indirect Costs",
    "Safety",
    "Transportation",
  ];

  const handleAddNew = () => {
    setModalMode("add");
    setSelectedCostCode(null);
    setShowModal(true);
  };

  const handleEdit = (costCode: CostCode) => {
    setModalMode("edit");
    setSelectedCostCode(costCode);
    setShowModal(true);
  };

  const handleView = (costCode: CostCode) => {
    setModalMode("view");
    setSelectedCostCode(costCode);
    setShowModal(true);
  };

  const filteredCostCodes = mockCostCodes.filter((code) => {
    const matchesSearch =
      code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || code.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" || code.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });



  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-300">
        <FaCheck className="text-[10px]" />
        Active
      </span>
    ) : (
      <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-300">
        <FaTimes className="text-[10px]" />
        Inactive
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <FaDollarSign className="text-red-600 text-[24px]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Cost Code Management
            </h1>
            <p className="text-gray-600 text-sm">
              Manage and organize your project cost codes
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by code, name, or description..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-500" />
              <div className="relative w-max">
                <select
                  className="appearance-none px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Status Filter */}
            <div className="relative w-max">
              <select
                className="appearance-none px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              <FaFileExport />
              Export
            </button>
            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm"
            >
              <FaPlus />
              Add Cost Code
            </button>
          </div>
        </div>
      </div>

      {/* Cost Codes Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Description
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCostCodes.map((code) => (
                <tr
                  key={code.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-red-600">
                      {code.code}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-800 font-medium">
                      {code.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      {code.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 line-clamp-2">
                      {code.description}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(code.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleView(code)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View"
                      >
                        <FaEye className="text-[16px]" />
                      </button>
                      <button
                        onClick={() => handleEdit(code)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <FaEdit className="text-[16px]" />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <FaTrash className="text-[16px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCostCodes.length === 0 && (
          <div className="text-center py-12">
            <FaDollarSign className="text-gray-300 text-5xl mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No cost codes found</p>
            <p className="text-gray-400 text-sm mt-1">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/5 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {modalMode === "add"
                  ? "Add New Cost Code"
                  : modalMode === "edit"
                  ? "Edit Cost Code"
                  : "Cost Code Details"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <FaTimes className="text-[20px]" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {modalMode === "view" && selectedCostCode ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Code</p>
                      <p className="text-gray-800 font-bold text-lg">
                        {selectedCostCode.code}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Status</p>
                      {getStatusBadge(selectedCostCode.status)}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Name</p>
                    <p className="text-gray-800 font-semibold">
                      {selectedCostCode.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Category</p>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      {selectedCostCode.category}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Description</p>
                    <p className="text-gray-800">
                      {selectedCostCode.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Created Date</p>
                      <p className="text-gray-800">
                        {selectedCostCode.createdDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Usage Count</p>
                      <p className="text-gray-800 font-semibold">
                        {selectedCostCode.usageCount} times
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cost Code *
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedCostCode?.code}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="CC-XXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category *
                      </label>
                      <div className="relative">
                        <select
                          defaultValue={selectedCostCode?.category}
                          className="appearance-none w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                          <option value="">Select Category</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700">
                          <svg
                            className="h-4 w-4 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedCostCode?.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter cost code name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      defaultValue={selectedCostCode?.description}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status *
                    </label>
                    <div className="relative">
                      <select
                        defaultValue={selectedCostCode?.status}
                        className="appearance-none w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700">
                        <svg
                          className="h-4 w-4 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                {modalMode === "view" ? "Close" : "Cancel"}
              </button>
              {modalMode !== "view" && (
                <button className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                  {modalMode === "add" ? "Create Cost Code" : "Save Changes"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostCodePage;
