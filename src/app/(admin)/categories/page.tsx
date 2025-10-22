"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  Download,
  Upload,
  FolderOpen,
  X,
  FileText,
  Link,
  Package,
  Layers,
  Tag,
} from "lucide-react";

const CategoriesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importSource, setImportSource] = useState("");
  const [importMethod, setImportMethod] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [apiUrl, setApiUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
  //@ts-expect-error:status
  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-700 border-green-300"
      : "bg-gray-100 text-gray-700 border-gray-300";
  };
  //@ts-expect-error:color
  const getCategoryColor = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-700",
      yellow: "bg-yellow-100 text-yellow-700",
      cyan: "bg-cyan-100 text-cyan-700",
      red: "bg-red-100 text-red-700",
      orange: "bg-orange-100 text-orange-700",
      purple: "bg-purple-100 text-purple-700",
      green: "bg-green-100 text-green-700",
    };
    //@ts-expect-error:color
    return colors[color] || colors.blue;
  };

  const filteredCategories = categoriesData.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "active" && category.status === "active") ||
      (selectedFilter === "inactive" && category.status === "inactive");

    return matchesSearch && matchesFilter;
  });

  const handleFileChange = (e: {
    target: { files: React.SetStateAction<null>[] };
  }) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage your product categories and subcategories
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border cursor-pointer border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium">
                <Download className="w-4 h-4" />
                Export
              </button>
             
              <button
                onClick={() => setShowImportModal(true)}
                className="px-4 py-2 text-white cursor-pointer rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 text-sm font-medium"
                style={{ backgroundColor: "#d92335" }}
              >
                <Upload className="w-4 h-4" />
                Import Categories
              </button>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 focus:outline-none text-sm w-64"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="px-4 py-2 border cursor-pointer border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>
              {showFilterMenu && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <button
                    onClick={() => {
                      setSelectedFilter("all");
                      setShowFilterMenu(false);
                    }}
                    className="w-full px-4 py-2 cursor-pointer text-left text-sm hover:bg-gray-50"
                  >
                    All Categories
                  </button>
                  <button
                    onClick={() => {
                      setSelectedFilter("active");
                      setShowFilterMenu(false);
                    }}
                    className="w-full px-4 py-2 cursor-pointer text-left text-sm hover:bg-gray-50"
                  >
                    Active Only
                  </button>
                  <button
                    onClick={() => {
                      setSelectedFilter("inactive");
                      setShowFilterMenu(false);
                    }}
                    className="w-full px-4 py-2 cursor-pointer text-left text-sm hover:bg-gray-50"
                  >
                    Inactive Only
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FolderOpen className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600">Total Categories</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {categoriesData.length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Layers className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600">Subcategories</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {categoriesData.reduce((sum, cat) => sum + cat.subcategories, 0)}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-sm text-gray-600">Total Items</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {categoriesData.reduce((sum, cat) => sum + cat.itemsCount, 0)}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Tag className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-sm text-gray-600">Active Categories</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {categoriesData.filter((c) => c.status === "active").length}
            </p>
          </div>
        </div>

        {/* Table View */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Subcategories
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${getCategoryColor(
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
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 max-w-xs">
                        {category.description}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">
                        {category.itemsCount}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">
                        {category.subcategories}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          category.status
                        )}`}
                      >
                        {category.status.charAt(0).toUpperCase() +
                          category.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
                          <Edit2 className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg cursor-pointer transition-colors">
                          <Trash2 className="w-4 h-4 text-red-600" />
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

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/5 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-xl font-semibold text-gray-900">
                Import Categories
              </h2>
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportSource("");
                  setImportMethod("");
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Import Source Selection */}
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                  <input
                    type="radio"
                    name="importSource"
                    value="buildmart"
                    checked={importSource === "buildmart"}
                    onChange={(e) => {
                      setImportSource(e.target.value);
                      setImportMethod("");
                    }}
                    className="w-4 h-4 text-blue-600"
                  />
                  <Package className="ml-3 text-blue-600" size={20} />
                  <span className="ml-2 text-base font-medium text-gray-700">
                    Import from BuildMart
                  </span>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all">
                  <input
                    type="radio"
                    name="importSource"
                    value="custom"
                    checked={importSource === "custom"}
                    onChange={(e) => {
                      setImportSource(e.target.value);
                      setImportMethod("");
                    }}
                    className="w-4 h-4 text-purple-600"
                  />
                  <FolderOpen className="ml-3 text-purple-600" size={20} />
                  <span className="ml-2 text-base font-medium text-gray-700">
                    Import Custom Categories
                  </span>
                </label>
              </div>

              {/* Custom Import Methods */}
              {importSource === "custom" && (
                <div className="space-y-3 pt-2">
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all">
                    <input
                      type="radio"
                      name="importMethod"
                      value="upload"
                      checked={importMethod === "upload"}
                      onChange={(e) => setImportMethod(e.target.value)}
                      className="w-4 h-4 text-green-600"
                    />
                    <Upload className="ml-3 text-green-600" size={20} />
                    <span className="ml-2 text-base font-medium text-gray-700">
                      Upload File
                    </span>
                  </label>

                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all">
                    <input
                      type="radio"
                      name="importMethod"
                      value="api"
                      checked={importMethod === "api"}
                      onChange={(e) => setImportMethod(e.target.value)}
                      className="w-4 h-4 text-indigo-600"
                    />
                    <Link className="ml-3 text-indigo-600" size={20} />
                    <span className="ml-2 text-base font-medium text-gray-700">
                      Integration API
                    </span>
                  </label>
                </div>
              )}

              {/* Upload File Section */}
              {importSource === "custom" && importMethod === "upload" && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select File
                  </label>
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="file"
                        //@ts-expect-error:onChange
                        onChange={handleFileChange}
                        className="hidden"
                        id="fileInput"
                        accept=".csv,.xlsx,.xls,.json"
                      />
                      <label
                        htmlFor="fileInput"
                        className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-400 hover:bg-white transition-all"
                      >
                        <FileText className="text-gray-400 mr-2" size={20} />
                        <span className="text-gray-600 text-sm">
                          {selectedFile
                            ? //@ts-expect-error:name
                              selectedFile.name
                            : "Choose file..."}
                        </span>
                      </label>
                    </div>
                    <button
                      disabled={!selectedFile}
                      className="bg-green-600 text-white px-6 py-3 cursor-pointer rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
                    >
                      Upload
                    </button>
                  </div>
                  {selectedFile && (
                    <p className="mt-2 text-sm text-green-600">
                      ✓ File selected:{" "}
                      {
                        //@ts-expect-error:name
                        selectedFile.name
                      }
                    </p>
                  )}
                </div>
              )}

              {/* Integration API Section */}
              {importSource === "custom" && importMethod === "api" && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      API URL
                    </label>
                    <input
                      type="url"
                      value={apiUrl}
                      onChange={(e) => setApiUrl(e.target.value)}
                      placeholder="https://api.example.com/categories"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* BuildMart Import Info */}
              {importSource === "buildmart" && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Package className="text-blue-600 mt-1" size={20} />
                    <div>
                      <p className="text-sm font-medium text-blue-900 mb-1">
                        BuildMart Integration
                      </p>
                      <p className="text-sm text-blue-700">
                        This will import all standard categories from BuildMart
                        catalog. The process may take a few minutes depending on
                        the catalog size.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportSource("");
                  setImportMethod("");
                }}
                className="px-4 py-2 border cursor-pointer border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                disabled={
                  !importSource ||
                  (importSource === "custom" &&
                    (!importMethod ||
                      (importMethod === "upload" && !selectedFile) ||
                      (importMethod === "api" &&
                        (!apiUrl || !username || !password))))
                }
                className="px-4 py-2 cursor-pointer text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#d92335" }}
              >
                Import Categories
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
