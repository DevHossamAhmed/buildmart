"use client";

import React, { useState, useEffect } from "react";
import {
  FaBuilding,
  FaSitemap,
  FaTasks,
  FaWarehouse,
  FaMapMarkedAlt,
  FaDollarSign,
  FaPlus,
  FaSearch,
  FaDownload,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { CheckCircle, XCircle, Plus, Search, Download, Edit2, Trash2, Eye } from "lucide-react";
import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import DrawerComponent from "@/components/ui/DrawerComponent";
import DataTable from "@/components/ui/DataTable";
import { useBreadcrumbContext } from "@/contexts/BreadcrumbContext";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { id: "companies", label: "Companies", icon: <FaBuilding className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { id: "departments", label: "Departments", icon: <FaSitemap className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { id: "wbs", label: "WBS", icon: <FaTasks className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { id: "warehouses", label: "Warehouses", icon: <FaWarehouse className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { id: "regions", label: "Regions", icon: <FaMapMarkedAlt className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { id: "cost-code", label: "Cost Code", icon: <FaDollarSign className="w-4 h-4 sm:w-5 sm:h-5" /> },
];

interface BaseItem {
  id: number;
  name: string;
  code: string;
  description: string;
  status: "active" | "inactive";
  createdAt: string;
  createdBy: string;
}

const SettingsPage = () => {
  const { setBreadcrumbs } = useBreadcrumbContext();
  const [activeTab, setActiveTab] = useState("companies");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Companies state
  const [companies, setCompanies] = useState<BaseItem[]>([
    { id: 1, name: "Advanced Construction Company", code: "CMP-001", description: "Specialized in general contracting", status: "active", createdAt: "2024-01-15", createdBy: "Ahmed Mahmoud" },
    { id: 2, name: "Nile Construction Group", code: "CMP-002", description: "Leading company in residential projects", status: "active", createdAt: "2024-02-20", createdBy: "Sara Ali" },
  ]);

  // Departments state
  const [departments, setDepartments] = useState<BaseItem[]>([
    { id: 1, name: "Human Resources", code: "DEPT-001", description: "Manage employee relations", status: "active", createdAt: "2024-01-15", createdBy: "Ahmed Mahmoud" },
    { id: 2, name: "Finance & Accounting", code: "DEPT-002", description: "Financial planning operations", status: "active", createdAt: "2024-02-20", createdBy: "Sara Ali" },
  ]);

  // WBS state
  const [wbs, setWbs] = useState<BaseItem[]>([
    { id: 1, name: "Concrete Pouring", code: "ACT-001", description: "Pouring and finishing concrete", status: "active", createdAt: "2024-01-15", createdBy: "Ahmed Mahmoud" },
    { id: 2, name: "Steel Fixing", code: "ACT-002", description: "Installing steel reinforcement", status: "active", createdAt: "2024-02-20", createdBy: "Sara Ali" },
  ]);

  // Warehouses state
  const [warehouses, setWarehouses] = useState<BaseItem[]>([
    { id: 1, name: "Main Central Warehouse", code: "WH-001", description: "Primary storage facility", status: "active", createdAt: "2024-01-15", createdBy: "Ahmed Mahmoud" },
    { id: 2, name: "Steel Storage Warehouse", code: "WH-002", description: "Specialized for steel materials", status: "active", createdAt: "2024-02-20", createdBy: "Sara Ali" },
  ]);

  // Regions state
  const [regions, setRegions] = useState<BaseItem[]>([
    { id: 1, name: "Cairo Region", code: "REG-001", description: "Greater Cairo area", status: "active", createdAt: "2024-01-15", createdBy: "Ahmed Mahmoud" },
    { id: 2, name: "Alexandria Region", code: "REG-002", description: "Alexandria and northern areas", status: "active", createdAt: "2024-02-20", createdBy: "Sara Ali" },
  ]);

  // Cost Code state
  const [costCodes, setCostCodes] = useState<BaseItem[]>([
    { id: 1, name: "Labor Costs", code: "CC-001", description: "Direct labor expenses", status: "active", createdAt: "2024-01-15", createdBy: "Ahmed Mahmoud" },
    { id: 2, name: "Material Costs", code: "CC-002", description: "Raw material expenses", status: "active", createdAt: "2024-02-20", createdBy: "Sara Ali" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    status: "active" as "active" | "inactive",
  });

  useEffect(() => {
    setBreadcrumbs([
      { label: "Home", href: "/dashboard" },
      { label: "Settings" },
    ]);
  }, [setBreadcrumbs]);

  const getCurrentData = () => {
    switch (activeTab) {
      case "companies": return companies;
      case "departments": return departments;
      case "wbs": return wbs;
      case "warehouses": return warehouses;
      case "regions": return regions;
      case "cost-code": return costCodes;
      default: return [];
    }
  };

  const setCurrentData = (data: BaseItem[]) => {
    switch (activeTab) {
      case "companies": setCompanies(data); break;
      case "departments": setDepartments(data); break;
      case "wbs": setWbs(data); break;
      case "warehouses": setWarehouses(data); break;
      case "regions": setRegions(data); break;
      case "cost-code": setCostCodes(data); break;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: "bg-green-100 text-green-700 border-green-300",
      inactive: "bg-red-100 text-red-700 border-red-300",
    };
    return styles[status as keyof typeof styles] || styles.active;
  };

  const getStatusIcon = (status: string) => {
    return status === "active" ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />;
  };

  const getStatusLabel = (status: string) => {
    return status === "active" ? "Active" : "Inactive";
  };

  const filteredData = getCurrentData().filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const currentData = getCurrentData();
    const newItem: BaseItem = {
      id: currentData.length + 1,
      ...formData,
      createdAt: new Date().toISOString().split("T")[0],
      createdBy: "Admin",
    };
    setCurrentData([newItem, ...currentData]);
    setIsDrawerOpen(false);
    setFormData({ name: "", code: "", description: "", status: "active" });
  };

  const handleEdit = (row: BaseItem) => {
    setFormData({
      name: row.name,
      code: row.code,
      description: row.description,
      status: row.status,
    });
    setIsDrawerOpen(true);
  };

  const handleDelete = (row: BaseItem) => {
    if (window.confirm(`Are you sure you want to delete ${row.name}?`)) {
      const currentData = getCurrentData();
      setCurrentData(currentData.filter((item) => item.id !== row.id));
    }
  };

  const handleView = (row: BaseItem) => {
    console.log("View:", row);
  };

  const columns = [
    { header: "Name", accessor: "name", className: "text-gray-900 font-medium" },
    { header: "Code", accessor: "code", className: "text-gray-900 font-medium" },
    { header: "Description", accessor: "description", className: "text-gray-600" },
    {
      header: "Status",
      accessor: "status",
      render: (value: string) => (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(value)}`}>
          {getStatusIcon(value)}
          {getStatusLabel(value)}
        </span>
      ),
    },
    { header: "Created At", accessor: "createdAt", className: "text-gray-600" },
    { header: "Created By", accessor: "createdBy", className: "text-gray-600" },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your application settings and configurations"
        onAdd={() => {
          setFormData({ name: "", code: "", description: "", status: "active" });
          setIsDrawerOpen(true);
        }}
        addButtonText={`Add ${tabs.find((t) => t.id === activeTab)?.label}`}
      />

      {/* Tabs Navigation */}
      <Card padding="none" className="overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50/50">
          <nav className="flex flex-wrap gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3" aria-label="Settings Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className={`
                  group flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base font-medium transition-all duration-200 rounded-lg
                  ${
                    activeTab === tab.id
                      ? "bg-red-600 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white"
                  }
                `}
              >
                <span className={`transition-transform duration-200 ${activeTab === tab.id ? "scale-110" : "group-hover:scale-110"}`}>
                  {tab.icon}
                </span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-5 md:p-6">
          {/* Search and Filter */}
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg outline-none text-sm"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none px-4 py-2 sm:py-2.5 pr-9 sm:pr-10 border border-gray-200 rounded-lg focus:outline-none text-sm bg-white cursor-pointer transition-all duration-200 hover:border-gray-300"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 pointer-events-none">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-colors duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              <Button variant="outline" size="md" leftIcon={<Download className="w-4 h-4" />}>
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>

          {/* Data Table */}
          <DataTable
            columns={columns}
            data={filteredData}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            emptyMessage={`No ${tabs.find((t) => t.id === activeTab)?.label.toLowerCase()} found`}
          />
        </div>
      </Card>

      {/* Drawer for Add/Edit */}
      <DrawerComponent
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={`${formData.code ? "Edit" : "Add"} ${tabs.find((t) => t.id === activeTab)?.label}`}
        onSave={handleSave}
        saveButtonText="Save"
        cancelButtonText="Cancel"
      >
        <div className="space-y-4">
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter name"
            required
          />
          <Input
            label="Code"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            placeholder="Enter code"
            required
          />
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
              rows={4}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg outline-none text-sm resize-none"
            />
          </div>
          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
            required
          />
        </div>
      </DrawerComponent>
    </div>
  );
};

export default SettingsPage;
