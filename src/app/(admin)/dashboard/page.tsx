"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye,
  ArrowRight,
  Package,
  TrendingUp,
  Calendar,
  User,
  Building2,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface MaterialRequest {
  id: string;
  materialName: string;
  quantity: number;
  unit: string;
  category: string;
  priority: "low" | "normal" | "high" | "urgent";
  status: "draft" | "pending" | "in_progress" | "completed" | "closed";
  projectName: string;
  requestedBy: string;
  requestedDate: string;
  duedate: string;
  rfbs: number;
}

const Dashboard = () => {
  const [materialRequests] = useState<MaterialRequest[]>([
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
      duedate: "15-10-2025",
      rfbs: 0,
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
      duedate: "17-10-2025",
      rfbs: 6,
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
      duedate: "30-10-2025",
      rfbs: 4,
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
      duedate: "18-10-2025",
      rfbs: 0,
    },
  ]);

  // Calculate statistics
  const stats = {
    total: materialRequests.length,
    draft: materialRequests.filter((r) => r.status === "draft").length,
    pending: materialRequests.filter((r) => r.status === "pending").length,
    inProgress: materialRequests.filter((r) => r.status === "in_progress").length,
    completed: materialRequests.filter((r) => r.status === "completed").length,
    closed: materialRequests.filter((r) => r.status === "closed").length,
    urgent: materialRequests.filter((r) => r.priority === "urgent").length,
    totalRfbs: materialRequests.reduce((sum, r) => sum + r.rfbs, 0),
  };

  const getStatusBadge = (status: MaterialRequest["status"]) => {
    const statusMap = {
      draft: { variant: "default" as const, label: "Draft" },
      pending: { variant: "warning" as const, label: "Pending" },
      in_progress: { variant: "info" as const, label: "In Progress" },
      completed: { variant: "success" as const, label: "Completed" },
      closed: { variant: "default" as const, label: "Closed" },
    };
    const statusInfo = statusMap[status];
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const getPriorityBadge = (priority: MaterialRequest["priority"]) => {
    const priorityMap = {
      low: { variant: "default" as const, label: "Low" },
      normal: { variant: "info" as const, label: "Normal" },
      high: { variant: "warning" as const, label: "High" },
      urgent: { variant: "error" as const, label: "Urgent" },
    };
    const priorityInfo = priorityMap[priority];
    return <Badge variant={priorityInfo.variant}>{priorityInfo.label}</Badge>;
  };

  const recentRequests = materialRequests.slice(0, 5);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Material Requests Dashboard
          </h1>
          <p className="mt-1 sm:mt-2 text-sm text-gray-500">
            Overview of all material requests and their status
          </p>
        </div>
        <Link href="/material-request">
          <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4 sm:w-5 sm:h-5" />}>
            New Request
          </Button>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        <Card padding="md" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">Total Requests</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card padding="md" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">Pending</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                {stats.pending}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card padding="md" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">In Progress</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                {stats.inProgress}
              </p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-lg">
              <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600" />
            </div>
          </div>
        </Card>

        <Card padding="md" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">Completed</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                {stats.completed}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">Draft</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.draft}</p>
            </div>
            <div className="p-2 bg-gray-100 rounded-lg">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">Urgent Priority</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.urgent}</p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">Total RFBs</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                {stats.totalRfbs}
              </p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">Closed</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.closed}</p>
            </div>
            <div className="p-2 bg-gray-100 rounded-lg">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Material Requests */}
      <Card padding="md">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Material Requests</h2>
          <Link href="/material-request">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 uppercase">
                  Request ID
                </th>
                <th className="text-left py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 uppercase">
                  Material
                </th>
                <th className="text-left py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 uppercase">
                  Project
                </th>
                <th className="text-left py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 uppercase">
                  Status
                </th>
                <th className="text-left py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 uppercase">
                  Priority
                </th>
                <th className="text-left py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 uppercase">
                  RFBs
                </th>
                <th className="text-right py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-3 sm:px-4">
                    <span className="text-xs sm:text-sm font-medium text-gray-900">
                      {request.id}
                    </span>
                  </td>
                  <td className="py-3 px-3 sm:px-4">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-900">
                        {request.materialName}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {request.quantity} {request.unit}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-3 sm:px-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700">{request.projectName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 sm:px-4">{getStatusBadge(request.status)}</td>
                  <td className="py-3 px-3 sm:px-4">{getPriorityBadge(request.priority)}</td>
                  <td className="py-3 px-3 sm:px-4">
                    <span className="text-xs sm:text-sm text-gray-700">{request.rfbs}</span>
                  </td>
                  <td className="py-3 px-3 sm:px-4 text-right">
                    <Link href={`/material-request?view=${request.id}`}>
                      <Button variant="ghost" size="sm" leftIcon={<Eye className="w-4 h-4" />}>
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        <Card padding="md">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            Quick Actions
          </h3>
          <div className="space-y-2 sm:space-y-3">
            <Link href="/material-request">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Plus className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Create New Request</p>
                  <p className="text-xs text-gray-500">Start a new material request</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            </Link>
            <Link href="/material-request?status=pending">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">View Pending Requests</p>
                  <p className="text-xs text-gray-500">Review requests awaiting action</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            </Link>
            <Link href="/material-request?status=urgent">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Urgent Requests</p>
                  <p className="text-xs text-gray-500">Handle high-priority requests</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            </Link>
          </div>
        </Card>

        <Card padding="md">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            Status Overview
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-sm text-gray-700">Draft</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{stats.draft}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Pending</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{stats.pending}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span className="text-sm text-gray-700">In Progress</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{stats.inProgress}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Completed</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{stats.completed}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <span className="text-sm text-gray-700">Closed</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{stats.closed}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
