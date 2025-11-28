"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaHandshake,
  FaSearch,
  FaFilter,
  FaEye,
  FaDownload,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

interface MaterialRequest {
  id: string;
  rfpNumber: string;
  projectName: string;
  department: string;
  requestDate: string;
  dueDate: string;
  status: "pending" | "reviewed" | "responded" | "expired";
  itemsCount: number;
  priority: "high" | "medium" | "low";
  description?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  items?: {
    id: string;
    name: string;
    specification: string;
    quantity: number;
    unit: string;
    notes?: string;
  }[];
  attachments?: {
    id: string;
    name: string;
    size: string;
    type: string;
  }[];
}

const mockRequests: MaterialRequest[] = [
  {
    id: "1",
    rfpNumber: "RFP-2024-001",
    projectName: "New Office Building - Phase 1",
    department: "Construction",
    requestDate: "2024-11-20",
    dueDate: "2024-12-05",
    status: "pending",
    itemsCount: 15,
    priority: "high",
    description:
      "We require high-quality construction materials for the foundation and structural work of our new office building project. All materials must meet local building codes and international standards.",
    contactPerson: "Ahmed Hassan",
    contactEmail: "ahmed.hassan@buildmart.com",
    contactPhone: "+20 100 123 4567",
    items: [
      {
        id: "1",
        name: "Portland Cement",
        specification: "Type I, 50kg bags, CEM I 42.5N",
        quantity: 500,
        unit: "bags",
        notes: "Must comply with ASTM C150 standards",
      },
      {
        id: "2",
        name: "Steel Reinforcement Bars",
        specification: "Grade 60, 16mm diameter, 12m length",
        quantity: 2000,
        unit: "pieces",
        notes: "Hot-rolled deformed bars",
      },
      {
        id: "3",
        name: "Ready-Mix Concrete",
        specification: "Grade C30/37, Slump 150mm",
        quantity: 150,
        unit: "m³",
        notes: "Delivery schedule to be coordinated",
      },
    ],
    attachments: [
      {
        id: "1",
        name: "Technical_Specifications.pdf",
        size: "2.4 MB",
        type: "PDF",
      },
      {
        id: "2",
        name: "Project_Drawings.dwg",
        size: "5.1 MB",
        type: "CAD",
      },
      {
        id: "3",
        name: "BOQ_Template.xlsx",
        size: "856 KB",
        type: "Excel",
      },
    ],
  },
  {
    id: "2",
    rfpNumber: "RFP-2024-002",
    projectName: "Residential Complex - Tower A",
    department: "Procurement",
    requestDate: "2024-11-22",
    dueDate: "2024-12-10",
    status: "reviewed",
    itemsCount: 8,
    priority: "medium",
    description:
      "Request for finishing materials for residential units including tiles, paints, and fixtures.",
    contactPerson: "Fatma Ali",
    contactEmail: "fatma.ali@buildmart.com",
    contactPhone: "+20 100 987 6543",
    items: [
      {
        id: "1",
        name: "Ceramic Floor Tiles",
        specification: "60x60cm, Porcelain, Grade A",
        quantity: 5000,
        unit: "m²",
      },
      {
        id: "2",
        name: "Interior Paint",
        specification: "Acrylic emulsion, White base",
        quantity: 800,
        unit: "liters",
      },
    ],
    attachments: [
      {
        id: "1",
        name: "Material_List.pdf",
        size: "1.2 MB",
        type: "PDF",
      },
    ],
  },
  {
    id: "3",
    rfpNumber: "RFP-2024-003",
    projectName: "Mall Renovation",
    department: "Maintenance",
    requestDate: "2024-11-18",
    dueDate: "2024-11-30",
    status: "responded",
    itemsCount: 22,
    priority: "low",
    description:
      "Maintenance and renovation materials for existing mall facility.",
    contactPerson: "Mohamed Ibrahim",
    contactEmail: "mohamed.ibrahim@buildmart.com",
    contactPhone: "+20 100 555 7890",
    items: [
      {
        id: "1",
        name: "LED Lighting Fixtures",
        specification: "40W, Cool white, IP65",
        quantity: 300,
        unit: "pieces",
      },
    ],
    attachments: [],
  },
];

const VendorPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedRequest, setSelectedRequest] =
    useState<MaterialRequest | null>(null);

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      reviewed: "bg-blue-100 text-blue-800 border-blue-300",
      responded: "bg-green-100 text-green-800 border-green-300",
      expired: "bg-red-100 text-red-800 border-red-300",
    };
    const icons = {
      pending: <FaClock className="text-[12px]" />,
      reviewed: <FaEye className="text-[12px]" />,
      responded: <FaCheckCircle className="text-[12px]" />,
      expired: <FaTimesCircle className="text-[12px]" />,
    };
    return (
      <span
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-semibold border ${
          styles[status as keyof typeof styles]
        }`}
      >
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      high: "bg-red-50 text-red-700 border-red-200",
      medium: "bg-orange-50 text-orange-700 border-orange-200",
      low: "bg-gray-50 text-gray-700 border-gray-200",
    };
    return (
      <span
        className={`px-2 py-1 rounded text-[11px] font-medium border ${
          styles[priority as keyof typeof styles]
        }`}
      >
        {priority.toUpperCase()}
      </span>
    );
  };

  const filteredRequests = mockRequests.filter((req) => {
    const matchesSearch =
      req.rfpNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || req.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: mockRequests.length,
    pending: mockRequests.filter((r) => r.status === "pending").length,
    reviewed: mockRequests.filter((r) => r.status === "reviewed").length,
    responded: mockRequests.filter((r) => r.status === "responded").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FaHandshake className="text-red-600 text-[32px]" />
          <h1 className="text-3xl font-bold text-gray-800">
            Vendor Portal - Material Requests
          </h1>
        </div>
        <p className="text-gray-600 ml-11">
          Review and respond to incoming RFPs and material requests
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Total Requests
              </p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {stats.total}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <FaHandshake className="text-blue-600 text-[20px]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Pending</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {stats.pending}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <FaClock className="text-yellow-600 text-[20px]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Reviewed</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {stats.reviewed}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <FaEye className="text-blue-600 text-[20px]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Responded</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {stats.responded}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <FaCheckCircle className="text-green-600 text-[20px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by RFP number or project name..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-500" />
            <select
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="responded">Responded</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  RFP Number
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Request Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Priority
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
              {filteredRequests.map((request) => (
                <tr
                  key={request.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-red-600">
                      {request.rfpNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-800 font-medium">
                      {request.projectName}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">
                      {request.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">
                      {request.requestDate}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">
                      {request.dueDate}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-800 font-medium">
                      {request.itemsCount} items
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPriorityBadge(request.priority)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(request.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Link href={`vendor/RFBs-details/${request.id}`}>
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <FaEye className="text-[16px]" />
                        </button>
                      </Link>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <FaDownload className="text-[16px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No requests found</p>
            <p className="text-gray-400 text-sm mt-1">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorPage;
