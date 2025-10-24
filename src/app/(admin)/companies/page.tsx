"use client";

import React, { useState } from "react";
import { Plus, Search, Download, CheckCircle, XCircle } from "lucide-react";
import DrawerComponent from "@/components/ui/DrawerComponent";
import DataTable from "@/components/ui/DataTable";

const Companies = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [userType, setUserType] = useState("Individual");

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    status: "active",
    brandName: "",
    taxId: "",
    email: "",
    telephone: "",
    website: "",
    logo: "",
    firstName: "",
    lastName: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Advanced Construction Company",
      code: "CMP-001",
      description: "Specialized in general contracting and infrastructure",
      status: "active",
      createdAt: "2024-01-15",
      createdBy: "Ahmed Mahmoud",
    },
    {
      id: 2,
      name: "Nile Construction Group",
      code: "CMP-002",
      description: "Leading company in residential and commercial projects",
      status: "active",
      createdAt: "2024-02-20",
      createdBy: "Sara Ali",
    },
    {
      id: 3,
      name: "Pyramid Real Estate Development",
      code: "CMP-003",
      description: "Specialized in real estate development and investment",
      status: "inactive",
      createdAt: "2024-03-10",
      createdBy: "Mohamed Hassan",
    },
    {
      id: 4,
      name: "Al Fajr Contracting Company",
      code: "CMP-004",
      description: "General contracting and electromechanical works",
      status: "active",
      createdAt: "2024-01-25",
      createdBy: "Fatima Mohamed",
    },
    {
      id: 5,
      name: "Capital Construction & Development",
      code: "CMP-005",
      description: "Integrated construction and infrastructure company",
      status: "active",
      createdAt: "2024-02-05",
      createdBy: "Omar Khalil",
    },
    {
      id: 6,
      name: "Future Engineering Projects",
      code: "CMP-006",
      description: "Engineering consulting and project management",
      status: "inactive",
      createdAt: "2024-03-15",
      createdBy: "Layla Hassan",
    },
    {
      id: 7,
      name: "Gulf General Contracting",
      code: "CMP-007",
      description: "General contracting and industrial projects",
      status: "active",
      createdAt: "2024-01-30",
      createdBy: "Youssef Ibrahim",
    },
    {
      id: 8,
      name: "Success Building & Construction",
      code: "CMP-008",
      description: "Specialized in residential and administrative buildings",
      status: "active",
      createdAt: "2024-02-12",
      createdBy: "Mona Salem",
    },
  ]);
  //@ts-expect-error:value
  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-green-100 text-green-700 border-green-300",
      inactive: "bg-red-100 text-red-700 border-red-300",
    };
    //@ts-expect-error:value
    return styles[status] || styles.active;
  };
  //@ts-expect-error:value
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

  //@ts-expect-error:value
  const getStatusLabel = (status) => {
    const labels = {
      active: "Active",
      inactive: "Inactive",
    };
    //@ts-expect-error:value
    return labels[status] || status;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const newCompany = {
      id: companies.length + 1,
      name: formData.name,
      code: formData.code,
      description: formData.description,
      status: formData.status,
      createdAt: new Date().toISOString().split("T")[0],
      createdBy:
        `${formData.firstName || ""} ${formData.lastName || ""}`.trim() ||
        "Admin",
      email: formData.email,
      telephone: formData.telephone,
      website: formData.website,
      taxId: formData.taxId,
      brandName: formData.brandName,
      logo: formData.logo,
    };

    setCompanies([newCompany, ...companies]);
    setIsDrawerOpen(false);
    setFormData({
      name: "",
      code: "",
      description: "",
      status: "active",
      brandName: "",
      taxId: "",
      email: "",
      telephone: "",
      website: "",
      logo: "",
      firstName: "",
      lastName: "",
      mobile: "",
      password: "",
      confirmPassword: "",
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

  //@ts-expect-error:value
  const handleView = (row) => console.log("View company:", row);
  //@ts-expect-error:value
  const handleEdit = (row) => {
    //@ts-expect-error:value
    setFormData({
      name: row.name,
      code: row.code,
      description: row.description,
      status: row.status,
    });
    setIsDrawerOpen(true);
  };
  //@ts-expect-error:value
  const handleDelete = (row) => {
    if (window.confirm(`Are you sure you want to delete ${row.name}?`)) {
      setCompanies(companies.filter((company) => company.id !== row.id));
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
      //@ts-expect-error:value
      render: (value) => (
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
    {
      header: "Email",
      accessor: "email",
      className: "text-gray-600",
    },
    {
      header: "Tel",
      accessor: "telephone",
      className: "text-gray-600",
    },
    {
      header: "Website",
      accessor: "website",
      className: "text-gray-600",
    },
    {
      header: "CR Number",
      accessor: "taxId",
      className: "text-gray-600",
    },
    {
      header: "Brand",
      accessor: "brandName",
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
                Companies
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage and track all companies
              </p>
            </div>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center cursor-pointer justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 text-white rounded-lg shadow-md hover:opacity-90 transition-opacity font-medium"
              style={{ backgroundColor: "#d92335" }}
            >
              <Plus className="w-5 h-5" />
              <span>New Company</span>
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
          data={filteredCompanies}
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
        title="New Company"
        subtitle="Fill in the details to create a new company"
        onSave={handleSave}
        saveButtonText="Save"
        cancelButtonText="Cancel"
      >
        <div className="space-y-4">
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                placeholder="Advanced Contracting"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Code
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                placeholder="CMP-001"
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
              placeholder="Add company description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commercial Registration Number*
            </label>
            <input
              type="text"
              name="taxId"
              value={formData.taxId}
              onChange={handleInputChange}
              placeholder="Enter your CR number (e.g. 1010123456)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tel
              </label>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleInputChange}
                placeholder="e.g. +966 55 123 4567"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            <input
              type="text"
              name="businessName"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="e.g. https://www.acme.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo
            </label>
            <input
              type="file"
              name="logo"
              value={formData.logo}
              onChange={handleInputChange}
              placeholder="Logo"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
            />
          </div>
          <hr />
          {userType != "Individual" && (
            <div
              className="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 border border-yellow-200"
              role="alert"
            >
              <svg
                className="w-5 h-5 mr-2 text-yellow-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4a2 2 0 00-3.464 0L4.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              This person will be Superadmin to this account.
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name*
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-300focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name*
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {userType != "Individual"
                ? "Official Email Address"
                : "Email Address"}
              *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="email@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {userType != "Individual" ? "Official Mobile" : "Mobile"}*
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="e.g. +966 55 123 4567"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password*
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password*
            </label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Enter your confirm-password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </DrawerComponent>
    </div>
  );
};

export default Companies;
