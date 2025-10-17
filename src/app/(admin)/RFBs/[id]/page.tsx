"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Download,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Calendar,
  User,
  Building2,
  Package,
  AlertCircle,
  MessageSquare,
  Paperclip,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  DollarSign,
  TrendingUp,
  ShoppingCart,
} from "lucide-react";

const RFBsDetailPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [newComment, setNewComment] = useState("");
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  // Sample data for the material request
  const requestData = {
    id: "MR-001",
    title: "Steel Rebar Grade 60",
    status: "draft",
    priority: "high",
    projectName: "Building A",
    projectCode: "PRJ-2024-001",
    requestedBy: "Mahmoud Ahmed",
    requestedDate: "2025-02-10",
    dueDate: "2025-10-15",
    description:
      "Required for foundation reinforcement work in Building A. Must meet ASTM A615 Grade 60 specifications with proper certification.",
    rfbsCount: 3,
  };

  // BOQ Items data
  const boqItems = [
    {
      id: 1,
      category: "Construction",
      description: "Steel Rebar 16mm",
      quantity: 300,
      unit: "kg",
      unitPrice: 25.5,
      totalPrice: 7650,
    },
    {
      id: 2,
      category: "Construction",
      description: "Steel Rebar 12mm",
      quantity: 200,
      unit: "kg",
      unitPrice: 22.0,
      totalPrice: 4400,
    },
  ];

  // RFBs (Request for Bids) data
  const rfbsData = [
    {
      id: "RFB-001",
      supplier: "Ahmed Steel Co.",
      status: "pending",
      submittedDate: "2025-02-11",
      totalAmount: 11500,
      responseTime: "2 days",
    },
    {
      id: "RFB-002",
      supplier: "Modern Materials Ltd.",
      status: "submitted",
      submittedDate: "2025-02-12",
      totalAmount: 12050,
      responseTime: "1 day",
    },
    {
      id: "RFB-003",
      supplier: "Prime Construction Supply",
      status: "pending",
      submittedDate: "2025-02-11",
      totalAmount: 11800,
      responseTime: "2 days",
    },
  ];

  // Comments/Activity data
  const activities = [
    {
      id: 1,
      user: "Sara Ali",
      action: "commented",
      message: "Please confirm if we need mill test certificates for this order",
      timestamp: "2025-02-12 10:30 AM",
      type: "comment",
    },
    {
      id: 2,
      user: "Mahmoud Ahmed",
      action: "created",
      message: "Material request created and submitted for approval",
      timestamp: "2025-02-10 09:15 AM",
      type: "system",
    },
  ];

  //@ts-expect-error:status
  const getStatusColor = (status) => {
    const colors = {
      draft: "bg-gray-100 text-gray-700 border-gray-300",
      pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
      submitted: "bg-blue-100 text-blue-700 border-blue-300",
      approved: "bg-green-100 text-green-700 border-green-300",
      rejected: "bg-red-100 text-red-700 border-red-300",
    };
    //@ts-expect-error:status
    return colors[status] || colors.draft;
  };

  //@ts-expect-error:status
  const getPriorityColor = (priority) => {
    const colors = {
      urgent: "bg-red-100 text-red-700 border-red-300",
      high: "bg-orange-100 text-orange-700 border-orange-300",
      normal: "bg-blue-100 text-blue-700 border-blue-300",
      low: "bg-slate-100 text-slate-700 border-slate-300",
    };
    //@ts-expect-error:status
    return colors[priority] || colors.normal;
  };

  const totalAmount = boqItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {requestData.id}
                  </h1>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      requestData.status
                    )}`}
                  >
                    {requestData.status.charAt(0).toUpperCase() +
                      requestData.status.slice(1)}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                      requestData.priority
                    )}`}
                  >
                    {requestData.priority.charAt(0).toUpperCase() +
                      requestData.priority.slice(1)} Priority
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {requestData.title}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 text-sm font-medium"
                style={{ backgroundColor: "#d92335" }}
              >
                <Send className="w-4 h-4" />
                Send RFBs
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowStatusMenu(!showStatusMenu)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
                {showStatusMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                      <Edit2 className="w-4 h-4" />
                      Edit Request
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      View History
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      Delete Request
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-200">
            {["overview", "boq", "rfbs", "activity"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                  activeTab === tab
                    ? "text-red-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: "#d92335" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "overview" && (
              <>
                {/* Overview Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg border border-gray-200 p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Package className="w-5 h-5 text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-600">Total Items</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {boqItems.length}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <DollarSign className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="text-sm text-gray-600">Est. Value</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      ${totalAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <ShoppingCart className="w-5 h-5 text-purple-600" />
                      </div>
                      <p className="text-sm text-gray-600">RFBs Sent</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {requestData.rfbsCount}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {requestData.description}
                  </p>
                </div>

                {/* BOQ Summary */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Bill of Quantities
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                            Description
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                            Quantity
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                            Unit Price
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {boqItems.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {item.description}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {item.quantity} {item.unit}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              ${item.unitPrice}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              ${item.totalPrice.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {activeTab === "boq" && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Bill of Quantities Details
                  </h3>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    <Download className="w-4 h-4 inline mr-2" />
                    Export BOQ
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                          Category
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                          Description
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                          Quantity
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                          Unit Price
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                          Total Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {boqItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900">
                            {item.description}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">
                            {item.quantity} {item.unit}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">
                            ${item.unitPrice}
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900">
                            ${item.totalPrice.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                      <tr>
                        <td
                          colSpan={4}
                          className="px-4 py-4 text-right text-sm font-semibold text-gray-900"
                        >
                          Total Amount:
                        </td>
                        <td className="px-4 py-4 text-sm font-bold text-gray-900">
                          ${totalAmount.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "rfbs" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Request for Bids
                  </h3>
                  <button
                    className="px-4 py-2 text-white rounded-lg hover:opacity-90 text-sm font-medium"
                    style={{ backgroundColor: "#d92335" }}
                  >
                    <Send className="w-4 h-4 inline mr-2" />
                    Send New RFB
                  </button>
                </div>
                {rfbsData.map((rfb) => (
                  <div
                    key={rfb.id}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-base font-semibold text-gray-900">
                            {rfb.id}
                          </h4>
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              rfb.status
                            )}`}
                          >
                            {rfb.status.charAt(0).toUpperCase() +
                              rfb.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-900 font-medium mb-2">
                          {rfb.supplier}
                        </p>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 mb-1">Submitted</p>
                            <p className="text-gray-900 font-medium">
                              {rfb.submittedDate}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Response Time</p>
                            <p className="text-gray-900 font-medium">
                              {rfb.responseTime}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Total Amount</p>
                            <p className="text-gray-900 font-bold text-lg">
                              ${rfb.totalAmount.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "activity" && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Activity & Comments
                </h3>
                <div className="space-y-6">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {activity.user.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-semibold text-gray-900">
                              {activity.user}
                            </p>
                            <p className="text-xs text-gray-500">
                              {activity.timestamp}
                            </p>
                          </div>
                          <p className="text-sm text-gray-700">
                            {activity.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                        M
                      </div>
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 focus:outline-none resize-none"
                        rows={3}
                      />
                      <div className="flex items-center justify-between mt-3">
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <Paperclip className="w-5 h-5" />
                        </button>
                        <button
                          className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                          style={{ backgroundColor: "#d92335" }}
                        >
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Request Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">
                Request Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Requested Date</p>
                    <p className="text-sm font-medium text-gray-900">
                      {requestData.requestedDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Due Date</p>
                    <p className="text-sm font-medium text-gray-900">
                      {requestData.dueDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Requested By</p>
                    <p className="text-sm font-medium text-gray-900">
                      {requestData.requestedBy}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Project</p>
                    <p className="text-sm font-medium text-gray-900">
                      {requestData.projectName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {requestData.projectCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-left text-sm font-medium text-gray-700 transition-colors flex items-center gap-2">
                  <Edit2 className="w-4 h-4" />
                  Edit Request
                </button>
                <button className="w-full px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-left text-sm font-medium text-gray-700 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button className="w-full px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-left text-sm font-medium text-gray-700 transition-colors flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Add Comment
                </button>
              </div>
            </div>

            {/* Status History */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">
                Status History
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium text-gray-900">Created</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Feb 10, 2025 - 9:15 AM
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      by Mahmoud Ahmed
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Draft</p>
                    <p className="text-xs text-gray-600 mt-1">Current Status</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RFBsDetailPage;